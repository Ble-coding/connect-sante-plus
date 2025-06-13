
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PatientSidebar } from '@/components/dashboard/PatientSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { AppointmentsPage } from './dashboard/AppointmentsPage';
import { PrescriptionsPage } from './dashboard/PrescriptionsPage';
import { MedicationsPage } from './dashboard/MedicationsPage';
import { HistoryPage } from './dashboard/HistoryPage';
import { PharmaciesPage } from './dashboard/PharmaciesPage';
import { MessagesPage } from './dashboard/MessagesPage';
import { NotificationsPage } from './dashboard/NotificationsPage';
import { SettingsPage } from './dashboard/SettingsPage';

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PatientSidebar />
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/pharmacies" element={<PharmaciesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
