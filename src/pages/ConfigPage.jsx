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
    <div className="space-y-4 pb-8 max-w-4xl">
      <div className="health-card p-[21px] space-y-4">
        <h3 className="text-[16px] font-semibold text-ink flex items-center gap-2">
          <Settings className="w-4 h-4 text-accent" /> Database & system configuration
        </h3>
        <p className="text-[12.5px] text-muted leading-relaxed">
          Manage your in-memory SQLite relational dataset, reset hospital metrics, or export analytics reports for Power BI / Tableau integration.
        </p>

        <div className="pt-4 border-t border-line space-y-3.5">
          <div className="flex items-center justify-between p-4 bg-panel2 rounded-2xl border border-line">
            <div>
              <h4 className="text-[14px] font-semibold text-ink flex items-center gap-2">
                <Database className="w-4 h-4 text-accent" /> Re-seed SQLite dataset
              </h4>
              <p className="text-[12px] text-muted mt-0.5">Restore initial Jan – Jun 2024 hospital metrics and patient admission records.</p>
            </div>
            <button
              onClick={handleReseedData}
              className="flex items-center space-x-1.5 bg-forest hover:opacity-95 text-forestTx px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-opacity cursor-pointer"
            >
              {reseeded ? <Check className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
              <span>{reseeded ? 'Dataset reseeded' : 'Reseed data'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-panel2 rounded-2xl border border-line">
            <div>
              <h4 className="text-[14px] font-semibold text-ink flex items-center gap-2">
                <Download className="w-4 h-4 text-accent" /> Export dataset (JSON / CSV)
              </h4>
              <p className="text-[12px] text-muted mt-0.5">Download normalized schema JSON for external BI tools (Power BI, Tableau, Excel).</p>
            </div>
            <button
              onClick={handleExportJson}
              className="flex items-center space-x-1.5 bg-panel hover:bg-line border border-line text-ink px-4 py-2 rounded-full text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
