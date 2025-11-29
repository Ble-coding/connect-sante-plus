
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Users, 
  BarChart3, 
  Bell, 
  MessageCircle, 
  Settings,
  Home,
  Pill,
  Clock,
  MapPin
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
    url: "/pharmacy-dashboard",
    icon: Home,
  },
  {
    title: "Stock & Inventaire",
    url: "/pharmacy-dashboard/inventory",
    icon: Package,
  },
  {
    title: "Commandes",
    url: "/pharmacy-dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Ordonnances",
    url: "/pharmacy-dashboard/prescriptions",
    icon: FileText,
  },
  {
    title: "Clients",
    url: "/pharmacy-dashboard/customers",
    icon: Users,
  },
  {
    title: "Médicaments",
    url: "/pharmacy-dashboard/medications",
    icon: Pill,
  },
  {
    title: "Horaires",
    url: "/pharmacy-dashboard/schedule",
    icon: Clock,
  },
  {
    title: "Localisation",
    url: "/pharmacy-dashboard/location",
    icon: MapPin,
  },
  {
    title: "Rapports",
    url: "/pharmacy-dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Messages",
    url: "/pharmacy-dashboard/messages",
    icon: MessageCircle,
  },
  {
    title: "Notifications",
    url: "/pharmacy-dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Paramètres",
    url: "/pharmacy-dashboard/settings",
    icon: Settings,
  },
];

export function PharmacySidebar() {
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
            <p className="text-xs text-gray-600">Espace Pharmacie</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
            Aide & Support
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
            Déconnexion
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
