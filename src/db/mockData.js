// MedFlow Hospital Dataset - Matching Wireframe Metrics (Jan - Jun 2024)

export const OVERVIEW_KPI_DATA = {
  totalAdmissions: {
    value: "4,812",
    numeric: 4812,
    change: "+8.3%",
    isPositive: true,
    subtext: "vs last period"
  },
  avgLengthOfStay: {
    value: "4.2d",
    numeric: 4.2,
    change: "-0.3d",
    isPositive: true, // Reducing LOS is positive for hospital bed turnover
    subtext: "vs last period"
  },
  bedOccupancy: {
    value: "76%",
    numeric: 76,
    change: "+2%",
    isPositive: true,
    subtext: "vs last period"
  },
  readmissionRate: {
    value: "12.4%",
    numeric: 12.4,
    change: "-1.1%",
    isPositive: true, // Lower readmission is positive
    subtext: "vs last period"
  }
};

export const MONTHLY_DEPT_ADMISSIONS = [
  { month: "Jan", generalWard: 420, icu: 180, cardiology: 210, total: 810 },
  { month: "Feb", generalWard: 480, icu: 210, cardiology: 250, total: 940 },
  { month: "Mar", generalWard: 390, icu: 160, cardiology: 190, total: 740 },
  { month: "Apr", generalWard: 510, icu: 230, cardiology: 260, total: 1000 },
  { month: "May", generalWard: 440, icu: 190, cardiology: 220, total: 850 },
  { month: "Jun", generalWard: 450, icu: 200, cardiology: 222, total: 872 }
];

export const DIAGNOSIS_DISTRIBUTION = [
  { name: "Cardiac", value: 30, color: "#3B82F6" },      // Blue
  { name: "Respiratory", value: 20, color: "#10B981" },  // Emerald Green
  { name: "Trauma", value: 16, color: "#F59E0B" },       // Amber
  { name: "Other", value: 34, color: "#EC4899" }         // Pink/Purple
];

export const TOP_READMISSION_RISK_PATIENTS = [
  { id: "P-1042", patientName: "Rajesh Sharma", age: 64, diagnosis: "Heart failure", daysOut: 8, risk: "High", doctor: "Dr. A. Mehta", dept: "Cardiology" },
  { id: "P-0887", patientName: "Sunita Verma", age: 71, diagnosis: "Pneumonia", daysOut: 14, risk: "High", doctor: "Dr. S. Kulkarni", dept: "Pulmonology" },
  { id: "P-2201", patientName: "Amitabh Patel", age: 58, diagnosis: "Diabetes", daysOut: 22, risk: "Medium", doctor: "Dr. R. Deshmukh", dept: "Endocrinology" },
  { id: "P-3309", patientName: "Priya Nair", age: 62, diagnosis: "COPD", daysOut: 19, risk: "Medium", doctor: "Dr. S. Kulkarni", dept: "Pulmonology" },
  { id: "P-0554", patientName: "Vikram Singh", age: 79, diagnosis: "Hip fracture", daysOut: 27, risk: "Low", doctor: "Dr. K. Joshi", dept: "Orthopedics" }
];

export const REVENUE_TREND_DATA = [
  { month: "Jan", collected: 6.8, pending: 0.9, total: 7.7 },
  { month: "Feb", collected: 7.9, pending: 1.1, total: 9.0 },
  { month: "Mar", collected: 7.2, pending: 0.8, total: 8.0 },
  { month: "Apr", collected: 8.9, pending: 1.3, total: 10.2 },
  { month: "May", collected: 8.6, pending: 1.2, total: 9.8 },
  { month: "Jun", collected: 8.8, pending: 1.1, total: 9.9 }
];

export const REVENUE_SUMMARY = {
  totalCollected: "48.2L",
  totalPending: "6.4L",
  currencySymbol: "₹"
};

