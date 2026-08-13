import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Building2, BedDouble, UserCheck, Clock } from 'lucide-react';

export default function DepartmentsPage() {
  const { departments } = useDashboard();

  return (
    <div className="space-y-6 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const occupancyRate = Math.round((dept.occupiedBeds / dept.totalBeds) * 100);
          return (
            <div key={dept.id} className="health-card p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold text-blue-400">{dept.id}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                    {dept.annualBudget} Budget
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{dept.name}</h3>
                <p className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#64748B]" /> Head: {dept.headDoctor}
                </p>
              </div>

              <div className="my-5 space-y-4">
                {/* Bed Capacity Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#94A3B8] flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-[#64748B]" /> Bed Occupancy
                    </span>
                    <span className="font-bold text-white">{dept.occupiedBeds} / {dept.totalBeds} ({occupancyRate}%)</span>
                  </div>
                  <div className="w-full bg-[#121316] rounded-full h-2 overflow-hidden border border-[#2A2D3A]">
                    <div 
                      className={`h-full rounded-full ${
                        occupancyRate >= 85 ? 'bg-rose-500' : occupancyRate >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>

                {/* Avg Length of Stay (LOS) */}
                <div className="flex items-center justify-between pt-3 border-t border-[#2A2D3A] text-xs">
                  <span className="text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Avg Length of Stay
                  </span>
                  <span className="text-white font-extrabold text-sm">{dept.avgLos} days</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
