import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import RiskBadge from '../components/RiskBadge';
import { AlertTriangle, Info } from 'lucide-react';

export default function ReadmissionsPage() {
  const { topRiskPatients, kpiData, setActiveTab } = useDashboard();

  return (
    <div className="space-y-4 pb-8">
      {/* Readmissions Banner & Summary */}
      <div className="health-card p-[21px] bg-accentSoft/30 border border-line">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-bad font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Hospital Readmission Reduction Program (HRRP) Analytics</span>
            </div>
            <h2 className="text-xl font-semibold text-ink">30-Day Readmission Analysis & Risk Scoring</h2>
            <p className="text-[12.5px] text-muted max-w-2xl leading-relaxed">
              Patients returning within 30 days of discharge indicate potential post-care gaps. This portal tracks patient window partitions using SQL LAG() algorithms to isolate high-risk diagnoses.
            </p>
          </div>
          <div className="bg-panel border border-line px-5 py-3 rounded-2xl text-center shadow-2xs shrink-0">
            <span className="text-[11.5px] text-muted block font-medium">30-day rate</span>
            <span className="font-serif font-semibold text-2xl text-ink leading-tight">{kpiData.readmissionRate.value}</span>
            <span className="text-[11.5px] text-good block font-medium mt-0.5">↓ 1.1% vs target</span>
          </div>
        </div>
      </div>

      {/* Risk Factors & SQL Algorithm Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="health-card p-[21px] space-y-4">
          <h3 className="text-[15px] font-semibold text-ink flex items-center gap-2">
            <Info className="w-4 h-4 text-accent" /> Key risk drivers for 30-day returns
          </h3>
          <ul className="space-y-3 text-[12.5px] text-muted">
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-bad mt-1.5 shrink-0" />
              <span><strong className="text-ink">Heart Failure (Cardiac):</strong> Highest 30-day readmission risk (28.4% return rate). Requires mandatory 48hr post-discharge telehealth check.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-riskMed mt-1.5 shrink-0" />
              <span><strong className="text-ink">Pneumonia & COPD:</strong> Secondary cohort driven by medication non-adherence and oxygen therapy logistics.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-good mt-1.5 shrink-0" />
              <span><strong className="text-ink">Surgical Trauma:</strong> Lowest risk when surgical site post-op protocols are completed prior to day 5 discharge.</span>
            </li>
          </ul>
        </div>

        <div className="health-card p-[21px] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-ink">SQL window function logic</h3>
              <button 
                onClick={() => setActiveTab('sqlStudio')}
                className="text-[12.5px] text-sage font-medium hover:underline cursor-pointer"
              >
                Open in SQL Studio →
              </button>
            </div>
            <p className="text-[12.5px] text-muted mt-2 leading-relaxed">
              Partitioning patient records chronologically by admission date allows exact computation of days elapsed between previous discharge and subsequent admission.
            </p>
          </div>
          <div className="bg-panel2 p-3.5 rounded-xl border border-line font-mono text-[11.5px] text-ink overflow-x-auto">
            <code>
              LAG(discharge_date) OVER (<br/>
              &nbsp;&nbsp;PARTITION BY patient_id<br/>
              &nbsp;&nbsp;ORDER BY admission_date<br/>
              ) AS prev_discharge_date
            </code>
          </div>
        </div>
      </div>

      {/* Cohort Roster Table */}
      <div className="health-card p-[21px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-semibold text-ink">Readmission cohort roster</h3>
            <p className="text-[12.5px] text-muted mt-0.5">Active patients flagged for proactive care management</p>
          </div>
          <span className="text-[11.5px] px-2.5 py-0.5 rounded-full bg-panel2 border border-line text-muted">
            {topRiskPatients.length} Active cases
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-line text-muted text-[11.5px] uppercase tracking-wider">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Diagnosis</th>
                <th className="pb-3 font-medium">Physician</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Interval</th>
                <th className="pb-3 font-medium text-right">Risk status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {topRiskPatients.map((p) => (
                <tr key={p.id} className="hover:bg-panel2 transition-colors">
                  <td className="py-3 font-semibold text-ink text-[13px]">{p.patientName}</td>
                  <td className="py-3 text-ink font-medium">{p.diagnosis}</td>
                  <td className="py-3 text-muted">{p.doctor}</td>
                  <td className="py-3 text-muted">{p.dept}</td>
                  <td className="py-3 text-muted font-mono">{p.daysOut} days out</td>
                  <td className="py-3 text-right">
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
