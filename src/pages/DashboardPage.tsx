
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PatientSidebar } from '@/components/dashboard/PatientSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { AppointmentsPage } from './dashboard/AppointmentsPage';
import { PrescriptionsPage } from './dashboard/PrescriptionsPage';
import { MedicationsPage } from './dashboard/MedicationsPage';
import { PharmaciesPage } from './dashboard/PharmaciesPage';
import { MessagesPage } from './dashboard/MessagesPage';
import { NotificationsPage } from './dashboard/NotificationsPage';
import { HistoryPage } from './dashboard/HistoryPage';
import { SettingsPage } from './dashboard/SettingsPage';
import { ScanPrescriptionPage } from './dashboard/ScanPrescriptionPage';
import { InsurancePage } from './dashboard/InsurancePage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const DashboardPage = () => {
  return (
    <ProtectedRoute allowedUserTypes={['patient']}>
      <div className="min-h-screen flex w-full">
        <SidebarProvider>
          <PatientSidebar />
          <Routes>
            <Route index element={<DashboardContent />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            <Route path="scan-prescription" element={<ScanPrescriptionPage />} />
            <Route path="medications" element={<MedicationsPage />} />
            <Route path="pharmacies" element={<PharmaciesPage />} />
            <Route path="insurance" element={<InsurancePage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
