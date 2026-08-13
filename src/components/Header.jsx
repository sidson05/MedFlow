import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, SlidersHorizontal, Search, RotateCcw, Check, X } from 'lucide-react';
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
    resetAllSlicers
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

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Hospital overview';
      case 'patients': return 'Patient Records & Readmissions';
      case 'departments': return 'Department Performance & Bed Capacity';
      case 'readmissions': return '30-Day Readmission Risk Tracker';
      case 'doctors': return 'Doctor Load & Recovery Analytics';
      case 'billing': return 'Financial & Billing Insights';
      case 'sqlStudio': return 'SQL Analytics Query Studio';
      case 'config': return 'System Settings & Config';
      default: return 'Hospital overview';
    }
  };

  return (
    <header className="bg-[#121316] border-b border-[#2A2D3A] px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">{getTitle()}</h1>
      </div>

      {/* Global Slicers & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input for relevant pages */}
        {(activeTab === 'patients' || activeTab === 'doctors') && (
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1A1C23] border border-[#2A2D3A] text-white text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 w-44"
            />
          </div>
        )}

        {/* 1. Date Range Dropdown Popover */}
        <div className="relative" ref={dateMenuRef}>
          <button 
            type="button"
            onClick={() => setShowDateMenu(!showDateMenu)}
            className="flex items-center space-x-2 bg-[#1A1C23] hover:bg-[#252833] border border-blue-500/40 text-blue-400 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>{dateRange}</span>
            <ChevronDown className={`w-3 h-3 text-blue-400 ml-1 transition-transform ${showDateMenu ? 'rotate-180' : ''}`} />
          </button>

          {showDateMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl shadow-2xl z-50 p-1.5 space-y-1 animate-in fade-in duration-150">
              <span className="text-[10px] uppercase font-bold text-[#64748B] px-3 py-1 block tracking-wider">
                Select Date Range
              </span>
              {dateOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setDateRange(opt.id);
                    setShowDateMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                    dateRange === opt.id 
                      ? 'bg-blue-600/20 text-blue-400 font-bold' 
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#252833]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {dateRange === opt.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
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
            className="bg-[#1A1C23] border border-[#2A2D3A] text-white text-xs font-medium rounded-lg px-3.5 py-2 appearance-none pr-8 cursor-pointer focus:outline-none focus:border-blue-500 hover:bg-[#252833] transition-all"
          >
            <option value="All departments">All departments</option>
            <option value="General Ward">General Ward</option>
            <option value="ICU">ICU</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pulmonology">Pulmonology</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Diagnosis Slicer */}
        <div className="relative">
          <select
            value={selectedDiagnosis}
            onChange={(e) => setSelectedDiagnosis(e.target.value)}
            className="bg-[#1A1C23] border border-[#2A2D3A] text-white text-xs font-medium rounded-lg px-3.5 py-2 appearance-none pr-8 cursor-pointer focus:outline-none focus:border-blue-500 hover:bg-[#252833] transition-all"
          >
            <option value="All diagnoses">All diagnoses</option>
            <option value="Cardiac">Cardiac (Heart failure)</option>
            <option value="Respiratory">Respiratory (Pneumonia/COPD)</option>
            <option value="Trauma">Trauma (Hip fracture)</option>
            <option value="Diabetes">Endocrine (Diabetes)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. More Filters Popover Panel */}
        <div className="relative" ref={morePopoverRef}>
          <button 
            type="button"
            onClick={() => setShowMorePopover(!showMorePopover)}
            className={`flex items-center space-x-1.5 border px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeFilterCount > 0 
                ? 'bg-blue-600/15 border-blue-500 text-blue-400 font-semibold' 
                : 'bg-[#1A1C23] border-[#2A2D3A] text-[#94A3B8] hover:text-white hover:bg-[#252833]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 bg-blue-600 text-white font-bold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {showMorePopover && (
            <div className="absolute right-0 mt-2 w-64 bg-[#1A1C23] border border-[#2A2D3A] rounded-xl shadow-2xl z-50 p-4 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#2A2D3A]">
                <span className="text-xs font-bold text-white">Advanced Slicers</span>
                <button 
                  onClick={() => setShowMorePopover(false)}
                  className="text-[#64748B] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Risk Level Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[#94A3B8] block">Readmission Risk Level</label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full bg-[#121316] border border-[#2A2D3A] text-white text-xs rounded-lg p-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="All">All Risk Levels</option>
                  <option value="High">High Risk Only</option>
                  <option value="Medium">Medium Risk Only</option>
                  <option value="Low">Low Risk Only</option>
                </select>
              </div>

              {/* Billing Payment Status Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-[#94A3B8] block">Payment Status</label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full bg-[#121316] border border-[#2A2D3A] text-white text-xs rounded-lg p-2 focus:outline-none focus:border-blue-500"
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
                  className="w-full flex items-center justify-center space-x-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Slicers ({activeFilterCount})</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
