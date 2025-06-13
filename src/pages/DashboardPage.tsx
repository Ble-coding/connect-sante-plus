
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PatientSidebar } from '@/components/dashboard/PatientSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PatientSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
