
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/dashboard/AdminSidebar';
import { AdminDashboardContent } from '@/components/dashboard/AdminDashboardContent';
import { AdminUsersPage } from './admin/AdminUsersPage';
import { AdminPharmaciesPage } from './admin/AdminPharmaciesPage';
import { AdminDoctorsPage } from './admin/AdminDoctorsPage';
import { AdminAnalyticsPage } from './admin/AdminAnalyticsPage';
import { AdminReportsPage } from './admin/AdminReportsPage';
import { AdminActivityPage } from './admin/AdminActivityPage';
import { AdminDatabasePage } from './admin/AdminDatabasePage';
import { AdminAlertsPage } from './admin/AdminAlertsPage';
import { AdminMessagesPage } from './admin/AdminMessagesPage';
import { AdminNotificationsPage } from './admin/AdminNotificationsPage';
import { AdminSettingsPage } from './admin/AdminSettingsPage';

const AdminDashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <Routes>
            <Route index element={<AdminDashboardContent />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="pharmacies" element={<AdminPharmaciesPage />} />
            <Route path="doctors" element={<AdminDoctorsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="activity" element={<AdminActivityPage />} />
            <Route path="database" element={<AdminDatabasePage />} />
            <Route path="alerts" element={<AdminAlertsPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Routes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardPage;
