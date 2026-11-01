"""
StayQ Transformation Pipeline (Pandas / Big Data Engine)
Performs Length of Stay (LOS) quartiles & 30-day HRRP readmission scoring on the admissions dataset.
"""

import pandas as pd
import numpy as np

def run_stayq():
    print("==================================================")
    print("  Running MedFlow StayQ Transformation Pipeline   ")
    print("==================================================")

    # 1. Load admissions dataset
    csv_path = 'tableau_data/medflow_admissions_4812.csv'
    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df):,} admissions records.")

    # 2. Date parsing and LOS validation
    df['Admission_Date'] = pd.to_datetime(df['Admission_Date'])
    df['Discharge_Date'] = pd.to_datetime(df['Discharge_Date'])
    df['Calculated_LOS'] = (df['Discharge_Date'] - df['Admission_Date']).dt.days

    # 3. Window partitioning: prior discharge date & days elapsed
    df = df.sort_values(by=['Patient_ID', 'Admission_Date']).reset_index(drop=True)
    df['Prev_Discharge_Date'] = df.groupby('Patient_ID')['Discharge_Date'].shift(1)
    df['Days_Out_Calculated'] = (df['Admission_Date'] - df['Prev_Discharge_Date']).dt.days

    # 4. 30-Day HRRP Readmission Flag & Risk Scoring (from calibrated admissions)
    if 'Is_30_Day_Readmission' in df.columns:
        df['Is_30Day_Readmit'] = df['Is_30_Day_Readmission']
        df['StayQ_Readmit_Risk'] = df['Readmission_Risk_Tier']
    else:
        df['Is_30Day_Readmit'] = np.where(
            (df['Days_Out_Calculated'] >= 0) & (df['Days_Out_Calculated'] <= 30), 1, 0
        )
        conditions = [
            (df['Days_Out_Calculated'] <= 10) & (df['Days_Out_Calculated'] >= 0),
            (df['Days_Out_Calculated'] <= 20) & (df['Days_Out_Calculated'] > 10),
            (df['Days_Out_Calculated'] <= 30) & (df['Days_Out_Calculated'] > 20)
        ]
        choices = ['High', 'Medium', 'Low']
        df['StayQ_Readmit_Risk'] = np.select(conditions, choices, default='Baseline')

    # 5. StayQ Discretization (Quartile Segmentation)
    # Segments stays into 4 operational tiers
    stayq_bins = [-np.inf, 2, 4, 7, np.inf]
    stayq_labels = ['StayQ-1 (Short: 1-2d)', 'StayQ-2 (Standard: 3-4d)', 'StayQ-3 (Extended: 5-7d)', 'StayQ-4 (Complex: 8+d)']
    df['StayQ_Quartile'] = pd.cut(df['Calculated_LOS'], bins=stayq_bins, labels=stayq_labels)

    # 6. Executive KPI Verification
    total_adm = len(df)
    avg_los = df['Calculated_LOS'].mean()
    total_readmits = df['Is_30Day_Readmit'].sum()
    readmit_rate = (total_readmits / total_adm) * 100

    print("\n--- Transformed Executive KPIs ---")
    print(f"Total Admissions        : {total_adm:,}")
    print(f"Average Length of Stay  : {avg_los:.2f} days")
    print(f"30-Day Readmission Count: {total_readmits:,}")
    print(f"30-Day Readmission Rate : {readmit_rate:.2f}%")

    print("\n--- StayQ Quartiles Breakdown ---")
    quartile_summary = df.groupby('StayQ_Quartile', observed=False).agg(
        Admissions=('Admission_ID', 'count'),
        Avg_LOS=('Calculated_LOS', 'mean'),
        Readmissions=('Is_30Day_Readmit', 'sum')
    )
    quartile_summary['Readmit_Rate_Pct'] = (quartile_summary['Readmissions'] / quartile_summary['Admissions']) * 100
    print(quartile_summary.round(2).to_string())

    print("\n--- Departmental StayQ Distribution ---")
    dept_stayq = pd.crosstab(df['Department'], df['StayQ_Quartile'], normalize='index') * 100
    print(dept_stayq.round(1).to_string())

    # Save transformed data back for Tableau
    transformed_path = 'tableau_data/medflow_stayq_enriched_4812.csv'
    df.to_csv(transformed_path, index=False)
    print(f"\nSaved enriched dataset to {transformed_path}")

if __name__ == '__main__':
    run_stayq()
