
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DoctorSidebar } from '@/components/dashboard/DoctorSidebar';
import { DoctorDashboardContent } from '@/components/dashboard/DoctorDashboardContent';

const DoctorDashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DoctorSidebar />
        <Routes>
          <Route path="/" element={<DoctorDashboardContent />} />
          <Route path="/patients" element={<div>Patients Page - Coming Soon</div>} />
          <Route path="/appointments" element={<div>Appointments Page - Coming Soon</div>} />
          <Route path="/prescriptions" element={<div>Prescriptions Page - Coming Soon</div>} />
          <Route path="/consultations" element={<div>Consultations Page - Coming Soon</div>} />
          <Route path="/schedule" element={<div>Schedule Page - Coming Soon</div>} />
          <Route path="/reports" element={<div>Reports Page - Coming Soon</div>} />
          <Route path="/messages" element={<div>Messages Page - Coming Soon</div>} />
          <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
        </Routes>
      </div>
    </SidebarProvider>
  );
};

export default DoctorDashboardPage;