export const DEPARTMENTS_DATA = [
  { id: "D-101", name: "General Ward", totalBeds: 150, occupiedBeds: 118, headDoctor: "Dr. N. Roy", avgLos: 4.8, annualBudget: "₹1.2 Cr" },
  { id: "D-102", name: "ICU", totalBeds: 45, occupiedBeds: 39, headDoctor: "Dr. M. Chawla", avgLos: 6.2, annualBudget: "₹2.8 Cr" },
  { id: "D-103", name: "Cardiology", totalBeds: 60, occupiedBeds: 48, headDoctor: "Dr. A. Mehta", avgLos: 4.1, annualBudget: "₹2.1 Cr" },
  { id: "D-104", name: "Orthopedics", totalBeds: 40, occupiedBeds: 28, headDoctor: "Dr. K. Joshi", avgLos: 3.9, annualBudget: "₹1.5 Cr" },
  { id: "D-105", name: "Pediatrics", totalBeds: 35, occupiedBeds: 22, headDoctor: "Dr. S. Banerjee", avgLos: 3.2, annualBudget: "₹90 Lakhs" }
];

export const DOCTORS_DATA = [
  { id: "DOC-01", name: "Dr. A. Mehta", dept: "Cardiology", specialization: "Interventional Cardiology", patientLoad: 42, avgRecoveryDays: 3.8, rating: 4.9 },
  { id: "DOC-02", name: "Dr. S. Kulkarni", dept: "Pulmonology", specialization: "Pulmonary Medicine", patientLoad: 38, avgRecoveryDays: 4.5, rating: 4.8 },
  { id: "DOC-03", name: "Dr. M. Chawla", dept: "ICU", specialization: "Critical Care", patientLoad: 29, avgRecoveryDays: 6.1, rating: 4.9 },
  { id: "DOC-04", name: "Dr. R. Deshmukh", dept: "Endocrinology", specialization: "Diabetology", patientLoad: 35, avgRecoveryDays: 4.0, rating: 4.7 },
  { id: "DOC-05", name: "Dr. K. Joshi", dept: "Orthopedics", specialization: "Trauma & Joint Replacement", patientLoad: 31, avgRecoveryDays: 3.9, rating: 4.8 }
];

export const PATIENTS_DIRECTORY = [
  { id: "P-1042", name: "Rajesh Sharma", age: 64, gender: "Male", dept: "Cardiology", diagnosis: "Heart failure", admissionDate: "2024-05-12", dischargeDate: "2024-05-18", readmitDate: "2024-05-26", daysOut: 8, risk: "High", billing: "₹1,45,000", paymentStatus: "Paid" },
  { id: "P-0887", name: "Sunita Verma", age: 71, gender: "Female", dept: "Pulmonology", diagnosis: "Pneumonia", admissionDate: "2024-05-01", dischargeDate: "2024-05-08", readmitDate: "2024-05-22", daysOut: 14, risk: "High", billing: "₹92,000", paymentStatus: "Pending" },
  { id: "P-2201", name: "Amitabh Patel", age: 58, gender: "Male", dept: "Endocrinology", diagnosis: "Diabetes", admissionDate: "2024-04-15", dischargeDate: "2024-04-20", readmitDate: "2024-05-12", daysOut: 22, risk: "Medium", billing: "₹68,000", paymentStatus: "Paid" },
  { id: "P-3309", name: "Priya Nair", age: 62, gender: "Female", dept: "Pulmonology", diagnosis: "COPD", admissionDate: "2024-05-10", dischargeDate: "2024-05-15", readmitDate: "2024-06-03", daysOut: 19, risk: "Medium", billing: "₹84,000", paymentStatus: "Pending" },
  { id: "P-0554", name: "Vikram Singh", age: 79, gender: "Male", dept: "Orthopedics", diagnosis: "Hip fracture", admissionDate: "2024-04-02", dischargeDate: "2024-04-12", readmitDate: "2024-05-09", daysOut: 27, risk: "Low", billing: "₹2,10,000", paymentStatus: "Paid" },
  { id: "P-4102", name: "Ananya Roy", age: 45, gender: "Female", dept: "General Ward", diagnosis: "Acute Appendicitis", admissionDate: "2024-06-01", dischargeDate: "2024-06-04", readmitDate: null, daysOut: null, risk: "Low", billing: "₹55,000", paymentStatus: "Paid" },
  { id: "P-5190", name: "Suresh Gupta", age: 68, gender: "Male", dept: "ICU", diagnosis: "Sepsis", admissionDate: "2024-05-20", dischargeDate: "2024-05-30", readmitDate: null, daysOut: null, risk: "High", billing: "₹3,40,000", paymentStatus: "Partial" }
];
