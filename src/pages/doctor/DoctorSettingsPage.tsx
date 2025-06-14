
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  User,
  Bell,
  Shield,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export function DoctorSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: 'Marie',
    lastName: 'Diallo',
    email: 'marie.diallo@medecin.fr',
    phone: '0123456789',
    speciality: 'Médecin généraliste',
    rpps: '123456789',
    
    // Adresse du cabinet
    address: '123 Rue de la Santé',
    city: 'Paris',
    postalCode: '75014',
    
    // Horaires
    mondayStart: '08:00',
    mondayEnd: '18:00',
    tuesdayStart: '08:00',
    tuesdayEnd: '18:00',
    wednesdayStart: '08:00',
    wednesdayEnd: '18:00',
    thursdayStart: '08:00',
    thursdayEnd: '18:00',
    fridayStart: '08:00',
    fridayEnd: '16:00',
    
    // Paramètres de notification
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    newPatientAlerts: true,
    
    // Sécurité
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simuler la sauvegarde
    console.log('Sauvegarde des paramètres:', formData);
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Paramètres</h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </header>

      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </CardTitle>
            <CardDescription>
              Gérez vos informations professionnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email professionnel</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="speciality">Spécialité</Label>
                <Input
                  id="speciality"
                  value={formData.speciality}
                  onChange={(e) => handleInputChange('speciality', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rpps">Numéro RPPS</Label>
                <Input
                  id="rpps"
                  value={formData.rpps}
                  onChange={(e) => handleInputChange('rpps', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Adresse du cabinet */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Adresse du cabinet
            </CardTitle>
            <CardDescription>
              Informations sur votre lieu d'exercice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horaires de travail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horaires de travail
            </CardTitle>
            <CardDescription>
              Définissez vos heures de consultation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => {
              const dayNames = {
                monday: 'Lundi',
                tuesday: 'Mardi',
                wednesday: 'Mercredi',
                thursday: 'Jeudi',
                friday: 'Vendredi'
              };
              
              return (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">
                    {dayNames[day as keyof typeof dayNames]}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={formData[`${day}Start` as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(`${day}Start`, e.target.value)}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">à</span>
                    <Input
                      type="time"
                      value={formData[`${day}End` as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(`${day}End`, e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Gérez vos préférences de notification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Notifications par email</div>
                  <div className="text-sm text-muted-foreground">
                    Recevez les notifications importantes par email
                  </div>
                </div>
                <Button
                  variant={formData.emailNotifications ? "default" : "outline"}
                  onClick={() => handleInputChange('emailNotifications', !formData.emailNotifications)}
                >
                  {formData.emailNotifications ? 'Activé' : 'Désactivé'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Notifications SMS</div>
                  <div className="text-sm text-muted-foreground">
                    Recevez les alertes urgentes par SMS
                  </div>
                </div>
                <Button
                  variant={formData.smsNotifications ? "default" : "outline"}
                  onClick={() => handleInputChange('smsNotifications', !formData.smsNotifications)}
                >
                  {formData.smsNotifications ? 'Activé' : 'Désactivé'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Rappels de rendez-vous</div>
                  <div className="text-sm text-muted-foreground">
                    Notifications avant les consultations
                  </div>
                </div>
                <Button
                  variant={formData.appointmentReminders ? "default" : "outline"}
                  onClick={() => handleInputChange('appointmentReminders', !formData.appointmentReminders)}
                >
                  {formData.appointmentReminders ? 'Activé' : 'Désactivé'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Nouveaux patients</div>
                  <div className="text-sm text-muted-foreground">
                    Alertes pour les nouvelles inscriptions
                  </div>
                </div>
                <Button
                  variant={formData.newPatientAlerts ? "default" : "outline"}
                  onClick={() => handleInputChange('newPatientAlerts', !formData.newPatientAlerts)}
                >
                  {formData.newPatientAlerts ? 'Activé' : 'Désactivé'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sécurité
            </CardTitle>
            <CardDescription>
              Gérez la sécurité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              />
            </div>
            
            <div className="pt-4">
              <Button variant="outline">
                Changer le mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions du compte</CardTitle>
            <CardDescription>
              Gérez votre compte et vos données
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                Exporter mes données
              </Button>
              <Button variant="outline">
                Sauvegarder le profil
              </Button>
              <Button variant="destructive">
                Supprimer le compte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
