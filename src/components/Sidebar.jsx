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
    <aside className="hidden min-[820px]:flex flex-col w-[232px] min-w-[232px] bg-panel border-r border-line h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-line">
        <div className="flex items-center space-x-3">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-forest flex items-center justify-center text-forestTx shadow-xs">
            <Activity className="w-4 h-4 text-forestTx" strokeWidth={2} />
          </div>
          <div>
            <h1 className="font-semibold text-ink text-[16px] tracking-tight leading-tight">MedFlow</h1>
            <p className="text-[12px] text-muted leading-tight mt-0.5">Analytics Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {/* MAIN GROUP */}
        <div>
          <h2 className="text-[10.5px] uppercase font-semibold text-muted tracking-wider px-2.5 mb-1.5">
            MAIN
          </h2>
          <nav className="space-y-0.5">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-[10px] text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? 'bg-accentSoft text-accent font-semibold'
                      : 'text-ink hover:bg-panel2'
                  }`}
                >
                  <Icon className={`w-[17px] h-[17px] ${isActive ? 'text-accent' : 'text-muted'}`} strokeWidth={1.6} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ANALYTICS GROUP */}
        <div>
          <h2 className="text-[10.5px] uppercase font-semibold text-muted tracking-wider px-2.5 mb-1.5">
            ANALYTICS
          </h2>
          <nav className="space-y-0.5">
            {analyticsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-[10px] text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? 'bg-accentSoft text-accent font-semibold'
                      : 'text-ink hover:bg-panel2'
                  }`}
                >
                  <Icon className={`w-[17px] h-[17px] ${isActive ? 'text-accent' : 'text-muted'}`} strokeWidth={1.6} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* TOOLS GROUP */}
        <div>
          <h2 className="text-[10.5px] uppercase font-semibold text-muted tracking-wider px-2.5 mb-1.5">
            TOOLS
          </h2>
          <nav className="space-y-0.5">
            {toolsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-[10px] text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? 'bg-accentSoft text-accent font-semibold'
                      : 'text-ink hover:bg-panel2'
                  }`}
                >
                  <Icon className={`w-[17px] h-[17px] ${isActive ? 'text-accent' : 'text-muted'}`} strokeWidth={1.6} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-line bg-panel">
        <div className="flex items-center space-x-2.5">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="absolute w-3.5 h-3.5 rounded-full bg-good/25 animate-ping" />
            <span className="relative w-2 h-2 rounded-full bg-good shadow-[0_0_8px_var(--good)]" />
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-ink leading-tight">SQLite engine live</p>
            <p className="text-[11px] text-muted leading-tight mt-0.5">v2.4 · Hospital DB sync</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
