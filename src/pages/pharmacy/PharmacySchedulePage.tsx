
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Clock, Edit, Plus, Calendar } from 'lucide-react';

const PharmacySchedulePage = () => {
  const schedule = [
    { day: "Lundi", open: "08:30", close: "19:30", isOpen: true },
    { day: "Mardi", open: "08:30", close: "19:30", isOpen: true },
    { day: "Mercredi", open: "08:30", close: "19:30", isOpen: true },
    { day: "Jeudi", open: "08:30", close: "19:30", isOpen: true },
    { day: "Vendredi", open: "08:30", close: "19:30", isOpen: true },
    { day: "Samedi", open: "09:00", close: "18:00", isOpen: true },
    { day: "Dimanche", open: "10:00", close: "13:00", isOpen: true }
  ];

  const holidays = [
    { date: "2024-12-25", name: "Noël", status: "Fermé" },
    { date: "2024-12-26", name: "Lendemain de Noël", status: "Fermé" },
    { date: "2025-01-01", name: "Jour de l'An", status: "Fermé" },
    { date: "2025-01-06", name: "Épiphanie", status: "Ouvert matin" }
  ];

  const specialHours = [
    { date: "2024-12-24", name: "Réveillon de Noël", hours: "08:30 - 15:00" },
    { date: "2024-12-31", name: "Réveillon du Nouvel An", hours: "08:30 - 15:00" }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Horaires</h1>
            <p className="text-gray-600">Gestion des horaires d'ouverture</p>
          </div>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Modifier horaires
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut actuel</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ouvert</div>
            <p className="text-xs text-muted-foreground">Fermeture à 19:30</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jours d'ouverture</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7j/7</div>
            <p className="text-xs text-muted-foreground">Toute la semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures/semaine</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68h</div>
            <p className="text-xs text-muted-foreground">Temps d'ouverture</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Horaires Hebdomadaires</CardTitle>
          <CardDescription>Horaires d'ouverture standard de la pharmacie</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedule.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-20">
                    <span className="font-medium">{day.day}</span>
                  </div>
                  <Badge className={day.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {day.isOpen ? 'Ouvert' : 'Fermé'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  {day.isOpen && (
                    <span className="text-sm">
                      {day.open} - {day.close}
                    </span>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Jours Fériés</CardTitle>
                <CardDescription>Fermetures exceptionnelles</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {holidays.map((holiday, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{holiday.name}</p>
                    <p className="text-sm text-gray-600">{holiday.date}</p>
                  </div>
                  <Badge className={holiday.status === 'Fermé' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                    {holiday.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Horaires Spéciaux</CardTitle>
                <CardDescription>Horaires modifiés temporairement</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {specialHours.map((special, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">{special.name}</p>
                    <p className="text-sm text-gray-600">{special.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{special.hours}</p>
                    <Badge className="bg-blue-100 text-blue-800">Modifié</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations Publiques</CardTitle>
          <CardDescription>Informations affichées pour les clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <h3 className="font-medium mb-2">Message d'accueil</h3>
              <p className="text-sm text-gray-600 mb-2">
                "Pharmacie du Centre - Votre pharmacie de confiance depuis 1985. 
                Service de garde disponible. Livraison à domicile possible."
              </p>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <h3 className="font-medium mb-2">Informations de contact</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📞 01 42 86 17 94</p>
                <p>📧 contact@pharmacie-centre.fr</p>
                <p>📍 123 Rue de la Santé, 75014 Paris</p>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacySchedulePage;
