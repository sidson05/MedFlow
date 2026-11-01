import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function BillingPage() {
  const { revenueData, revenueSummary } = useDashboard();

  return (
    <div className="space-y-4 pb-8">
      {/* Top Financial KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="health-card p-[21px] flex items-center justify-between">
          <div>
            <span className="text-[12.5px] text-muted font-medium block mb-1">Total revenue collected</span>
            <h2 className="font-serif font-semibold text-[32px] text-ink leading-tight">₹{revenueSummary.totalCollected}</h2>
            <span className="text-[12px] text-good font-medium mt-1 inline-block">↑ 9.4% YoY Growth</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-panel2 border border-line flex items-center justify-center text-accent shadow-2xs">
            <Wallet className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>

        <div className="health-card p-[21px] flex items-center justify-between">
          <div>
            <span className="text-[12.5px] text-muted font-medium block mb-1">Pending out-of-pocket dues</span>
            <h2 className="font-serif font-semibold text-[32px] text-bad leading-tight">₹{revenueSummary.totalPending}</h2>
            <span className="text-[12px] text-bad font-medium mt-1 inline-block">11.7% of total billing</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-panel2 border border-line flex items-center justify-center text-bad shadow-2xs">
            <AlertCircle className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>

        <div className="health-card p-[21px] flex items-center justify-between">
          <div>
            <span className="text-[12.5px] text-muted font-medium block mb-1">Insurance settlement rate</span>
            <h2 className="font-serif font-semibold text-[32px] text-ink leading-tight">88.3%</h2>
            <span className="text-[12px] text-muted font-medium mt-1 inline-block">Avg 14-day turnaround</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-panel2 border border-line flex items-center justify-center text-good shadow-2xs">
            <CheckCircle2 className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>
      </div>

      {/* Revenue Trajectory Chart */}
      <div className="health-card p-[21px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-semibold text-ink tracking-tight">Monthly billing & collections breakdown</h3>
            <p className="text-[12.5px] text-muted mt-0.5">Jan – Jun 2024 (Values in ₹ Lakhs)</p>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-panel2 border border-line text-muted font-medium">
            ₹ in lakhs
          </span>
        </div>

        <div className="h-64 w-full" aria-label="Monthly billing and collections chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="billingCollectedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--acc)" stopOpacity={0.28}/>
                  <stop offset="100%" stopColor="var(--acc)" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="billingPendingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--bad)" stopOpacity={0.25}/>
                  <stop offset="100%" stopColor="var(--bad)" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--mut)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--mut)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-panel border border-line rounded-xl p-3 shadow-md text-xs text-ink space-y-1">
                        <p className="font-semibold text-ink border-b border-line pb-1">{label} 2024</p>
                        {payload.map((entry) => (
                          <div key={entry.dataKey} className="flex items-center justify-between space-x-4">
                            <span className="text-muted">{entry.name}:</span>
                            <span className="font-semibold text-ink">₹{entry.value}L</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="collected" 
                name="Collected" 
                stroke="var(--acc)" 
                strokeWidth={2.2} 
                fillOpacity={1} 
                fill="url(#billingCollectedGrad)" 
                dot={{ fill: 'var(--panel)', stroke: 'var(--acc)', strokeWidth: 2, r: 3.5 }}
              />
              <Area 
                type="monotone" 
                dataKey="pending" 
                name="Pending Dues" 
                stroke="var(--bad)" 
                strokeWidth={1.8} 
                fillOpacity={1} 
                fill="url(#billingPendingGrad)" 
                dot={{ fill: 'var(--panel)', stroke: 'var(--bad)', strokeWidth: 2, r: 3.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 pt-3 mt-2 border-t border-line text-[12px] text-muted">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: 'var(--acc)' }} />
            <span className="font-medium text-ink">Collected (₹48.2L)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: 'var(--bad)' }} />
            <span className="font-medium text-ink">Pending (₹6.4L)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
