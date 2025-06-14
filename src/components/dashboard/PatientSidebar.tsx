
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Pill, 
  MapPin, 
  MessageSquare, 
  Bell, 
  History, 
  Settings,
  Scan,
  Shield
} from 'lucide-react';

const menuItems = [
  {
    title: "Vue d'ensemble",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Rendez-vous",
    icon: Calendar,
    url: "/dashboard/appointments",
  },
  {
    title: "Ordonnances",
    icon: FileText,
    url: "/dashboard/prescriptions",
  },
  {
    title: "Scanner ordonnance",
    icon: Scan,
    url: "/dashboard/scan-prescription",
  },
  {
    title: "Médicaments",
    icon: Pill,
    url: "/dashboard/medications",
  },
  {
    title: "Pharmacies",
    icon: MapPin,
    url: "/dashboard/pharmacies",
  },
  {
    title: "Assurances",
    icon: Shield,
    url: "/dashboard/insurance",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/dashboard/messages",
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/dashboard/notifications",
  },
  {
    title: "Historique",
    icon: History,
    url: "/dashboard/history",
  },
  {
    title: "Paramètres",
    icon: Settings,
    url: "/dashboard/settings",
  },
];

export function PatientSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-16 flex items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-lg p-2">
            <Pill className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg">PharmaConnect</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className="w-full"
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
