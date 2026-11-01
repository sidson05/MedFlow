import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { BedDouble, UserCheck, Clock } from 'lucide-react';

export default function DepartmentsPage() {
  const { departments } = useDashboard();

  return (
    <div className="space-y-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => {
          const occupancyRate = Math.round((dept.occupiedBeds / dept.totalBeds) * 100);
          return (
            <div key={dept.id} className="health-card p-[21px] flex flex-col justify-between hover:border-accent/35 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-mono font-semibold text-accent bg-accentSoft px-2.5 py-0.5 rounded-full">
                    {dept.id}
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-panel2 border border-line text-muted">
                    {dept.annualBudget} budget
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-ink tracking-tight">{dept.name}</h3>
                <p className="text-[12.5px] text-muted mt-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-muted" /> Head: {dept.headDoctor}
                </p>
              </div>

              <div className="my-5 space-y-4">
                {/* Bed Capacity Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted flex items-center gap-1.5 font-medium">
                      <BedDouble className="w-3.5 h-3.5 text-muted" /> Bed occupancy
                    </span>
                    <span className="font-semibold text-ink">{dept.occupiedBeds} / {dept.totalBeds} ({occupancyRate}%)</span>
                  </div>
                  <div className="w-full bg-panel2 rounded-full h-2 overflow-hidden border border-line">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${occupancyRate}%`,
                        backgroundColor: occupancyRate >= 85 ? 'var(--bad)' : occupancyRate >= 75 ? 'var(--risk-med)' : 'var(--good)'
                      }}
                    />
                  </div>
                </div>

                {/* Avg Length of Stay (LOS) */}
                <div className="flex items-center justify-between pt-3 border-t border-line text-xs">
                  <span className="text-muted flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Avg length of stay
                  </span>
                  <span className="text-ink font-semibold text-sm">{dept.avgLos} days</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
