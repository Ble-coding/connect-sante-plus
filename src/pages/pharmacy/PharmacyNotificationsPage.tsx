
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, AlertTriangle, CheckCircle, Clock, Package, FileText, Users } from 'lucide-react';

const PharmacyNotificationsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    stockAlerts: true,
    orderNotifications: true,
    prescriptionAlerts: true,
    customerMessages: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const notifications = [
    {
      id: 1,
      type: "stock",
      title: "Stock faible - Paracétamol 500mg",
      message: "Il ne reste que 8 unités en stock",
      timestamp: "Il y a 5 minutes",
      isRead: false,
      urgency: "high",
      icon: Package
    },
    {
      id: 2,
      type: "order",
      title: "Nouvelle commande reçue",
      message: "Commande ORD-125 de Marie Dupont",
      timestamp: "Il y a 15 minutes",
      isRead: false,
      urgency: "normal",
      icon: FileText
    },
    {
      id: 3,
      type: "prescription",
      title: "Ordonnance urgente",
      message: "Prescription prioritaire du Dr. Leblanc",
      timestamp: "Il y a 30 minutes",
      isRead: true,
      urgency: "critical",
      icon: AlertTriangle
    },
    {
      id: 4,
      type: "customer",
      title: "Message client",
      message: "Jean Martin a une question sur son traitement",
      timestamp: "Il y a 1 heure",
      isRead: true,
      urgency: "normal",
      icon: Users
    },
    {
      id: 5,
      type: "system",
      title: "Maintenance programmée",
      message: "Maintenance du système prévue ce soir à 22h",
      timestamp: "Il y a 2 heures",
      isRead: false,
      urgency: "low",
      icon: Bell
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'Critique';
      case 'high':
        return 'Urgent';
      case 'normal':
        return 'Normal';
      case 'low':
        return 'Info';
      default:
        return 'Normal';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Notifications</h1>
            <p className="text-gray-600">Centre de notifications et alertes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Tout marquer lu
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non lues</CardTitle>
            <Bell className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Notifications en attente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes stock</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Stock faible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Priorité haute</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Reçues aujourd'hui</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Notifications Récentes</CardTitle>
            <CardDescription>Dernières alertes et notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getUrgencyColor(notification.urgency)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getUrgencyColor(notification.urgency)}>
                              {getUrgencyLabel(notification.urgency)}
                            </Badge>
                            {!notification.isRead && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paramètres de Notification</CardTitle>
            <CardDescription>Configurez vos préférences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertes de stock</p>
                  <p className="text-sm text-gray-600">Stock faible et ruptures</p>
                </div>
                <Switch
                  checked={notificationSettings.stockAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, stockAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nouvelles commandes</p>
                  <p className="text-sm text-gray-600">Commandes clients</p>
                </div>
                <Switch
                  checked={notificationSettings.orderNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, orderNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ordonnances urgentes</p>
                  <p className="text-sm text-gray-600">Prescriptions prioritaires</p>
                </div>
                <Switch
                  checked={notificationSettings.prescriptionAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, prescriptionAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages clients</p>
                  <p className="text-sm text-gray-600">Messages et questions</p>
                </div>
                <Switch
                  checked={notificationSettings.customerMessages}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, customerMessages: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mises à jour système</p>
                  <p className="text-sm text-gray-600">Maintenances et updates</p>
                </div>
                <Switch
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Emails marketing</p>
                  <p className="text-sm text-gray-600">Promotions et actualités</p>
                </div>
                <Switch
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des Notifications</CardTitle>
          <CardDescription>Toutes les notifications des 7 derniers jours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">Commande fournisseur livrée</p>
                  <p className="text-xs text-gray-600">Livraison de 150 boîtes de Paracétamol</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">Hier 14:30</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Ordonnance préparée</p>
                  <p className="text-xs text-gray-600">Prescription PRES-089 pour M. Durand</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">Hier 11:20</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="font-medium text-sm">Péremption proche</p>
                  <p className="text-xs text-gray-600">5 médicaments expirent dans 15 jours</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">2 jours</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyNotificationsPage;
