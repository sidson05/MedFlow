import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import RiskBadge from '../components/RiskBadge';
import { RotateCcw, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ReadmissionsPage() {
  const { topRiskPatients, kpiData, setActiveTab } = useDashboard();

  return (
    <div className="space-y-6 pb-10">
      {/* Readmissions Banner & Summary */}
      <div className="health-card p-6 bg-gradient-to-r from-[#1A1C23] via-[#1E2330] to-[#1A1C23]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Hospital Readmission Reduction Program (HRRP) Analytics</span>
            </div>
            <h2 className="text-xl font-bold text-white">30-Day Readmission Analysis & Risk Scoring</h2>
            <p className="text-xs text-[#94A3B8] max-w-2xl">
              Patients returning within 30 days of discharge indicate potential post-care gaps. This portal tracks patient window partitions using SQL LAG() algorithms to isolate high-risk diagnoses.
            </p>
          </div>
          <div className="bg-[#121316] border border-[#2A2D3A] px-5 py-3 rounded-xl text-center">
            <span className="text-xs text-[#64748B] block font-medium">30-Day Rate</span>
            <span className="text-2xl font-extrabold text-white">{kpiData.readmissionRate.value}</span>
            <span className="text-xs text-emerald-400 block font-medium mt-0.5">↓ 1.1% vs target</span>
          </div>
        </div>
      </div>

      {/* Risk Factors & SQL Algorithm Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="health-card p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400" /> Key Risk Drivers for 30-Day Returns
          </h3>
          <ul className="space-y-3 text-xs text-[#94A3B8]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
              <span><strong>Heart Failure (Cardiac):</strong> Highest 30-day readmission risk (28.4% return rate). Requires mandatory 48hr post-discharge telehealth check.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              <span><strong>Pneumonia & COPD:</strong> Secondary cohort driven by medication non-adherence and oxygen therapy logistics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <span><strong>Surgical Trauma:</strong> Lowest risk when surgical site post-op protocols are completed prior to day 5 discharge.</span>
            </li>
          </ul>
        </div>

        <div className="health-card p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span>SQL Window Function Logic</span>
            <button 
              onClick={() => setActiveTab('sqlStudio')}
              className="text-xs text-blue-400 font-semibold hover:underline"
            >
              Test in SQL Studio →
            </button>
          </h3>
          <div className="bg-[#121316] border border-[#2A2D3A] p-4 rounded-lg font-mono text-xs text-blue-300 overflow-x-auto">
            {`LAG(discharge_date) OVER (
  PARTITION BY patient_id 
  ORDER BY admission_date
) AS prev_discharge_date`}
          </div>
          <p className="text-xs text-[#94A3B8]">
            Calculates exact days elapsed: <code className="text-white">JULIANDAY(admission_date) - JULIANDAY(prev_discharge_date)</code>.
          </p>
        </div>
      </div>

      {/* Readmission Risk Table */}
      <div className="health-card p-6">
        <h3 className="text-base font-bold text-white mb-4">Current High Risk Readmission Patient Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2A2D3A] text-[#64748B]">
                <th className="pb-3 font-semibold">Patient ID</th>
                <th className="pb-3 font-semibold">Patient Name</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Diagnosis</th>
                <th className="pb-3 font-semibold">Days Elapsed</th>
                <th className="pb-3 font-semibold">Attending Doctor</th>
                <th className="pb-3 font-semibold text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2D3A]/60">
              {topRiskPatients.map((p) => (
                <tr key={p.id} className="hover:bg-[#222530] transition-colors">
                  <td className="py-3.5 font-mono font-medium text-white">{p.id}</td>
                  <td className="py-3.5 font-semibold text-white">{p.patientName}</td>
                  <td className="py-3.5 text-[#94A3B8]">{p.dept}</td>
                  <td className="py-3.5 text-white">{p.diagnosis}</td>
                  <td className="py-3.5 text-rose-400 font-bold">{p.daysOut} days out</td>
                  <td className="py-3.5 text-[#94A3B8]">{p.doctor}</td>
                  <td className="py-3.5 text-right">
                    <RiskBadge risk={p.risk} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
