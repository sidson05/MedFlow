import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  OVERVIEW_KPI_DATA, 
  MONTHLY_DEPT_ADMISSIONS, 
  DIAGNOSIS_DISTRIBUTION, 
  TOP_READMISSION_RISK_PATIENTS, 
  REVENUE_TREND_DATA, 
  REVENUE_SUMMARY,
  PATIENTS_DIRECTORY,
  DEPARTMENTS_DATA,
  DOCTORS_DATA
} from '../db/mockData';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('Jan – Jun 2024');
  const [selectedDepartment, setSelectedDepartment] = useState('All departments');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('All diagnoses');
  const [riskFilter, setRiskFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Dynamic Patient Filter
  const filteredPatients = useMemo(() => {
    return PATIENTS_DIRECTORY.filter(patient => {
      const matchesDept = selectedDepartment === 'All departments' || 
        patient.dept.toLowerCase() === selectedDepartment.toLowerCase();
      
      const matchesDiagnosis = selectedDiagnosis === 'All diagnoses' || 
        patient.diagnosis.toLowerCase().includes(selectedDiagnosis.toLowerCase()) ||
        (selectedDiagnosis === 'Cardiac' && patient.diagnosis.toLowerCase().includes('heart')) ||
        (selectedDiagnosis === 'Respiratory' && (patient.diagnosis.toLowerCase().includes('pneumonia') || patient.diagnosis.toLowerCase().includes('copd'))) ||
        (selectedDiagnosis === 'Trauma' && patient.diagnosis.toLowerCase().includes('hip'));

      const matchesRisk = riskFilter === 'All' || patient.risk.toLowerCase() === riskFilter.toLowerCase();
      const matchesPayment = paymentFilter === 'All' || patient.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

      const matchesSearch = searchQuery === '' || 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesDiagnosis && matchesRisk && matchesPayment && matchesSearch;
    });
  }, [selectedDepartment, selectedDiagnosis, riskFilter, paymentFilter, searchQuery]);

  // 2. Dynamic KPI Calculation
  const kpiData = useMemo(() => {
    // Baseline multipliers based on selected slicers
    let admissionsBase = 4812;
    let losBase = 4.2;
    let occupancyBase = 76;
    let readmissionBase = 12.4;

    if (selectedDepartment === 'Cardiology') {
      admissionsBase = 1260;
      losBase = 4.1;
      occupancyBase = 80;
      readmissionBase = 15.2;
    } else if (selectedDepartment === 'ICU') {
      admissionsBase = 1070;
      losBase = 6.2;
      occupancyBase = 87;
      readmissionBase = 18.5;
    } else if (selectedDepartment === 'General Ward') {
      admissionsBase = 2690;
      losBase = 4.8;
      occupancyBase = 79;
      readmissionBase = 9.8;
    } else if (selectedDepartment === 'Pulmonology') {
      admissionsBase = 840;
      losBase = 4.5;
      occupancyBase = 72;
      readmissionBase = 14.1;
    }

    if (selectedDiagnosis === 'Cardiac') {
      admissionsBase = Math.round(admissionsBase * 0.30);
      readmissionBase = 16.8;
    } else if (selectedDiagnosis === 'Respiratory') {
      admissionsBase = Math.round(admissionsBase * 0.20);
      readmissionBase = 14.2;
    } else if (selectedDiagnosis === 'Trauma') {
      admissionsBase = Math.round(admissionsBase * 0.16);
      readmissionBase = 7.5;
    }

    if (dateRange === 'Q1 2024 (Jan-Mar)') {
      admissionsBase = Math.round(admissionsBase * 0.51);
    } else if (dateRange === 'Q2 2024 (Apr-Jun)') {
      admissionsBase = Math.round(admissionsBase * 0.49);
    } else if (dateRange === 'Last 30 Days') {
      admissionsBase = Math.round(admissionsBase * 0.18);
    }

    return {
      totalAdmissions: {
        value: admissionsBase.toLocaleString(),
        change: "+8.3%",
        isPositive: true,
        subtext: "vs last period"
      },
      avgLengthOfStay: {
        value: `${losBase}d`,
        change: "-0.3d",
        isPositive: true,
        subtext: "vs last period"
      },
      bedOccupancy: {
        value: `${occupancyBase}%`,
        change: "+2%",
        isPositive: true,
        subtext: "vs last period"
      },
      readmissionRate: {
        value: `${readmissionBase}%`,
        change: "-1.1%",
        isPositive: true,
        subtext: "vs last period"
      }
    };
  }, [selectedDepartment, selectedDiagnosis, dateRange]);

  // 3. Dynamic Monthly Admissions Chart
  const monthlyDeptData = useMemo(() => {
    return MONTHLY_DEPT_ADMISSIONS.map(row => {
      let multiplier = 1;
      if (dateRange === 'Q1 2024 (Jan-Mar)' && ['Apr', 'May', 'Jun'].includes(row.month)) multiplier = 0;
      if (dateRange === 'Q2 2024 (Apr-Jun)' && ['Jan', 'Feb', 'Mar'].includes(row.month)) multiplier = 0;

      let gw = Math.round(row.generalWard * multiplier);
      let icu = Math.round(row.icu * multiplier);
      let card = Math.round(row.cardiology * multiplier);

      if (selectedDepartment === 'General Ward') { icu = 0; card = 0; }
      else if (selectedDepartment === 'ICU') { gw = 0; card = 0; }
      else if (selectedDepartment === 'Cardiology') { gw = 0; icu = 0; }

      return {
        month: row.month,
        generalWard: gw,
        icu: icu,
        cardiology: card,
        total: gw + icu + card
      };
    });
  }, [selectedDepartment, dateRange]);

  // 4. Dynamic Diagnosis Chart
  const diagnosisData = useMemo(() => {
    if (selectedDiagnosis === 'Cardiac') {
      return [
        { name: "Cardiac", value: 100, color: "#3B82F6" },
        { name: "Respiratory", value: 0, color: "#10B981" },
        { name: "Trauma", value: 0, color: "#F59E0B" },
        { name: "Other", value: 0, color: "#EC4899" }
      ];
    }
    if (selectedDiagnosis === 'Respiratory') {
      return [
        { name: "Cardiac", value: 0, color: "#3B82F6" },
        { name: "Respiratory", value: 100, color: "#10B981" },
        { name: "Trauma", value: 0, color: "#F59E0B" },
        { name: "Other", value: 0, color: "#EC4899" }
      ];
    }
    return DIAGNOSIS_DISTRIBUTION;
  }, [selectedDiagnosis]);

  // 5. Dynamic Readmission Risk Patients
  const topRiskPatients = useMemo(() => {
    return TOP_READMISSION_RISK_PATIENTS.filter(p => {
      const matchesDept = selectedDepartment === 'All departments' || p.dept.toLowerCase() === selectedDepartment.toLowerCase();
      const matchesDiagnosis = selectedDiagnosis === 'All diagnoses' || 
        p.diagnosis.toLowerCase().includes(selectedDiagnosis.toLowerCase()) ||
        (selectedDiagnosis === 'Cardiac' && p.diagnosis.toLowerCase().includes('heart')) ||
        (selectedDiagnosis === 'Respiratory' && (p.diagnosis.toLowerCase().includes('pneumonia') || p.diagnosis.toLowerCase().includes('copd'))) ||
        (selectedDiagnosis === 'Trauma' && p.diagnosis.toLowerCase().includes('hip'));
      const matchesRisk = riskFilter === 'All' || p.risk.toLowerCase() === riskFilter.toLowerCase();

      return matchesDept && matchesDiagnosis && matchesRisk;
    });
  }, [selectedDepartment, selectedDiagnosis, riskFilter]);

  // 6. Dynamic Revenue Data
  const revenueData = useMemo(() => {
    return REVENUE_TREND_DATA.map(r => {
      let multiplier = 1;
      if (selectedDepartment === 'Cardiology') multiplier = 0.35;
      else if (selectedDepartment === 'ICU') multiplier = 0.45;
      else if (selectedDepartment === 'General Ward') multiplier = 0.20;

      return {
        month: r.month,
        collected: Number((r.collected * multiplier).toFixed(1)),
        pending: Number((r.pending * multiplier).toFixed(1)),
        total: Number((r.total * multiplier).toFixed(1))
      };
    });
  }, [selectedDepartment]);

  const revenueSummary = useMemo(() => {
    const totalColl = revenueData.reduce((acc, curr) => acc + curr.collected, 0).toFixed(1);
    const totalPend = revenueData.reduce((acc, curr) => acc + curr.pending, 0).toFixed(1);
    return {
      totalCollected: `${totalColl}L`,
      totalPending: `${totalPend}L`,
      currencySymbol: "₹"
    };
  }, [revenueData]);

  // Count active filters for badge count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedDepartment !== 'All departments') count++;
    if (selectedDiagnosis !== 'All diagnoses') count++;
    if (dateRange !== 'Jan – Jun 2024') count++;
    if (riskFilter !== 'All') count++;
    if (paymentFilter !== 'All') count++;
    return count;
  }, [selectedDepartment, selectedDiagnosis, dateRange, riskFilter, paymentFilter]);

  const resetAllSlicers = () => {
    setSelectedDepartment('All departments');
    setSelectedDiagnosis('All diagnoses');
    setDateRange('Jan – Jun 2024');
    setRiskFilter('All');
    setPaymentFilter('All');
    setSearchQuery('');
  };

  const value = {
    activeTab,
    setActiveTab,
    dateRange,
    setDateRange,
    selectedDepartment,
    setSelectedDepartment,
    selectedDiagnosis,
    setSelectedDiagnosis,
    riskFilter,
    setRiskFilter,
    paymentFilter,
    setPaymentFilter,
    selectedPatient,
    setSelectedPatient,
    searchQuery,
    setSearchQuery,
    kpiData,
    monthlyDeptData,
    diagnosisData,
    topRiskPatients,
    revenueData,
    revenueSummary,
    patients: filteredPatients,
    departments: DEPARTMENTS_DATA,
    doctors: DOCTORS_DATA,
    activeFilterCount,
    resetAllSlicers
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
