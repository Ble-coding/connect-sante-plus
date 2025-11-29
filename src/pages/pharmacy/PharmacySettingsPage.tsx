
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Settings, Save, User, Bell, Shield, Database, Printer } from 'lucide-react';

const PharmacySettingsPage = () => {
  const [settings, setSettings] = useState({
    pharmacyName: "Pharmacie du Centre",
    address: "123 Rue de la Santé, 75014 Paris",
    phone: "01 42 86 17 94",
    email: "contact@pharmacie-centre.fr",
    siret: "12345678901234",
    license: "LIC-PHARM-001",
    autoBackup: true,
    stockAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    printReceipts: true,
    currency: "EUR",
    timezone: "Europe/Paris",
    language: "fr"
  });

  const handleSave = () => {
    console.log('Paramètres sauvegardés:', settings);
    // Ici on sauvegarderait les paramètres
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Paramètres</h1>
            <p className="text-gray-600">Configuration de votre pharmacie</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations Générales
            </CardTitle>
            <CardDescription>Informations de base de votre pharmacie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de la pharmacie</label>
              <Input
                value={settings.pharmacyName}
                onChange={(e) => setSettings({ ...settings, pharmacyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <Input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Informations Légales
            </CardTitle>
            <CardDescription>Licences et autorisations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro SIRET</label>
              <Input
                value={settings.siret}
                onChange={(e) => setSettings({ ...settings, siret: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Licence d'exploitation</label>
              <Input
                value={settings.license}
                onChange={(e) => setSettings({ ...settings, license: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Devise</label>
              <Select value={settings.currency} onValueChange={(value) => setSettings({ ...settings, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollar ($)</SelectItem>
                  <SelectItem value="GBP">Livre (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fuseau horaire</label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                  <SelectItem value="America/New_York">America/New_York</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Préférences de notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertes de stock</p>
                <p className="text-sm text-gray-600">Notifications pour stock faible</p>
              </div>
              <Switch
                checked={settings.stockAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, stockAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications email</p>
                <p className="text-sm text-gray-600">Recevoir les alertes par email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications SMS</p>
                <p className="text-sm text-gray-600">Recevoir les alertes par SMS</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Système
            </CardTitle>
            <CardDescription>Configuration système</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sauvegarde automatique</p>
                <p className="text-sm text-gray-600">Sauvegarde quotidienne des données</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Impression automatique</p>
                <p className="text-sm text-gray-600">Imprimer les reçus automatiquement</p>
              </div>
              <Switch
                checked={settings.printReceipts}
                onCheckedChange={(checked) => setSettings({ ...settings, printReceipts: checked })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Langue</label>
              <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Gestion des Sauvegardes
          </CardTitle>
          <CardDescription>Sauvegarde et restauration des données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-4 text-center">
                <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium mb-2">Sauvegarde Manuelle</h3>
                <p className="text-sm text-gray-600 mb-3">Créer une sauvegarde immédiate</p>
                <Button variant="outline" size="sm">
                  Créer sauvegarde
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium mb-2">Dernière Sauvegarde</h3>
                <p className="text-sm text-gray-600 mb-1">14/12/2024 - 02:00</p>
                <p className="text-xs text-green-600 mb-3">Succès</p>
                <Button variant="outline" size="sm">
                  Télécharger
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <h3 className="font-medium mb-2">Restauration</h3>
                <p className="text-sm text-gray-600 mb-3">Restaurer depuis une sauvegarde</p>
                <Button variant="outline" size="sm">
                  Restaurer
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations Système</CardTitle>
          <CardDescription>Détails sur votre installation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Version</p>
              <p className="font-medium">Pharma Africa Connect v2.1.4</p>
            </div>
            <div>
              <p className="text-gray-600">Dernière mise à jour</p>
              <p className="font-medium">10/12/2024</p>
            </div>
            <div>
              <p className="text-gray-600">Base de données</p>
              <p className="font-medium">PostgreSQL 13.2</p>
            </div>
            <div>
              <p className="text-gray-600">Espace disque</p>
              <p className="font-medium">2.4 GB utilisés</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacySettingsPage;
