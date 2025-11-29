
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, RefreshCw, Shield } from 'lucide-react';

export function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres Système</h1>
        <p className="text-muted-foreground">
          Configuration générale de la plateforme
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Paramètres généraux
            </CardTitle>
            <CardDescription>
              Configuration de base de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="site-name">Nom de la plateforme</Label>
              <Input type="text" id="site-name" defaultValue="Pharma Africa Connect" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="admin-email">Email administrateur</Label>
              <Input type="email" id="admin-email" defaultValue="admin@pharmafriconnect.com" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode">Mode maintenance</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sécurité
            </CardTitle>
            <CardDescription>
              Paramètres de sécurité et authentification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="two-factor" defaultChecked />
              <Label htmlFor="two-factor">Authentification à deux facteurs obligatoire</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-verification" defaultChecked />
              <Label htmlFor="email-verification">Vérification email obligatoire</Label>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="session-timeout">Timeout de session (minutes)</Label>
              <Input type="number" id="session-timeout" defaultValue="60" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  );
}
