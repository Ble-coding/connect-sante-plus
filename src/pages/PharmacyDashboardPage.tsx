
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PharmacySidebar } from '@/components/dashboard/PharmacySidebar';
import { PharmacyDashboardContent } from '@/components/dashboard/PharmacyDashboardContent';

const PharmacyDashboardPage = () => {
  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider>
        <PharmacySidebar />
        <main className="flex-1 overflow-auto">
          <PharmacyDashboardContent />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default PharmacyDashboardPage;
