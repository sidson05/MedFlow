-- ===================================================
-- MedFlow Analytics Portal - Relational Schema (DDL)
-- ===================================================

CREATE TABLE IF NOT EXISTS patients (
    patient_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    contact VARCHAR(20),
    chronic_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
    dept_id VARCHAR(20) PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL,
    total_beds INT NOT NULL,
    occupied_beds INT NOT NULL,
    head_doctor VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS doctors (
    doctor_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(50) NOT NULL,
    dept_id VARCHAR(20) REFERENCES departments(dept_id),
    avg_recovery_days DECIMAL(4,1),
    patient_load INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admissions (
    admission_id VARCHAR(20) PRIMARY KEY,
    patient_id VARCHAR(20) REFERENCES patients(patient_id),
    dept_id VARCHAR(20) REFERENCES departments(dept_id),
    doctor_id VARCHAR(20) REFERENCES doctors(doctor_id),
    admission_date DATE NOT NULL,
    discharge_date DATE,
    diagnosis VARCHAR(50) NOT NULL,
    room_type VARCHAR(20) CHECK (room_type IN ('ICU', 'General Ward', 'Private Suite', 'Cardiology Unit')),
    admission_status VARCHAR(20) CHECK (admission_status IN ('Admitted', 'Discharged', 'Transferred'))
);

CREATE TABLE IF NOT EXISTS billing (
    bill_id VARCHAR(20) PRIMARY KEY,
    admission_id VARCHAR(20) REFERENCES admissions(admission_id),
    treatment_cost DECIMAL(10,2) NOT NULL,
    insurance_covered DECIMAL(10,2) NOT NULL,
    out_of_pocket DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) CHECK (payment_status IN ('Paid', 'Pending', 'Partial')),
    billing_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS readmissions (
    readmission_id VARCHAR(20) PRIMARY KEY,
    patient_id VARCHAR(20) REFERENCES patients(patient_id),
    original_admission_id VARCHAR(20) REFERENCES admissions(admission_id),
    readmit_admission_id VARCHAR(20) REFERENCES admissions(admission_id),
    days_between INT NOT NULL,
    readmit_diagnosis VARCHAR(50),
    risk_level VARCHAR(10) CHECK (risk_level IN ('High', 'Medium', 'Low'))
);
