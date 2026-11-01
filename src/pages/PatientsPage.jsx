import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import RiskBadge from '../components/RiskBadge';
import { Search, UserCheck, Calendar, Stethoscope, Clock, CreditCard, UserPlus, X, Check } from 'lucide-react';

export default function PatientsPage() {
  const { patients, selectedPatient, setSelectedPatient, searchQuery, setSearchQuery, addPatient } = useDashboard();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    dept: 'General Ward',
    diagnosis: '',
    daysOut: '',
    billing: '₹75,000',
    paymentStatus: 'Paid'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.diagnosis) return;

    const created = addPatient({
      name: formData.name,
      age: formData.age || 45,
      gender: formData.gender,
      dept: formData.dept,
      diagnosis: formData.diagnosis,
      daysOut: formData.daysOut ? Number(formData.daysOut) : null,
      billing: formData.billing,
      paymentStatus: formData.paymentStatus
    });

    setSelectedPatient(created);
    setIsAddModalOpen(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);

    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      dept: 'General Ward',
      diagnosis: '',
      daysOut: '',
      billing: '₹75,000',
      paymentStatus: 'Paid'
    });
  };

  return (
    <div className="space-y-4 pb-8 relative">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 health-card p-[21px]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text"
            placeholder="Search patient name, ID, or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-panel border border-line text-ink text-xs rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-accent shadow-2xs"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[12.5px] text-muted font-medium">
            Showing <span className="font-semibold text-ink">{patients.length}</span> patient records
          </span>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 bg-forest hover:opacity-95 text-forestTx rounded-full px-4 py-2 text-xs font-semibold shadow-xs transition-opacity cursor-pointer shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5 text-forestTx" />
            <span>Add patient</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="flex items-center space-x-2 bg-accentSoft border border-accent/30 text-accent px-4 py-2.5 rounded-full text-xs font-semibold shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-accent" />
          <span>New patient admission created and registered into MedFlow successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Patient Table */}
        <div className={`health-card p-[21px] ${selectedPatient ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line text-muted text-[11.5px] uppercase tracking-wider">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Patient name</th>
                  <th className="pb-3 font-medium">Age / Gender</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Diagnosis</th>
                  <th className="pb-3 font-medium">Risk level</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {patients.map((patient) => {
                  const isSelected = selectedPatient?.id === patient.id;
                  return (
                    <tr 
                      key={patient.id}
                      className={`hover:bg-panel2 transition-colors cursor-pointer ${
                        isSelected ? 'bg-accentSoft/60' : ''
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <td className="py-3 font-mono font-medium text-ink">{patient.id}</td>
                      <td className="py-3 font-semibold text-ink text-[13px]">{patient.name}</td>
                      <td className="py-3 text-muted">{patient.age} / {patient.gender}</td>
                      <td className="py-3 text-muted">{patient.dept}</td>
                      <td className="py-3 text-ink font-medium">{patient.diagnosis}</td>
                      <td className="py-3">
                        <RiskBadge risk={patient.risk} />
                      </td>
                      <td className="py-3 text-right">
                        <button className="text-[12px] text-sage font-medium hover:underline cursor-pointer">
                          View details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Patient Drawer / Detail Card */}
        {selectedPatient && (
          <div className="health-card p-[21px] space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-line">
              <div>
                <h3 className="text-[16px] font-semibold text-ink tracking-tight">{selectedPatient.name}</h3>
                <p className="text-[11.5px] text-muted font-mono mt-0.5">{selectedPatient.id}</p>
              </div>
              <RiskBadge risk={selectedPatient.risk} />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-line">
                <span className="text-muted flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-muted" /> Demographics
                </span>
                <span className="text-ink font-medium">{selectedPatient.age} yrs • {selectedPatient.gender}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-line">
                <span className="text-muted flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-muted" /> Department
                </span>
                <span className="text-ink font-medium">{selectedPatient.dept}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-line">
                <span className="text-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-muted" /> Admission date
                </span>
                <span className="text-ink font-medium">{selectedPatient.admissionDate}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-line">
                <span className="text-muted flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted" /> Discharge date
                </span>
                <span className="text-ink font-medium">{selectedPatient.dischargeDate}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-line">
                <span className="text-muted flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-muted" /> Total billing
                </span>
                <span className="text-ink font-semibold">{selectedPatient.billing}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-line">
                <span className="text-muted">Payment status</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  selectedPatient.paymentStatus === 'Paid' 
                    ? 'bg-good/10 text-good' 
                    : 'bg-bad/10 text-bad'
                }`}>
                  {selectedPatient.paymentStatus}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="w-full bg-panel2 hover:bg-line border border-line text-ink py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Close details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-panel border border-line rounded-[22px] shadow-2xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <h3 className="text-[17px] font-semibold text-ink tracking-tight">Register new patient admission</h3>
                <p className="text-[12px] text-muted mt-0.5">Enter clinical and billing details for hospital intake</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-muted hover:text-ink cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11.5px] font-semibold text-muted mb-1">Patient full name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Rao"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-muted mb-1">Age</label>
                  <input 
                    type="number"
                    placeholder="e.g. 62"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-muted mb-1">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-muted mb-1">Department</label>
                  <select 
                    value={formData.dept}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="General Ward">General Ward</option>
                    <option value="ICU">ICU</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Endocrinology">Endocrinology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-muted mb-1">Primary diagnosis *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Heart failure, Diabetes"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-muted mb-1">Billing estimate</label>
                  <input 
                    type="text"
                    placeholder="e.g. ₹95,000"
                    value={formData.billing}
                    onChange={(e) => setFormData({ ...formData, billing: e.target.value })}
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-muted mb-1">Payment status</label>
                  <select 
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                    className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold text-muted mb-1">
                  Days since prior discharge <span className="font-normal text-muted">(Optional for HRRP risk test)</span>
                </label>
                <input 
                  type="number"
                  placeholder="e.g. 12 (<=10: High, <=20: Medium, >20: Low)"
                  value={formData.daysOut}
                  onChange={(e) => setFormData({ ...formData, daysOut: e.target.value })}
                  className="w-full bg-panel2 border border-line rounded-xl px-3.5 py-2 text-ink text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-line text-ink font-semibold hover:bg-panel2 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-forest text-forestTx font-semibold shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
                >
                  Register admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
