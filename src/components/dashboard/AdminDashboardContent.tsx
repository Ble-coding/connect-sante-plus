
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, UserCheck, Activity, AlertTriangle, TrendingUp } from 'lucide-react';

export function AdminDashboardContent() {
  const stats = [
    {
      title: "Utilisateurs totaux",
      value: "12,547",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Pharmacies actives",
      value: "1,234",
      change: "+5%",
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Médecins inscrits",
      value: "456",
      change: "+8%",
      icon: UserCheck,
      color: "text-purple-600"
    },
    {
      title: "Transactions/jour",
      value: "8,945",
      change: "+15%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentActivity = [
    { action: "Nouvelle pharmacie inscrite", user: "Pharmacie du Centre", time: "Il y a 2h", type: "success" },
    { action: "Médecin suspendu", user: "Dr. Martin", time: "Il y a 4h", type: "warning" },
    { action: "Rapport de bug", user: "Patient #12345", time: "Il y a 6h", type: "error" },
    { action: "Nouvelle fonctionnalité déployée", user: "Système", time: "Il y a 1j", type: "info" },
  ];

  const alerts = [
    { message: "5 pharmacies en attente de validation", level: "warning" },
    { message: "Pic d'utilisation détecté", level: "info" },
    { message: "2 rapports de sécurité à traiter", level: "error" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de la plateforme PharmaConnect
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertes système */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertes système
            </CardTitle>
            <CardDescription>
              Notifications importantes nécessitant votre attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <span className="text-sm">{alert.message}</span>
                <Badge variant={alert.level === 'error' ? 'destructive' : alert.level === 'warning' ? 'secondary' : 'default'}>
                  {alert.level === 'error' ? 'Urgent' : alert.level === 'warning' ? 'Attention' : 'Info'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activité récente
            </CardTitle>
            <CardDescription>
              Dernières actions sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  <Badge variant={activity.type === 'success' ? 'default' : activity.type === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
