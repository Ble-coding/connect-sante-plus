
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DoctorSidebar } from '@/components/dashboard/DoctorSidebar';
import { DoctorDashboardContent } from '@/components/dashboard/DoctorDashboardContent';
import { DoctorPatientsPage } from '@/pages/doctor/DoctorPatientsPage';
import { DoctorAppointmentsPage } from '@/pages/doctor/DoctorAppointmentsPage';
import { DoctorPrescriptionsPage } from '@/pages/doctor/DoctorPrescriptionsPage';
import { DoctorConsultationsPage } from '@/pages/doctor/DoctorConsultationsPage';
import { DoctorSchedulePage } from '@/pages/doctor/DoctorSchedulePage';
import { DoctorReportsPage } from '@/pages/doctor/DoctorReportsPage';
import { DoctorMessagesPage } from '@/pages/doctor/DoctorMessagesPage';
import { DoctorSettingsPage } from '@/pages/doctor/DoctorSettingsPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const DoctorDashboardPage = () => {
  return (
    <ProtectedRoute allowedUserTypes={['doctor']}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <DoctorSidebar />
          <Routes>
            <Route index element={<DoctorDashboardContent />} />
            <Route path="patients" element={<DoctorPatientsPage />} />
            <Route path="appointments" element={<DoctorAppointmentsPage />} />
            <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
            <Route path="consultations" element={<DoctorConsultationsPage />} />
            <Route path="schedule" element={<DoctorSchedulePage />} />
            <Route path="reports" element={<DoctorReportsPage />} />
            <Route path="messages" element={<DoctorMessagesPage />} />
            <Route path="settings" element={<DoctorSettingsPage />} />
          </Routes>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default DoctorDashboardPage;
