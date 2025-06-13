
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Clock, Calendar, Pill, MessageCircle, User, Settings, Check, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "Rappel de rendez-vous",
      message: "Votre consultation avec Dr. Marie Diallo est prévue demain à 14h30",
      timestamp: "Il y a 2h",
      read: false,
      urgent: false
    },
    {
      id: 2,
      type: "medication",
      title: "Prise de médicament",
      message: "Il est temps de prendre votre Paracétamol (500mg)",
      timestamp: "Il y a 1h",
      read: false,
      urgent: true
    },
    {
      id: 3,
      type: "message",
      title: "Nouveau message",
      message: "Dr. Ahmed Kone vous a envoyé un message",
      timestamp: "Il y a 3h",
      read: true,
      urgent: false
    },
    {
      id: 4,
      type: "prescription",
      title: "Ordonnance disponible",
      message: "Votre ordonnance est prête en pharmacie",
      timestamp: "Hier",
      read: true,
      urgent: false
    },
    {
      id: 5,
      type: "appointment",
      title: "Confirmation de RDV",
      message: "Votre rendez-vous du 20 juin avec Dr. Ahmed Kone est confirmé",
      timestamp: "Il y a 2 jours",
      read: true,
      urgent: false
    }
  ]);

  const [settings, setSettings] = useState({
    appointments: true,
    medications: true,
    messages: true,
    prescriptions: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'medication': return Pill;
      case 'message': return MessageCircle;
      case 'prescription': return User;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-blue-100 text-blue-800';
      case 'medication': return 'bg-green-100 text-green-800';
      case 'message': return 'bg-purple-100 text-purple-800';
      case 'prescription': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount}</Badge>
          )}
        </div>
        <Button variant="outline" onClick={handleMarkAllAsRead}>
          <Check className="h-4 w-4 mr-2" />
          Tout marquer comme lu
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">Notifications ({notifications.length})</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune notification</h3>
                  <p className="text-muted-foreground text-center">
                    Vous n'avez aucune notification pour le moment
                  </p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => {
                const NotificationIcon = getNotificationIcon(notification.type);
                return (
                  <Card key={notification.id} className={`${!notification.read ? 'bg-blue-50/50 border-blue-200' : ''} ${notification.urgent ? 'border-red-200' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                          <NotificationIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Nouveau
                              </Badge>
                            )}
                            {notification.urgent && (
                              <Badge variant="destructive">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Types de notifications</CardTitle>
                <CardDescription>
                  Choisissez les types de notifications que vous souhaitez recevoir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Rendez-vous</div>
                    <div className="text-sm text-muted-foreground">
                      Rappels et confirmations de rendez-vous
                    </div>
                  </div>
                  <Switch
                    checked={settings.appointments}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, appointments: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Médicaments</div>
                    <div className="text-sm text-muted-foreground">
                      Rappels de prise de médicaments
                    </div>
                  </div>
                  <Switch
                    checked={settings.medications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, medications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Messages</div>
                    <div className="text-sm text-muted-foreground">
                      Nouveaux messages des professionnels de santé
                    </div>
                  </div>
                  <Switch
                    checked={settings.messages}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, messages: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Ordonnances</div>
                    <div className="text-sm text-muted-foreground">
                      Nouvelles ordonnances et disponibilité en pharmacie
                    </div>
                  </div>
                  <Switch
                    checked={settings.prescriptions}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, prescriptions: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Canaux de notification</CardTitle>
                <CardDescription>
                  Choisissez comment vous souhaitez recevoir vos notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notifications push</div>
                    <div className="text-sm text-muted-foreground">
                      Notifications dans votre navigateur
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notifications par email</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir les notifications par email
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notifications par SMS</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir les notifications urgentes par SMS
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
