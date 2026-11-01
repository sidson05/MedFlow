import React, { useState } from 'react';
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
  Area,
  CartesianGrid
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

  const [hoveredBar, setHoveredBar] = useState(null);

  const diagColors = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];

  // Custom Bar Chart Tooltip
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-panel border border-line rounded-xl p-3 shadow-md text-xs text-ink space-y-1.5">
          <p className="font-semibold text-ink border-b border-line pb-1">{label} 2024</p>
          {payload.map((entry) => (
            <div key={entry.dataKey} className="flex items-center justify-between space-x-4">
              <span className="flex items-center space-x-1.5 text-muted">
                <span className="w-2 h-2 rounded-xs" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-semibold text-ink">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom Area Chart Tooltip
  const CustomAreaTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-panel border border-line rounded-xl p-3 shadow-md text-xs text-ink space-y-1.5">
          <p className="font-semibold text-ink border-b border-line pb-1">{label} 2024</p>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-muted">Collected:</span>
            <span className="font-semibold text-ink">₹{payload[0].value}L</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 pb-8">
      {/* 1. TOP KPI ROW (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-4">
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

      {/* 2. MIDDLE ROW: BAR CHART & DONUT CHART (1.9fr / 1fr) */}
      <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1.9fr_1fr] gap-4">
        {/* Monthly Admissions by Department */}
        <div className="health-card p-[21px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-[15px] font-semibold text-ink tracking-tight">Monthly admissions by department</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Patient volume across core hospital units</p>
            </div>
            <span className="text-[11px] font-medium text-muted bg-panel2 border border-line px-2.5 py-0.5 rounded-full">
              Jan – Jun 2024
            </span>
          </div>

          <div className="h-64 w-full" aria-label="Monthly admissions by department chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={monthlyDeptData} 
                margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
                barGap={3}
                onMouseMove={(state) => {
                  if (state && state.activeTooltipIndex !== undefined) {
                    setHoveredBar(state.activeTooltipIndex);
                  }
                }}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--mut)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="var(--mut)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'var(--panel2)', opacity: 0.7 }} />
                <Bar 
                  dataKey="generalWard" 
                  name="General ward" 
                  fill="var(--c1)" 
                  radius={[4, 4, 0, 0]} 
                  opacity={hoveredBar === null ? 1 : 0.9}
                />
                <Bar 
                  dataKey="icu" 
                  name="ICU" 
                  fill="var(--c2)" 
                  radius={[4, 4, 0, 0]} 
                  opacity={hoveredBar === null ? 1 : 0.9}
                />
                <Bar 
                  dataKey="cardiology" 
                  name="Cardiology" 
                  fill="var(--c3)" 
                  radius={[4, 4, 0, 0]} 
                  opacity={hoveredBar === null ? 1 : 0.9}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Centred Legend below Hairline Divider */}
          <div className="flex items-center justify-center space-x-6 pt-3 mt-2 border-t border-line text-[12px] text-muted">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: 'var(--c1)' }} />
              <span className="font-medium text-ink">General ward</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: 'var(--c2)' }} />
              <span className="font-medium text-ink">ICU</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: 'var(--c3)' }} />
              <span className="font-medium text-ink">Cardiology</span>
            </div>
          </div>
        </div>

        {/* Admissions by Diagnosis (Donut Chart) */}
        <div className="health-card p-[21px] flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-ink tracking-tight">Admissions by diagnosis</h3>
            <p className="text-[12.5px] text-muted mt-0.5">Primary clinical condition breakdown</p>
          </div>

          <div className="h-56 w-full relative my-1" aria-label="Admissions by diagnosis donut chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diagnosisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={76}
                  outerRadius={92}
                  paddingAngle={3}
                  cornerRadius={4}
                  dataKey="value"
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell 
                      key={`diag-${index}`} 
                      fill={diagColors[index % diagColors.length]} 
                      stroke="var(--panel)" 
                      strokeWidth={2} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div className="bg-panel border border-line rounded-xl p-2.5 shadow-md text-xs text-ink">
                          <span className="font-semibold">{data.name}: </span>
                          <span className="text-muted">{data.value}%</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centre Total Number in Playfair */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-serif font-semibold text-[26px] text-ink leading-none">{kpiData.totalAdmissions.value}</span>
              <span className="text-[11.5px] text-muted font-medium mt-1">admissions</span>
            </div>
          </div>

          {/* 2-Column Legend with Percentages Right-Aligned in Bold */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-3 border-t border-line text-[12px]">
            {diagnosisData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center space-x-2 text-muted">
                  <span 
                    className="w-2.5 h-2.5 rounded-xs shrink-0" 
                    style={{ backgroundColor: diagColors[index % diagColors.length] }} 
                  />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="font-semibold text-ink ml-1">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: READMISSION RISK TABLE & REVENUE TREND (1.1fr / 1fr) */}
      <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1.1fr_1fr] gap-4">
        {/* Readmission Risk by Patient */}
        <div className="health-card p-[21px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[15px] font-semibold text-ink tracking-tight">Readmission risk by patient</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Top 5 high-risk patients this month</p>
            </div>
            <button 
              onClick={() => setActiveTab('readmissions')}
              className="text-[12.5px] font-medium text-sage hover:underline cursor-pointer transition-colors"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line text-muted text-[11.5px] uppercase tracking-wider">
                  <th className="pb-2.5 font-medium">Patient</th>
                  <th className="pb-2.5 font-medium">Diagnosis</th>
                  <th className="pb-2.5 font-medium">Score</th>
                  <th className="pb-2.5 font-medium text-right">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {topRiskPatients.map((patient) => {
                  const riskColor = patient.risk?.toLowerCase() === 'high' 
                    ? 'var(--risk-high)' 
                    : patient.risk?.toLowerCase() === 'medium' 
                    ? 'var(--risk-med)' 
                    : 'var(--risk-low)';
                  const scoreWidth = patient.daysOut 
                    ? Math.max(15, Math.min(100, Math.round(((30 - patient.daysOut) / 30) * 100))) 
                    : 70;

                  return (
                    <tr 
                      key={patient.id} 
                      className="hover:bg-panel2 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setActiveTab('patients');
                      }}
                    >
                      <td className="py-2.5">
                        <div className="font-semibold text-ink text-[13px] leading-tight">{patient.patientName}</div>
                        <div className="text-[11px] text-muted leading-tight mt-0.5">{patient.dept}</div>
                      </td>
                      <td className="py-2.5 text-muted font-medium">{patient.diagnosis}</td>
                      <td className="py-2.5">
                        <div className="flex items-center space-x-2">
                          <div className="w-[56px] h-2 bg-panel2 rounded-full overflow-hidden border border-line">
                            <div 
                              className="h-full rounded-full transition-all" 
                              style={{ width: `${scoreWidth}%`, backgroundColor: riskColor }} 
                            />
                          </div>
                          <span className="text-[11.5px] text-muted font-mono">{patient.daysOut ?? '--'}d</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-right">
                        <RiskBadge risk={patient.risk} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Trend — Billing Area Chart */}
        <div className="health-card p-[21px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-[15px] font-semibold text-ink tracking-tight">Revenue trend, billing</h3>
              <p className="text-[12.5px] text-muted mt-0.5">Monthly billing collection trajectory</p>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-panel2 border border-line text-muted font-medium">
              ₹ in lakhs
            </span>
          </div>

          {/* Revenue Figures in Playfair */}
          <div className="flex items-center space-x-6 my-2 pt-1">
            <div>
              <span className="font-serif font-semibold text-[22px] text-ink leading-tight">₹{revenueSummary.totalCollected}</span>
              <span className="text-[12px] text-muted ml-1.5 font-medium">Total collected</span>
            </div>
            <div className="w-px h-6 bg-line" />
            <div>
              <span className="font-serif font-semibold text-[22px] text-bad leading-tight">₹{revenueSummary.totalPending}</span>
              <span className="text-[12px] text-muted ml-1.5 font-medium">Pending dues</span>
            </div>
          </div>

          <div className="h-44 w-full my-1" aria-label="Revenue trajectory area chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueLightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--acc)" stopOpacity={0.28}/>
                    <stop offset="100%" stopColor="var(--acc)" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--mut)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="var(--mut)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="collected" 
                  stroke="var(--acc)" 
                  strokeWidth={2.2} 
                  fillOpacity={1} 
                  fill="url(#revenueLightGradient)"
                  dot={{ fill: 'var(--panel)', stroke: 'var(--acc)', strokeWidth: 2, r: 3.5 }}
                  activeDot={{ fill: 'var(--acc)', stroke: 'var(--panel)', strokeWidth: 2, r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
