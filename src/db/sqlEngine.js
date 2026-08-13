// Client-side SQL Simulation & Query Parser Engine for MedFlow Studio
import { 
  TOP_READMISSION_RISK_PATIENTS, 
  DEPARTMENTS_DATA, 
  DOCTORS_DATA, 
  PATIENTS_DIRECTORY,
  REVENUE_TREND_DATA 
} from './mockData';

export function executeSqlQuery(sqlQuery) {
  const startTime = performance.now();
  const queryLower = sqlQuery.toLowerCase().trim();

  // Route query based on intent or query signatures
  if (queryLower.includes('lag(') || queryLower.includes('readmission_risk') || queryLower.includes('patientvisits')) {
    const data = TOP_READMISSION_RISK_PATIENTS.map(p => ({
      patient_id: p.id,
      patient_name: p.patientName,
      diagnosis: p.diagnosis,
      admission_date: "2024-05-12",
      prev_discharge_date: "2024-05-04",
      days_out: p.daysOut,
      readmission_risk: p.risk
    }));
    const columns = ['patient_id', 'patient_name', 'diagnosis', 'admission_date', 'prev_discharge_date', 'days_out', 'readmission_risk'];
    const endTime = performance.now();
    return {
      success: true,
      columns,
      rows: data,
      executionTimeMs: (endTime - startTime).toFixed(2),
      rowCount: data.length
    };
  }

  if (queryLower.includes('departmentstats') || queryLower.includes('avg_los_days')) {
    const data = DEPARTMENTS_DATA.map(d => ({
      dept_name: d.name,
      total_admissions: Math.floor(d.occupiedBeds * 8.5),
      avg_los_days: d.avgLos,
      bed_occupancy_rate: `${Math.round((d.occupiedBeds / d.totalBeds) * 100)}%`
    }));
    const columns = ['dept_name', 'total_admissions', 'avg_los_days', 'bed_occupancy_rate'];
    const endTime = performance.now();
    return {
      success: true,
      columns,
      rows: data,
      executionTimeMs: (endTime - startTime).toFixed(2),
      rowCount: data.length
    };
  }

  if (queryLower.includes('doctorperformance') || queryLower.includes('efficiency_rank')) {
    const data = DOCTORS_DATA.map((d, index) => ({
      doctor_id: d.id,
      doctor_name: d.name,
      dept_name: d.dept,
      patient_load: d.patientLoad,
      avg_recovery_days: d.avgRecoveryDays,
      efficiency_rank: index + 1
    }));
    const columns = ['doctor_id', 'doctor_name', 'dept_name', 'patient_load', 'avg_recovery_days', 'efficiency_rank'];
    const endTime = performance.now();
    return {
      success: true,
      columns,
      rows: data,
      executionTimeMs: (endTime - startTime).toFixed(2),
      rowCount: data.length
    };
  }

  if (queryLower.includes('pending_dues_lakhs') || queryLower.includes('treatment_cost')) {
    const data = [
      { diagnosis: "Heart failure", total_bills: 142, total_cost_lakhs: 20.5, insurance_paid_lakhs: 17.2, pending_dues_lakhs: 3.3, pending_dues_pct: "16.1%" },
      { diagnosis: "Pneumonia", total_bills: 98, total_cost_lakhs: 12.8, insurance_paid_lakhs: 11.2, pending_dues_lakhs: 1.6, pending_dues_pct: "12.5%" },
      { diagnosis: "COPD", total_bills: 76, total_cost_lakhs: 10.4, insurance_paid_lakhs: 9.5, pending_dues_lakhs: 0.9, pending_dues_pct: "8.6%" },
      { diagnosis: "Diabetes", total_bills: 110, total_cost_lakhs: 8.9, insurance_paid_lakhs: 8.3, pending_dues_lakhs: 0.6, pending_dues_pct: "6.7%" }
    ];
    const columns = ['diagnosis', 'total_bills', 'total_cost_lakhs', 'insurance_paid_lakhs', 'pending_dues_lakhs', 'pending_dues_pct'];
    const endTime = performance.now();
    return {
      success: true,
      columns,
      rows: data,
      executionTimeMs: (endTime - startTime).toFixed(2),
      rowCount: data.length
    };
  }

  if (queryLower.includes('strftime') || queryLower.includes('general_ward_admissions')) {
    const data = [
      { month: "2024-01", general_ward_admissions: 420, icu_admissions: 180, cardiology_admissions: 210, total_monthly_admissions: 810 },
      { month: "2024-02", general_ward_admissions: 480, icu_admissions: 210, cardiology_admissions: 250, total_monthly_admissions: 940 },
      { month: "2024-03", general_ward_admissions: 390, icu_admissions: 160, cardiology_admissions: 190, total_monthly_admissions: 740 },
      { month: "2024-04", general_ward_admissions: 510, icu_admissions: 230, cardiology_admissions: 260, total_monthly_admissions: 1000 },
      { month: "2024-05", general_ward_admissions: 440, icu_admissions: 190, cardiology_admissions: 220, total_monthly_admissions: 850 },
      { month: "2024-06", general_ward_admissions: 450, icu_admissions: 200, cardiology_admissions: 222, total_monthly_admissions: 872 }
    ];
    const columns = ['month', 'general_ward_admissions', 'icu_admissions', 'cardiology_admissions', 'total_monthly_admissions'];
    const endTime = performance.now();
    return {
      success: true,
      columns,
      rows: data,
      executionTimeMs: (endTime - startTime).toFixed(2),
      rowCount: data.length
    };
  }

  // Fallback default query response (Select * from patients)
  const defaultData = PATIENTS_DIRECTORY.map(p => ({
    patient_id: p.id,
    name: p.name,
    age: p.age,
    gender: p.gender,
    dept: p.dept,
    diagnosis: p.diagnosis,
    risk: p.risk,
    billing: p.billing
  }));
  const columns = ['patient_id', 'name', 'age', 'gender', 'dept', 'diagnosis', 'risk', 'billing'];
  const endTime = performance.now();
  return {
    success: true,
    columns,
    rows: defaultData,
    executionTimeMs: (endTime - startTime).toFixed(2),
    rowCount: defaultData.length
  };
}
