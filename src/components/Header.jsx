import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, SlidersHorizontal, Search, RotateCcw, Check, X, Download } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Header() {
  const { 
    activeTab, 
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
    searchQuery,
    setSearchQuery,
    activeFilterCount,
    resetAllSlicers,
    patients,
    departments,
    doctors
  } = useDashboard();

  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showMorePopover, setShowMorePopover] = useState(false);

  const dateMenuRef = useRef(null);
  const morePopoverRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dateMenuRef.current && !dateMenuRef.current.contains(e.target)) {
        setShowDateMenu(false);
      }
      if (morePopoverRef.current && !morePopoverRef.current.contains(e.target)) {
        setShowMorePopover(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dateOptions = [
    { id: 'Jan – Jun 2024', label: 'Jan – Jun 2024 (Full Period)' },
    { id: 'Q1 2024 (Jan-Mar)', label: 'Q1 2024 (Jan - Mar)' },
    { id: 'Q2 2024 (Apr-Jun)', label: 'Q2 2024 (Apr - Jun)' },
    { id: 'Last 30 Days', label: 'Last 30 Days' }
  ];

  const getHeaderMeta = () => {
    switch (activeTab) {
      case 'overview':
        return {
          title: 'Hospital overview',
          subtitle: 'Performance, patient flow and revenue at a glance'
        };
      case 'patients':
        return {
          title: 'Patient records & admissions',
          subtitle: 'Directory of patient stays, diagnoses and return risk profiles'
        };
      case 'departments':
        return {
          title: 'Department performance',
          subtitle: 'Bed capacity, occupancy rates and length of stay benchmarks'
        };
      case 'readmissions':
        return {
          title: '30-day readmission analytics',
          subtitle: 'HRRP compliance tracking, risk scoring and window intervals'
        };
      case 'doctors':
        return {
          title: 'Physician analytics & workload',
          subtitle: 'Recovery durations, clinical caseloads and doctor ratings'
        };
      case 'billing':
        return {
          title: 'Financial & revenue insights',
          subtitle: 'Collections trajectory, pending dues and insurance settlements'
        };
      case 'sqlStudio':
        return {
          title: 'SQL query studio',
          subtitle: 'Analytical SQL execution against the relational hospital schema'
        };
      case 'config':
        return {
          title: 'System configuration',
          subtitle: 'Database re-seeding, external BI exports and parameters'
        };
      default:
        return {
          title: 'Hospital overview',
          subtitle: 'Performance, patient flow and revenue at a glance'
        };
    }
  };

  const handleExportReport = () => {
    const reportData = {
      period: dateRange,
      department: selectedDepartment,
      diagnosis: selectedDiagnosis,
      filters: { riskFilter, paymentFilter },
      exportedAt: new Date().toISOString(),
      summary: {
        totalPatients: patients.length,
        totalDepartments: departments.length,
        totalDoctors: doctors.length
      }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medflow_hospital_report_${dateRange.replace(/[\s–()]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const { title, subtitle } = getHeaderMeta();

  return (
    <header className="bg-panel border-b border-line px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-serif font-semibold text-[31px] text-ink leading-tight tracking-tight">{title}</h1>
        <p className="text-[12.5px] text-muted mt-0.5">{subtitle}</p>
      </div>

      {/* Global Slicers & Filters */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search Input for relevant pages */}
        {(activeTab === 'patients' || activeTab === 'doctors') && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-panel border border-line text-ink text-xs rounded-full pl-9 pr-3.5 py-2 focus:outline-none focus:border-accent w-44 shadow-2xs"
            />
          </div>
        )}

        {/* 1. Date Range Dropdown Popover */}
        <div className="relative" ref={dateMenuRef}>
          <button 
            type="button"
            onClick={() => setShowDateMenu(!showDateMenu)}
            className="flex items-center space-x-2 bg-panel hover:bg-panel2 border border-line text-ink px-3.5 py-2 rounded-full text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{dateRange}</span>
            <ChevronDown className={`w-3 h-3 text-muted ml-0.5 transition-transform ${showDateMenu ? 'rotate-180' : ''}`} />
          </button>

          {showDateMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-panel border border-line rounded-xl shadow-lg z-50 p-1.5 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-muted px-3 py-1 block tracking-wider">
                Select Date Range
              </span>
              {dateOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setDateRange(opt.id);
                    setShowDateMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-colors ${
                    dateRange === opt.id 
                      ? 'bg-accentSoft text-accent font-semibold' 
                      : 'text-ink hover:bg-panel2'
                  }`}
                >
                  <span>{opt.label}</span>
                  {dateRange === opt.id && <Check className="w-3.5 h-3.5 text-accent" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Department Slicer */}
        <div className="relative">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-panel border border-line text-ink text-xs font-medium rounded-full pl-3.5 pr-8 py-2 appearance-none cursor-pointer hover:bg-panel2 shadow-2xs focus:outline-none focus:border-accent transition-colors"
          >
            <option value="All departments">All departments</option>
            <option value="General Ward">General Ward</option>
            <option value="ICU">ICU</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pulmonology">Pulmonology</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Diagnosis Slicer */}
        <div className="relative">
          <select
            value={selectedDiagnosis}
            onChange={(e) => setSelectedDiagnosis(e.target.value)}
            className="bg-panel border border-line text-ink text-xs font-medium rounded-full pl-3.5 pr-8 py-2 appearance-none cursor-pointer hover:bg-panel2 shadow-2xs focus:outline-none focus:border-accent transition-colors"
          >
            <option value="All diagnoses">All diagnoses</option>
            <option value="Cardiac">Cardiac (Heart failure)</option>
            <option value="Respiratory">Respiratory (Pneumonia/COPD)</option>
            <option value="Trauma">Trauma (Hip fracture)</option>
            <option value="Diabetes">Endocrine (Diabetes)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. More Filters Popover Panel */}
        <div className="relative" ref={morePopoverRef}>
          <button 
            type="button"
            onClick={() => setShowMorePopover(!showMorePopover)}
            className={`flex items-center space-x-1.5 border px-3.5 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer shadow-2xs ${
              activeFilterCount > 0 
                ? 'bg-accentSoft border-accent/40 text-accent font-semibold' 
                : 'bg-panel border-line text-ink hover:bg-panel2'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted" />
            <span>More</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 bg-accent text-forestTx font-semibold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {showMorePopover && (
            <div className="absolute right-0 mt-2 w-64 bg-panel border border-line rounded-2xl shadow-xl z-50 p-4 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <span className="text-xs font-semibold text-ink">Advanced slicers</span>
                <button 
                  onClick={() => setShowMorePopover(false)}
                  className="text-muted hover:text-ink transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Risk Level Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted block">Readmission risk level</label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full bg-panel border border-line text-ink text-xs rounded-lg p-2 focus:outline-none focus:border-accent"
                >
                  <option value="All">All Risk Levels</option>
                  <option value="High">High Risk Only</option>
                  <option value="Medium">Medium Risk Only</option>
                  <option value="Low">Low Risk Only</option>
                </select>
              </div>

              {/* Billing Payment Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted block">Payment status</label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full bg-panel border border-line text-ink text-xs rounded-lg p-2 focus:outline-none focus:border-accent"
                >
                  <option value="All">All Payment Statuses</option>
                  <option value="Paid">Paid Only</option>
                  <option value="Pending">Pending Dues Only</option>
                  <option value="Partial">Partial Dues</option>
                </select>
              </div>

              {/* Reset Slicers Button */}
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    resetAllSlicers();
                    setShowMorePopover(false);
                  }}
                  className="w-full flex items-center justify-center space-x-1.5 bg-bad/10 hover:bg-bad/15 border border-bad/20 text-bad py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset all slicers ({activeFilterCount})</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 5. Forest Pill Button: Export Report */}
        <button
          type="button"
          onClick={handleExportReport}
          className="bg-forest hover:opacity-95 text-forestTx rounded-full px-4 py-2 text-xs font-semibold shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer ml-1"
        >
          <Download className="w-3.5 h-3.5 text-forestTx" />
          <span>Export report</span>
        </button>
      </div>
    </header>
  );
}
