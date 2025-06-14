
import React from 'react';
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
  SidebarFooter,
  SidebarTrigger
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
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-pharma-primary flex items-center justify-center">
            <Pill className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-pharma-primary">PharmaConnect</h2>
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
