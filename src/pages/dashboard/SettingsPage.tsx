
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Shield, 
  Bell, 
  Eye, 
  Download, 
  Trash2, 
  Edit, 
  Save,
  Phone,
  Mail,
  Calendar,
  MapPin
} from 'lucide-react';

export function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    birthDate: '1985-03-15',
    address: '123 Rue de la République, 75001 Paris',
    emergencyContact: 'Marie Dupont - 06 98 76 54 32',
    allergies: 'Pénicilline, Arachides',
    medicalConditions: 'Hypertension artérielle',
    bloodType: 'A+'
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareDataWithDoctors: true,
    shareDataWithPharmacies: false,
    allowResearch: false,
    showOnlineStatus: true,
    allowDirectMessages: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    medications: true,
    messages: true,
    prescriptions: true,
    reminders: true,
    emergencyAlerts: true
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account requested...');
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Paramètres</h1>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Compte</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informations personnelles
                    </CardTitle>
                    <CardDescription>
                      Gérez vos informations de profil et médicales
                    </CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-lg">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" disabled={!isEditing}>
                      Changer la photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG ou GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date de naissance</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="birthDate"
                        type="date"
                        value={profileData.birthDate}
                        onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Groupe sanguin</Label>
                    <Select 
                      value={profileData.bloodType} 
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, bloodType: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Nom - Téléphone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={profileData.allergies}
                    onChange={(e) => setProfileData(prev => ({ ...prev, allergies: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Listez vos allergies connues"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Conditions médicales</Label>
                  <Textarea
                    id="medicalConditions"
                    value={profileData.medicalConditions}
                    onChange={(e) => setProfileData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Conditions médicales chroniques"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Paramètres de confidentialité
                </CardTitle>
                <CardDescription>
                  Contrôlez qui peut accéder à vos informations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Partage avec les médecins</div>
                    <div className="text-sm text-muted-foreground">
                      Permettre aux médecins d'accéder à votre historique médical
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.shareDataWithDoctors}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, shareDataWithDoctors: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Partage avec les pharmacies</div>
                    <div className="text-sm text-muted-foreground">
                      Permettre aux pharmacies d'accéder à vos ordonnances
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.shareDataWithPharmacies}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, shareDataWithPharmacies: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Recherche médicale</div>
                    <div className="text-sm text-muted-foreground">
                      Autoriser l'utilisation anonyme de vos données pour la recherche
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.allowResearch}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, allowResearch: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Statut en ligne</div>
                    <div className="text-sm text-muted-foreground">
                      Montrer votre statut en ligne aux professionnels de santé
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.showOnlineStatus}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, showOnlineStatus: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Messages directs</div>
                    <div className="text-sm text-muted-foreground">
                      Autoriser les professionnels à vous envoyer des messages directs
                    </div>
                  </div>
                  <Switch
                    checked={privacySettings.allowDirectMessages}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, allowDirectMessages: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Préférences de notification
                </CardTitle>
                <CardDescription>
                  Personnalisez vos notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">
                        {key === 'appointments' && 'Rendez-vous'}
                        {key === 'medications' && 'Médicaments'}
                        {key === 'messages' && 'Messages'}
                        {key === 'prescriptions' && 'Ordonnances'}
                        {key === 'reminders' && 'Rappels'}
                        {key === 'emergencyAlerts' && 'Alertes d\'urgence'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {key === 'appointments' && 'Confirmations et rappels de RDV'}
                        {key === 'medications' && 'Rappels de prise de médicaments'}
                        {key === 'messages' && 'Nouveaux messages des professionnels'}
                        {key === 'prescriptions' && 'Nouvelles ordonnances disponibles'}
                        {key === 'reminders' && 'Rappels généraux de santé'}
                        {key === 'emergencyAlerts' && 'Alertes médicales urgentes'}
                      </div>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion du compte</CardTitle>
                <CardDescription>
                  Options avancées de gestion de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Exportation des données</h4>
                  <p className="text-sm text-muted-foreground">
                    Téléchargez une copie de toutes vos données médicales
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Exporter mes données
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Changement de mot de passe</h4>
                  <p className="text-sm text-muted-foreground">
                    Modifiez votre mot de passe pour sécuriser votre compte
                  </p>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>

                <div className="space-y-2 pt-4 border-t border-destructive/20">
                  <h4 className="font-medium text-destructive">Zone de danger</h4>
                  <p className="text-sm text-muted-foreground">
                    Ces actions sont irréversibles. Procédez avec prudence.
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer mon compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
