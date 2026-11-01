import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function KpiCard({ title, value, change, isPositive = true, subtext = "vs last period" }) {
  const isUp = change.startsWith('+') || change.includes('↑');

  return (
    <div className="health-card p-[21px] flex flex-col justify-between hover:border-accent/35 transition-all">
      <span className="text-[12.5px] font-medium text-muted tracking-wide">{title}</span>
      
      <div className="my-2">
        <h2 className="font-serif font-semibold text-[32px] text-ink leading-tight tracking-tight">{value}</h2>
      </div>

      <div className="flex items-center text-[12px]">
        <span className={`inline-flex items-center font-medium ${isPositive ? 'text-good' : 'text-bad'}`}>
          {isUp ? (
            <ArrowUp className="w-3 h-3 mr-0.5" strokeWidth={2} />
          ) : (
            <ArrowDown className="w-3 h-3 mr-0.5" strokeWidth={2} />
          )}
          {change}
        </span>
        <span className="text-muted ml-1.5">{subtext}</span>
      </div>
    </div>
  );
}
