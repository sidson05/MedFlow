import React from 'react';

export default function RiskBadge({ risk }) {
  const getStyle = () => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return {
          color: 'var(--risk-high)',
          backgroundColor: 'color-mix(in srgb, var(--risk-high) 13%, transparent)'
        };
      case 'medium':
        return {
          color: 'var(--risk-med)',
          backgroundColor: 'color-mix(in srgb, var(--risk-med) 13%, transparent)'
        };
      case 'low':
        return {
          color: 'var(--risk-low)',
          backgroundColor: 'color-mix(in srgb, var(--risk-low) 13%, transparent)'
        };
      default:
        return {
          color: 'var(--mut)',
          backgroundColor: 'color-mix(in srgb, var(--mut) 13%, transparent)'
        };
    }
  };

  return (
    <span 
      style={getStyle()}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold tracking-wide"
    >
      {risk}
    </span>
  );
}
