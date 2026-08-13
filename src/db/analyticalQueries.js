export const ANALYTICAL_QUERIES = [
  {
    id: "readmission-lag",
    title: "1. 30-Day Readmission Analysis (LAG Window Function)",
    category: "Window Functions",
    difficulty: "Advanced",
    description: "Identifies patients readmitted within 30 days of prior discharge using LAG() window functions, calculating exact days elapsed between hospital visits.",
    sql: `-- Find 30-day patient readmissions using LAG window function
WITH PatientAdmissions AS (
    SELECT 
        a.patient_id,
        p.name AS patient_name,
        a.admission_id,
        a.admission_date,
        a.discharge_date,
        a.diagnosis,
        LAG(a.discharge_date) OVER (
            PARTITION BY a.patient_id 
            ORDER BY a.admission_date
        ) AS prev_discharge_date
    FROM admissions a
    JOIN patients p ON a.patient_id = p.patient_id
)
SELECT 
    patient_id,
    patient_name,
    diagnosis,
    admission_date,
    prev_discharge_date,
    ROUND(JULIANDAY(admission_date) - JULIANDAY(prev_discharge_date)) AS days_out,
    CASE 
        WHEN (JULIANDAY(admission_date) - JULIANDAY(prev_discharge_date)) <= 10 THEN 'High'
        WHEN (JULIANDAY(admission_date) - JULIANDAY(prev_discharge_date)) <= 20 THEN 'Medium'
        ELSE 'Low'
    END AS readmission_risk
FROM PatientAdmissions
WHERE prev_discharge_date IS NOT NULL 
  AND (JULIANDAY(admission_date) - JULIANDAY(prev_discharge_date)) <= 30
ORDER BY days_out ASC;`
  },
  {
    id: "dept-los-cte",
    title: "2. Average Length of Stay (LOS) per Department (CTE)",
    category: "CTEs & Aggregation",
    difficulty: "Intermediate",
    description: "Uses Common Table Expressions (CTEs) to compute average length of stay (in days) and bed occupancy efficiency across all hospital units.",
    sql: `-- Compute Average Length of Stay (LOS) by Department using CTE
WITH DepartmentStats AS (
    SELECT 
        d.dept_id,
        d.dept_name,
        d.total_beds,
        d.occupied_beds,
        COUNT(a.admission_id) AS total_admissions,
        ROUND(AVG(JULIANDAY(a.discharge_date) - JULIANDAY(a.admission_date)), 1) AS avg_los_days
    FROM departments d
    LEFT JOIN admissions a ON d.dept_id = a.dept_id
    GROUP BY d.dept_id, d.dept_name, d.total_beds, d.occupied_beds
)
SELECT 
    dept_name,
    total_admissions,
    avg_los_days,
    ROUND((occupied_beds * 100.0 / total_beds), 1) || '%' AS bed_occupancy_rate
FROM DepartmentStats
ORDER BY avg_los_days DESC;`
  },
  {
    id: "doctor-recovery-rank",
    title: "3. Doctor Performance & Recovery Ranking (DENSE_RANK)",
    category: "Window Functions",
    difficulty: "Advanced",
    description: "Ranks doctors within their respective department based on average patient recovery times and active patient load.",
    sql: `-- Rank doctors by patient recovery speed and workload
WITH DoctorPerformance AS (
    SELECT 
        doc.doctor_id,
        doc.name AS doctor_name,
        dept.dept_name,
        doc.patient_load,
        ROUND(AVG(JULIANDAY(a.discharge_date) - JULIANDAY(a.admission_date)), 1) AS avg_recovery_days,
        DENSE_RANK() OVER (
            PARTITION BY doc.dept_id 
            ORDER BY AVG(JULIANDAY(a.discharge_date) - JULIANDAY(a.admission_date)) ASC
        ) AS efficiency_rank
    FROM doctors doc
    JOIN departments dept ON doc.dept_id = dept.dept_id
    JOIN admissions a ON doc.doctor_id = a.doctor_id
    WHERE a.admission_status = 'Discharged'
    GROUP BY doc.doctor_id, doc.name, dept.dept_name, doc.patient_load, doc.dept_id
)
SELECT * FROM DoctorPerformance
ORDER BY dept_name, efficiency_rank;`
  },
  {
    id: "billing-due-conditional",
    title: "4. Revenue Leakage & Outstanding Dues (Conditional Aggregation)",
    category: "Financial Analytics",
    difficulty: "Intermediate",
    description: "Calculates total treatment costs, insurance payouts, and pending out-of-pocket dues grouped by patient diagnosis.",
    sql: `-- Analyze insurance vs out-of-pocket revenue and pending dues
SELECT 
    a.diagnosis,
    COUNT(b.bill_id) AS total_bills,
    ROUND(SUM(b.treatment_cost) / 100000.0, 2) AS total_cost_lakhs,
    ROUND(SUM(b.insurance_covered) / 100000.0, 2) AS insurance_paid_lakhs,
    ROUND(SUM(CASE WHEN b.payment_status = 'Pending' THEN b.out_of_pocket ELSE 0 END) / 100000.0, 2) AS pending_dues_lakhs,
    ROUND(
        (SUM(CASE WHEN b.payment_status = 'Pending' THEN b.out_of_pocket ELSE 0 END) * 100.0 / SUM(b.treatment_cost)), 
        1
    ) || '%' AS pending_dues_pct
FROM billing b
JOIN admissions a ON b.admission_id = a.admission_id
GROUP BY a.diagnosis
ORDER BY pending_dues_lakhs DESC;`
  },
  {
    id: "monthly-dept-growth",
    title: "5. Monthly Admission Trends by Department (Subqueries & Pivoting)",
    category: "Reporting & Trends",
    difficulty: "Intermediate",
    description: "Generates monthly admission totals for General Ward, ICU, and Cardiology across the Jan - Jun 2024 period.",
    sql: `-- Monthly admission counts pivoted by department
SELECT 
    STRFTIME('%Y-%m', admission_date) AS month,
    SUM(CASE WHEN d.dept_name = 'General Ward' THEN 1 ELSE 0 END) AS general_ward_admissions,
    SUM(CASE WHEN d.dept_name = 'ICU' THEN 1 ELSE 0 END) AS icu_admissions,
    SUM(CASE WHEN d.dept_name = 'Cardiology' THEN 1 ELSE 0 END) AS cardiology_admissions,
    COUNT(a.admission_id) AS total_monthly_admissions
FROM admissions a
JOIN departments d ON a.dept_id = d.dept_id
WHERE admission_date BETWEEN '2024-01-01' AND '2024-06-30'
GROUP BY STRFTIME('%Y-%m', admission_date)
ORDER BY month ASC;`
  }
];
