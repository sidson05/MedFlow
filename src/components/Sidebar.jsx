import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  Building2, 
  RotateCcw, 
  Stethoscope, 
  Receipt, 
  Settings,
  Terminal,
  Activity
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useDashboard();

  const mainNav = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
  ];

  const analyticsNav = [
    { id: 'readmissions', label: 'Readmissions', icon: RotateCcw },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'billing', label: 'Billing', icon: Receipt },
  ];

  const toolsNav = [
    { id: 'sqlStudio', label: 'SQL Studio', icon: Terminal },
    { id: 'config', label: 'Config', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#121316] border-r border-[#2A2D3A] flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#2A2D3A]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/30">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg tracking-tight leading-none">MedFlow</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-medium">Analytics Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        {/* MAIN GROUP */}
        <div>
          <h2 className="text-xs font-semibold text-[#64748B] tracking-wider uppercase px-3 mb-2">
            MAIN
          </h2>
          <nav className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 font-semibold border-l-4 border-blue-500 rounded-l-none'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1A1C23]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ANALYTICS GROUP */}
        <div>
          <h2 className="text-xs font-semibold text-[#64748B] tracking-wider uppercase px-3 mb-2">
            ANALYTICS
          </h2>
          <nav className="space-y-1">
            {analyticsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 font-semibold border-l-4 border-blue-500 rounded-l-none'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1A1C23]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SETTINGS / TOOLS GROUP */}
        <div>
          <h2 className="text-xs font-semibold text-[#64748B] tracking-wider uppercase px-3 mb-2">
            SETTINGS & TOOLS
          </h2>
          <nav className="space-y-1">
            {toolsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 font-semibold border-l-4 border-blue-500 rounded-l-none'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1A1C23]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-[#2A2D3A] bg-[#16181F]">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <p className="text-white font-medium">SQLite Engine Live</p>
            <p className="text-[#64748B]">v2.4 • Hospital DB Sync</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
