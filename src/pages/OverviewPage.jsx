import React from 'react';
import KpiCard from '../components/KpiCard';
import RiskBadge from '../components/RiskBadge';
import { useDashboard } from '../context/DashboardContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';

export default function OverviewPage() {
  const { 
    kpiData, 
    monthlyDeptData, 
    diagnosisData, 
    topRiskPatients, 
    revenueData, 
    revenueSummary,
    setActiveTab,
    setSelectedPatient 
  } = useDashboard();

  return (
    <div className="space-y-6 pb-10">
      {/* 1. TOP KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard 
          title="Total admissions" 
          value={kpiData.totalAdmissions.value} 
          change={kpiData.totalAdmissions.change} 
          isPositive={true}
        />
        <KpiCard 
          title="Avg length of stay" 
          value={kpiData.avgLengthOfStay.value} 
          change={kpiData.avgLengthOfStay.change} 
          isPositive={true}
        />
        <KpiCard 
          title="Bed occupancy" 
          value={kpiData.bedOccupancy.value} 
          change={kpiData.bedOccupancy.change} 
          isPositive={true}
        />
        <KpiCard 
          title="30-day readmissions" 
          value={kpiData.readmissionRate.value} 
          change={kpiData.readmissionRate.change} 
          isPositive={true}
        />
      </div>

      {/* 2. MIDDLE ROW: BAR CHART & DONUT CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Admissions by Department (2/3 width) */}
        <div className="lg:col-span-2 health-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Monthly admissions by department</h3>
              <p className="text-xs text-[#94A3B8] mt-0.5">Patient volume across core hospital units</p>
            </div>
            <span className="text-xs font-semibold text-[#64748B] bg-[#222530] px-2.5 py-1 rounded-md">
              Jan – Jun 2024
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDeptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1C23', borderColor: '#2A2D3A', borderRadius: '8px', color: '#FFF' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="generalWard" name="General ward" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="icu" name="ICU" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cardiology" name="Cardiology" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Chart Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4 pt-3 border-t border-[#2A2D3A]">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-[#3B82F6]" />
              <span className="text-xs text-[#94A3B8] font-medium">General ward</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
              <span className="text-xs text-[#94A3B8] font-medium">ICU</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
              <span className="text-xs text-[#94A3B8] font-medium">Cardiology</span>
            </div>
          </div>
        </div>

        {/* Admissions by Diagnosis (1/3 width Donut) */}
        <div className="health-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Admissions by diagnosis</h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">Primary clinical condition breakdown</p>
          </div>

          <div className="h-56 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diagnosisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#1A1C23" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1C23', borderColor: '#2A2D3A', borderRadius: '8px', color: '#FFF' }}
                  formatter={(val) => [`${val}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2A2D3A]">
            {diagnosisData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#94A3B8] font-medium">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: READMISSION RISK TABLE & REVENUE TREND */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readmission Risk by Patient (Top 5 this month) */}
        <div className="health-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Readmission risk by patient</h3>
              <p className="text-xs text-[#94A3B8] mt-0.5">Top 5 high-risk patients this month</p>
            </div>
            <button 
              onClick={() => setActiveTab('readmissions')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2A2D3A] text-[#64748B]">
                  <th className="pb-3 font-semibold">Patient</th>
                  <th className="pb-3 font-semibold">Diagnosis</th>
                  <th className="pb-3 font-semibold">Days out</th>
                  <th className="pb-3 font-semibold text-right">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2D3A]/60">
                {topRiskPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-[#222530] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setActiveTab('patients');
                    }}
                  >
                    <td className="py-3 font-mono font-medium text-white">{patient.id}</td>
                    <td className="py-3 text-[#94A3B8]">{patient.diagnosis}</td>
                    <td className="py-3 text-[#94A3B8]">{patient.daysOut}</td>
                    <td className="py-3 text-right">
                      <RiskBadge risk={patient.risk} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Trend — Billing Area Chart */}
        <div className="health-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Revenue trend — billing</h3>
              <p className="text-xs text-[#94A3B8] mt-0.5">Monthly billing collection trajectory</p>
            </div>
            <span className="text-xs font-semibold text-[#64748B]">
              ₹ in lakhs
            </span>
          </div>

          <div className="h-48 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1C23', borderColor: '#2A2D3A', borderRadius: '8px', color: '#FFF' }}
                  formatter={(val) => [`₹${val} Lakhs`, 'Revenue']}
                />
                <Area type="monotone" dataKey="collected" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Bottom Summary Callouts */}
          <div className="flex items-center justify-between pt-3 border-t border-[#2A2D3A] text-xs">
            <div>
              <span className="text-[#94A3B8] font-normal">Total collected </span>
              <span className="text-white font-extrabold text-sm ml-1">₹{revenueSummary.totalCollected}</span>
            </div>
            <div>
              <span className="text-[#94A3B8] font-normal">Pending </span>
              <span className="text-rose-400 font-extrabold text-sm ml-1">₹{revenueSummary.totalPending}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
