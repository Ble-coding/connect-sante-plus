
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  User,
  Calendar,
  FileText,
  Users,
  Stethoscope,
  Clock,
  BarChart3,
  MessageCircle,
  Settings,
  LogOut,
  Home,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainMenuItems = [
  {
    title: "Tableau de bord",
    url: "/doctor-dashboard",
    icon: Home,
  },
  {
    title: "Mes patients",
    url: "/doctor-dashboard/patients",
    icon: Users,
  },
  {
    title: "Rendez-vous",
    url: "/doctor-dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Ordonnances",
    url: "/doctor-dashboard/prescriptions",
    icon: FileText,
  },
  {
    title: "Consultations",
    url: "/doctor-dashboard/consultations",
    icon: Stethoscope,
  },
  {
    title: "Planning",
    url: "/doctor-dashboard/schedule",
    icon: Clock,
  },
  {
    title: "Rapports",
    url: "/doctor-dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Messages",
    url: "/doctor-dashboard/messages",
    icon: MessageCircle,
  },
];

const settingsItems = [
  {
    title: "Paramètres",
    url: "/doctor-dashboard/settings",
    icon: Settings,
  },
];

export function DoctorSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Dr. Marie Diallo</h3>
            <p className="text-xs text-muted-foreground">Médecin généraliste</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Paramètres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
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

      <SidebarFooter className="border-t p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
