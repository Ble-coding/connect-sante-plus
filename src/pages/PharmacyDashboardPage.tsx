
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PharmacySidebar } from '@/components/dashboard/PharmacySidebar';
import { PharmacyDashboardContent } from '@/components/dashboard/PharmacyDashboardContent';
import PharmacyInventoryPage from './pharmacy/PharmacyInventoryPage';
import PharmacyOrdersPage from './pharmacy/PharmacyOrdersPage';
import PharmacyPrescriptionsPage from './pharmacy/PharmacyPrescriptionsPage';
import PharmacyCustomersPage from './pharmacy/PharmacyCustomersPage';
import PharmacyMedicationsPage from './pharmacy/PharmacyMedicationsPage';
import PharmacySchedulePage from './pharmacy/PharmacySchedulePage';
import PharmacyLocationPage from './pharmacy/PharmacyLocationPage';
import PharmacyReportsPage from './pharmacy/PharmacyReportsPage';
import PharmacyMessagesPage from './pharmacy/PharmacyMessagesPage';
import PharmacyNotificationsPage from './pharmacy/PharmacyNotificationsPage';
import PharmacySettingsPage from './pharmacy/PharmacySettingsPage';

const PharmacyDashboardPage = () => {
  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider>
        <PharmacySidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route index element={<PharmacyDashboardContent />} />
            <Route path="inventory" element={<PharmacyInventoryPage />} />
            <Route path="orders" element={<PharmacyOrdersPage />} />
            <Route path="prescriptions" element={<PharmacyPrescriptionsPage />} />
            <Route path="customers" element={<PharmacyCustomersPage />} />
            <Route path="medications" element={<PharmacyMedicationsPage />} />
            <Route path="schedule" element={<PharmacySchedulePage />} />
            <Route path="location" element={<PharmacyLocationPage />} />
            <Route path="reports" element={<PharmacyReportsPage />} />
            <Route path="messages" element={<PharmacyMessagesPage />} />
            <Route path="notifications" element={<PharmacyNotificationsPage />} />
            <Route path="settings" element={<PharmacySettingsPage />} />
          </Routes>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default PharmacyDashboardPage;
