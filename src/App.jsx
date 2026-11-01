import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import OverviewPage from './pages/OverviewPage';
import PatientsPage from './pages/PatientsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import ReadmissionsPage from './pages/ReadmissionsPage';
import DoctorsPage from './pages/DoctorsPage';
import BillingPage from './pages/BillingPage';
import SqlStudioPage from './pages/SqlStudioPage';
import ConfigPage from './pages/ConfigPage';

function DashboardContent() {
  const { activeTab } = useDashboard();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage />;
      case 'patients':
        return <PatientsPage />;
      case 'departments':
        return <DepartmentsPage />;
      case 'readmissions':
        return <ReadmissionsPage />;
      case 'doctors':
        return <DoctorsPage />;
      case 'billing':
        return <BillingPage />;
      case 'sqlStudio':
        return <SqlStudioPage />;
      case 'config':
        return <ConfigPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-bg text-ink min-h-screen">
      <Header />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-bg text-ink">
        <Sidebar />
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
}
