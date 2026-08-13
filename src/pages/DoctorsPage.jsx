import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Stethoscope, Star, UserCheck, Clock } from 'lucide-react';

export default function DoctorsPage() {
  const { doctors } = useDashboard();

  return (
    <div className="space-y-6 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="health-card p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-blue-400">{doc.id}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  <Star className="w-3 h-3 fill-amber-400" /> {doc.rating}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{doc.name}</h3>
              <p className="text-xs text-[#94A3B8] mt-1">{doc.specialization}</p>
              <span className="inline-block mt-2 text-xs font-medium text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md">
                {doc.dept}
              </span>
            </div>

            <div className="my-5 pt-4 border-t border-[#2A2D3A] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> Active Patient Load
                </span>
                <span className="text-white font-bold text-sm">{doc.patientLoad} patients</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Avg Patient Recovery Time
                </span>
                <span className="text-emerald-400 font-bold text-sm">{doc.avgRecoveryDays} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
