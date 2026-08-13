import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function KpiCard({ title, value, change, isPositive = true, subtext = "vs last period" }) {
  // Determine color based on indicator (green for good, red for bad)
  const isUp = change.startsWith('+') || change.includes('↑');

  return (
    <div className="health-card p-5 flex flex-col justify-between hover:border-[#3B82F6]/40 transition-all duration-200">
      <span className="text-xs font-medium text-[#94A3B8] tracking-wide">{title}</span>
      
      <div className="mt-3 mb-2">
        <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none">{value}</h2>
      </div>

      <div className="flex items-center space-x-1.5 mt-1 text-xs">
        <span className={`inline-flex items-center font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isUp ? (
            <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
          )}
          {change}
        </span>
        <span className="text-[#64748B] font-normal">{subtext}</span>
      </div>
    </div>
  );
}
