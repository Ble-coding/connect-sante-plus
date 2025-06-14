
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, User, Settings } from 'lucide-react';

export function AdminActivityPage() {
  const activities = [
    { action: "Connexion utilisateur", user: "jean@email.com", time: "Il y a 2 min", type: "info" },
    { action: "Nouvelle commande", user: "Pharmacie du Centre", time: "Il y a 5 min", type: "success" },
    { action: "Modification profil", user: "Dr. Marie Diallo", time: "Il y a 10 min", type: "info" },
    { action: "Erreur système", user: "Système", time: "Il y a 15 min", type: "error" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activité système</h1>
        <p className="text-muted-foreground">
          Surveillance en temps réel des activités de la plateforme
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Journal d'activité en temps réel
          </CardTitle>
          <CardDescription>
            Suivi des actions et événements système
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-100">
                  {activity.type === 'error' ? <Settings className="h-4 w-4 text-red-600" /> : 
                   activity.type === 'success' ? <Activity className="h-4 w-4 text-green-600" /> : 
                   <User className="h-4 w-4 text-blue-600" />}
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{activity.time}</span>
                <Badge variant={activity.type === 'error' ? 'destructive' : activity.type === 'success' ? 'default' : 'secondary'}>
                  {activity.type}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
