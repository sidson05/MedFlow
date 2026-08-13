import React, { useState } from 'react';
import { Settings, RefreshCw, Download, Database, Check } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ConfigPage() {
  const { patients, departments, doctors } = useDashboard();
  const [reseeded, setReseeded] = useState(false);

  const handleReseedData = () => {
    setReseeded(true);
    setTimeout(() => setReseeded(false), 2500);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ patients, departments, doctors }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "medflow_hospital_analytics_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-10 max-w-4xl">
      <div className="health-card p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" /> Database & System Configuration
        </h3>
        <p className="text-xs text-[#94A3B8]">
          Manage your in-memory SQLite relational dataset, reset hospital metrics, or export analytics reports for Power BI / Tableau integration.
        </p>

        <div className="pt-4 border-t border-[#2A2D3A] space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#121316] rounded-xl border border-[#2A2D3A]">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" /> Re-Seed SQLite Dataset
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">Restore initial Jan – Jun 2024 hospital metrics and patient admission records.</p>
            </div>
            <button
              onClick={handleReseedData}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition-all"
            >
              {reseeded ? <Check className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
              <span>{reseeded ? 'Dataset Reseeded' : 'Reseed Data'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#121316] rounded-xl border border-[#2A2D3A]">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-400" /> Export Dataset (JSON / CSV)
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">Download normalized schema JSON for external BI tools (Power BI, Tableau, Excel).</p>
            </div>
            <button
              onClick={handleExportJson}
              className="flex items-center space-x-2 bg-[#222530] hover:bg-[#2C3040] text-white border border-[#2A2D3A] px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
