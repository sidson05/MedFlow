import React from 'react';

export default function RiskBadge({ risk }) {
  const getColors = () => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
      case 'medium':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
      case 'low':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border border-slate-500/30';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getColors()}`}>
      {risk}
    </span>
  );
}
