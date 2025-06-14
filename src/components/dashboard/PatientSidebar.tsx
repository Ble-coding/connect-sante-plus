
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  User,
  Calendar,
  FileText,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Home,
  Pill,
  Clock,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainMenuItems = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Mes rendez-vous",
    url: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Mes ordonnances",
    url: "/dashboard/prescriptions",
    icon: FileText,
  },
  {
    title: "Mes médicaments",
    url: "/dashboard/medications",
    icon: Pill,
  },
  {
    title: "Historique médical",
    url: "/dashboard/history",
    icon: Clock,
  },
  {
    title: "Pharmacies proches",
    url: "/dashboard/pharmacies",
    icon: MapPin,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageCircle,
  },
];

const settingsItems = [
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Paramètres",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function PatientSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/a469a2ff-2942-41f7-ae90-c90117bc083b.png" 
            alt="PharmaConnect" 
            className="h-8 w-auto"
          />
          <div>
            <h3 className="font-semibold text-sm">Jean Dupont</h3>
            <p className="text-xs text-muted-foreground">Patient</p>
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
