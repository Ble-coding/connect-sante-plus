
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

export function AdminAlertsPage() {
  const alerts = [
    { id: 1, message: "Pic d'utilisation détecté", level: "warning", time: "Il y a 5 min", resolved: false },
    { id: 2, message: "Sauvegarde automatique terminée", level: "success", time: "Il y a 1h", resolved: true },
    { id: 3, message: "Erreur de connexion API externe", level: "error", time: "Il y a 2h", resolved: false },
    { id: 4, message: "Maintenance programmée ce soir", level: "info", time: "Il y a 3h", resolved: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alertes Système</h1>
        <p className="text-muted-foreground">
          Gestion des alertes et notifications système
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertes actives</CardTitle>
          <CardDescription>
            Notifications nécessitant votre attention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {alert.level === 'error' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                {alert.level === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                {alert.level === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                {alert.level === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-muted-foreground">{alert.time}</p>
                </div>
              </div>
              <Badge variant={alert.resolved ? 'default' : alert.level === 'error' ? 'destructive' : 'secondary'}>
                {alert.resolved ? 'Résolu' : 'Actif'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
