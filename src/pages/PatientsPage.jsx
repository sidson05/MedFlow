import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import RiskBadge from '../components/RiskBadge';
import { Search, UserCheck, Calendar, Phone, Stethoscope } from 'lucide-react';

export default function PatientsPage() {
  const { patients, selectedPatient, setSelectedPatient, searchQuery, setSearchQuery } = useDashboard();

  return (
    <div className="space-y-6 pb-10">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 health-card p-5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input 
            type="text"
            placeholder="Search patient name, ID, or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121316] border border-[#2A2D3A] text-white text-xs rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-xs text-[#94A3B8]">
          Showing <span className="font-bold text-white">{patients.length}</span> patient records
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Table */}
        <div className={`health-card p-6 ${selectedPatient ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2A2D3A] text-[#64748B]">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Patient Name</th>
                  <th className="pb-3 font-semibold">Age / Gender</th>
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">Diagnosis</th>
                  <th className="pb-3 font-semibold">Risk Level</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2D3A]/60">
                {patients.map((patient) => (
                  <tr 
                    key={patient.id}
                    className={`hover:bg-[#222530] transition-colors cursor-pointer ${
                      selectedPatient?.id === patient.id ? 'bg-blue-600/10 border-l-2 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <td className="py-3.5 font-mono font-medium text-white">{patient.id}</td>
                    <td className="py-3.5 font-semibold text-white">{patient.name}</td>
                    <td className="py-3.5 text-[#94A3B8]">{patient.age} / {patient.gender}</td>
                    <td className="py-3.5 text-[#94A3B8]">{patient.dept}</td>
                    <td className="py-3.5 text-white">{patient.diagnosis}</td>
                    <td className="py-3.5">
                      <RiskBadge risk={patient.risk} />
                    </td>
                    <td className="py-3.5 text-right">
                      <button className="text-xs text-blue-400 font-medium hover:underline">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Patient Drawer / Detail Card */}
        {selectedPatient && (
          <div className="health-card p-6 space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2D3A]">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedPatient.name}</h3>
                <p className="text-xs text-[#94A3B8] font-mono mt-0.5">{selectedPatient.id}</p>
              </div>
              <RiskBadge risk={selectedPatient.risk} />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-[#2A2D3A]/40">
                <span className="text-[#64748B] flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5" /> Demographics</span>
                <span className="text-white font-medium">{selectedPatient.age} yrs • {selectedPatient.gender}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[#2A2D3A]/40">
                <span className="text-[#64748B] flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5" /> Department</span>
                <span className="text-white font-medium">{selectedPatient.dept}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[#2A2D3A]/40">
                <span className="text-[#64748B] flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Admission Date</span>
                <span className="text-white font-medium">{selectedPatient.admissionDate}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[#2A2D3A]/40">
                <span className="text-[#64748B] flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Discharge Date</span>
                <span className="text-white font-medium">{selectedPatient.dischargeDate || 'Currently Admitted'}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[#2A2D3A]/40">
                <span className="text-[#64748B]">Readmit Days Out</span>
                <span className="text-rose-400 font-bold">{selectedPatient.daysOut ? `${selectedPatient.daysOut} days` : 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-[#64748B]">Billing Amount</span>
                <span className="text-emerald-400 font-bold">{selectedPatient.billing}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2A2D3A] flex gap-2">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="w-full bg-[#222530] text-xs font-semibold text-[#94A3B8] py-2 rounded-lg hover:text-white"
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
