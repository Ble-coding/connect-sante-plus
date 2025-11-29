
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Building2, 
  UserCheck, 
  BarChart3, 
  Settings, 
  FileText, 
  Bell, 
  MessageCircle, 
  Home,
  Database,
  Activity,
  AlertTriangle
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: "Tableau de bord",
    url: "/admin-dashboard",
    icon: Home,
  },
  {
    title: "Utilisateurs",
    url: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Pharmacies",
    url: "/admin-dashboard/pharmacies",
    icon: Building2,
  },
  {
    title: "Médecins",
    url: "/admin-dashboard/doctors",
    icon: UserCheck,
  },
  {
    title: "Statistiques",
    url: "/admin-dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Rapports",
    url: "/admin-dashboard/reports",
    icon: FileText,
  },
  {
    title: "Activité système",
    url: "/admin-dashboard/activity",
    icon: Activity,
  },
  {
    title: "Base de données",
    url: "/admin-dashboard/database",
    icon: Database,
  },
  {
    title: "Alertes",
    url: "/admin-dashboard/alerts",
    icon: AlertTriangle,
  },
  {
    title: "Messages",
    url: "/admin-dashboard/messages",
    icon: MessageCircle,
  },
  {
    title: "Notifications",
    url: "/admin-dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Paramètres",
    url: "/admin-dashboard/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/Tech Company Logo Emphasizing Health (5).png" 
            alt="Pharma Africa Connect" 
            className="h-14 w-auto"
          />
          <div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-red-600" />
              <p className="text-xs font-semibold text-red-600">Admin</p>
            </div>
            <p className="text-xs text-gray-600">Gestion Plateforme</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Support Technique
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
            Déconnexion
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
