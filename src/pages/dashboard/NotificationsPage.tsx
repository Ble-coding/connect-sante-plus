
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, Calendar, Pill, MessageCircle, User, Check, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/lib/api/services';
import { useToast } from '@/components/ui/use-toast';

export function NotificationsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getAll(),
  });

  const notifications = notificationsData?.data?.results || notificationsData?.data || [];

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: () => notificationService.getUnread(),
  });

  const unreadCount = unreadData?.data?.results?.length || unreadData?.data?.length || 0;

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

  const markReadMutation = useMutation({
    mutationFn: (id: number) => notificationService.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Notifications marquées comme lues",
        description: "Toutes les notifications ont été marquées comme lues.",
      });
    },
  });

  const handleMarkAsRead = (id: number) => {
    markReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllReadMutation.mutate();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    } else if (days > 0) {
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      return "À l'instant";
    }
  };

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
        <Button 
          variant="outline" 
          onClick={handleMarkAllAsRead}
          disabled={markAllReadMutation.isPending || unreadCount === 0}
        >
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
            {isLoading ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p>Chargement des notifications...</p>
                </CardContent>
              </Card>
            ) : notifications.length === 0 ? (
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
              notifications.map((notification: any) => {
                const NotificationIcon = getNotificationIcon(notification.notification_type);
                return (
                  <Card 
                    key={notification.id} 
                    className={`${!notification.is_read ? 'bg-blue-50/50 border-blue-200' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.notification_type)}`}>
                          <NotificationIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.is_read && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Nouveau
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatTime(notification.created_at)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!notification.is_read && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              disabled={markReadMutation.isPending}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
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
