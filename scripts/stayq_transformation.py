"""
StayQ PySpark Transformation Pipeline for MedFlow
Scalable distributed ETL for Length of Stay (LOS) quartiles & 30-day HRRP readmission scoring.
"""

import os
import sys

# Ensure PySpark uses the correct Python interpreter on Windows
os.environ["PYSPARK_PYTHON"] = sys.executable
os.environ["PYSPARK_DRIVER_PYTHON"] = sys.executable

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window
import sys

def run_stayq_transformation(input_csv_path="tableau_data/medflow_admissions_4812.csv", output_path="tableau_data/stayq_transformed_parquet"):
    print("==================================================")
    print(" Starting MedFlow StayQ Transformation in PySpark ")
    print("==================================================")

    # 1. Initialize SparkSession
    spark = SparkSession.builder \
        .appName("MedFlow-StayQ-Transformation") \
        .master("local[*]") \
        .config("spark.driver.memory", "4g") \
        .config("spark.sql.shuffle.partitions", "8") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("WARN")

    # 2. Load admissions data
    df = spark.read.csv(
        input_csv_path,
        header=True,
        inferSchema=True
    )
    
    print(f"Loaded {df.count():,} raw records from {input_csv_path}")

    # 3. Clean and parse dates
    df_clean = df.withColumn("Adm_Date", F.to_date(F.col("Admission_Date"), "yyyy-MM-dd")) \
                 .withColumn("Disch_Date", F.to_date(F.col("Discharge_Date"), "yyyy-MM-dd"))

    # 4. StayQ Step A: Calculate Exact Length of Stay (LOS)
    df_los = df_clean.withColumn("Calculated_LOS", F.datediff(F.col("Disch_Date"), F.col("Adm_Date")))

    # 5. StayQ Step B: Window Partitioning for Prior Discharge Date & Days Elapsed
    patient_window = Window.partitionBy("Patient_ID").orderBy("Adm_Date")

    df_windowed = df_los.withColumn("Prev_Disch_Date", F.lag("Disch_Date", 1).over(patient_window)) \
                        .withColumn("Days_Between_Visits", F.datediff(F.col("Adm_Date"), F.col("Prev_Disch_Date")))

    # 6. StayQ Step C: HRRP 30-Day Readmission Flag & Clinical Risk Tiers
    df_readmit = df_windowed.withColumn(
        "Is_HRRP_30Day_Readmit",
        F.when((F.col("Days_Between_Visits") >= 0) & (F.col("Days_Between_Visits") <= 30), 1).otherwise(0)
    ).withColumn(
        "Clinical_Risk_Tier",
        F.when(F.col("Days_Between_Visits") <= 10, "High")
         .when(F.col("Days_Between_Visits") <= 20, "Medium")
         .when(F.col("Days_Between_Visits") <= 30, "Low")
         .otherwise("Baseline")
    )

    # 7. StayQ Step D: Length of Stay Quartile Discretization (StayQ Cohorts)
    # Segments hospital stays into 4 operational velocity quartiles:
    # Q1: Short / Ambulatory (1-2 days)
    # Q2: Standard Acute (3-4 days)
    # Q3: Extended Care (5-7 days)
    # Q4: High-Complexity / Long-Stay (8+ days)
    df_stayq = df_readmit.withColumn(
        "StayQ_Quartile",
        F.when(F.col("Calculated_LOS") <= 2, "StayQ-1 (Short: 1-2d)")
         .when(F.col("Calculated_LOS") <= 4, "StayQ-2 (Standard: 3-4d)")
         .when(F.col("Calculated_LOS") <= 7, "StayQ-3 (Extended: 5-7d)")
         .otherwise("StayQ-4 (Complex: 8+d)")
    )

    # 8. Compute Core MedFlow KPIs
    kpis = df_stayq.select(
        F.count("Admission_ID").alias("Total_Admissions"),
        F.round(F.avg("Calculated_LOS"), 2).alias("Avg_LOS_Days"),
        F.sum("Is_HRRP_30Day_Readmit").alias("Total_30Day_Readmissions"),
        F.round((F.sum("Is_HRRP_30Day_Readmit") * 100.0) / F.count("Admission_ID"), 2).alias("Readmission_Rate_Pct")
    ).collect()[0]

    print("\n--- Spark Transformed Executive KPIs ---")
    print(f"Total Admissions        : {kpis['Total_Admissions']:,}")
    print(f"Average Length of Stay  : {kpis['Avg_LOS_Days']} days")
    print(f"30-Day Readmission Count: {kpis['Total_30Day_Readmissions']:,}")
    print(f"30-Day Readmission Rate : {kpis['Readmission_Rate_Pct']}%")

    # 9. StayQ Department Breakdown
    print("\n--- StayQ Quartile Distribution by Department ---")
    stayq_summary = df_stayq.groupBy("Department", "StayQ_Quartile") \
                            .agg(F.count("Admission_ID").alias("Admissions"),
                                 F.round(F.avg("Calculated_LOS"), 1).alias("Avg_LOS")) \
                            .orderBy("Department", "StayQ_Quartile")
    stayq_summary.show(20, truncate=False)

    print(f"\nStayQ transformation complete. Ready for export/downstream Tableau ingestion.")
    spark.stop()

if __name__ == "__main__":
    run_stayq_transformation()
