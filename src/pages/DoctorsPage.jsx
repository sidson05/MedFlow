import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Star, UserCheck, Clock } from 'lucide-react';

export default function DoctorsPage() {
  const { doctors } = useDashboard();

  return (
    <div className="space-y-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doc) => (
          <div key={doc.id} className="health-card p-[21px] flex flex-col justify-between hover:border-accent/35 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-mono font-semibold text-accent bg-accentSoft px-2.5 py-0.5 rounded-full">
                  {doc.id}
                </span>
                <span className="flex items-center gap-1 text-[11.5px] font-semibold text-ink bg-panel2 border border-line px-2.5 py-0.5 rounded-full">
                  <Star className="w-3 h-3 text-c3 fill-c3" /> {doc.rating}
                </span>
              </div>
              <h3 className="text-[18px] font-semibold text-ink tracking-tight">{doc.name}</h3>
              <p className="text-[12.5px] text-muted mt-1">{doc.specialization}</p>
              <span className="inline-block mt-2.5 text-xs font-medium text-accent bg-accentSoft px-2.5 py-0.5 rounded-full">
                {doc.dept}
              </span>
            </div>

            <div className="my-5 pt-4 border-t border-line space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-muted" /> Active patient load
                </span>
                <span className="text-ink font-semibold text-sm">{doc.patientLoad} patients</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-muted" /> Avg recovery time
                </span>
                <span className="text-good font-semibold text-sm">{doc.avgRecoveryDays} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
