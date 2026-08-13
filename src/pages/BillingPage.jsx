import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Receipt, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function BillingPage() {
  const { revenueData, revenueSummary } = useDashboard();

  return (
    <div className="space-y-6 pb-10">
      {/* Top Financial KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="health-card p-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#94A3B8] font-medium block mb-1">Total Revenue Collected</span>
            <h2 className="text-3xl font-extrabold text-white">₹{revenueSummary.totalCollected}</h2>
            <span className="text-xs text-emerald-400 font-semibold mt-1 inline-block">↑ 9.4% YoY Growth</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="health-card p-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#94A3B8] font-medium block mb-1">Pending Out-of-Pocket Dues</span>
            <h2 className="text-3xl font-extrabold text-rose-400">₹{revenueSummary.totalPending}</h2>
            <span className="text-xs text-rose-400 font-semibold mt-1 inline-block">11.7% of Total Billing</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="health-card p-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#94A3B8] font-medium block mb-1">Insurance Settlement Rate</span>
            <h2 className="text-3xl font-extrabold text-blue-400">88.3%</h2>
            <span className="text-xs text-blue-400 font-semibold mt-1 inline-block">Avg 14-day turnaround</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Revenue Trajectory Chart */}
      <div className="health-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Monthly Billing & Collections Breakdown</h3>
            <p className="text-xs text-[#94A3B8]">Jan – Jun 2024 (Values in ₹ Lakhs)</p>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1C23', borderColor: '#2A2D3A', borderRadius: '8px', color: '#FFF' }} />
              <Area type="monotone" dataKey="collected" name="Collected Revenue" stroke="#10B981" strokeWidth={2.5} fill="url(#colCollected)" />
              <Area type="monotone" dataKey="pending" name="Pending Dues" stroke="#F43F5E" strokeWidth={2.5} fill="url(#colPending)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
