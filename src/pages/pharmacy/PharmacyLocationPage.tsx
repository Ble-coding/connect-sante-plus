
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MapPin, Edit, Navigation, Phone, Mail, Clock } from 'lucide-react';

const PharmacyLocationPage = () => {
  const pharmacyInfo = {
    name: "Pharmacie du Centre",
    address: "123 Rue de la Santé, 75014 Paris",
    phone: "01 42 86 17 94",
    email: "contact@pharmacie-centre.fr",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    accessibility: ["Accès PMR", "Rampe d'accès", "Parking proche"],
    services: ["Livraison", "Garde", "Téléconseil", "Tests rapides"],
    transport: ["Métro: Ligne 6 - Saint-Jacques", "Bus: 21, 27, 38", "RER B: Port-Royal"]
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Localisation</h1>
            <p className="text-gray-600">Informations de localisation et contact</p>
          </div>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Modifier informations
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adresse</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{pharmacyInfo.address}</p>
            <p className="text-xs text-muted-foreground">Paris 14ème</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact</CardTitle>
            <Phone className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{pharmacyInfo.phone}</p>
            <p className="text-xs text-muted-foreground">Service client</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visibilité</CardTitle>
            <Navigation className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">Visible sur la carte</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de Contact</CardTitle>
            <CardDescription>Coordonnées de la pharmacie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de la pharmacie</label>
              <Input value={pharmacyInfo.name} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse complète</label>
              <Input value={pharmacyInfo.address} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <Input value={pharmacyInfo.phone} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={pharmacyInfo.email} readOnly />
            </div>
            <Button className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Modifier les informations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carte Interactive</CardTitle>
            <CardDescription>Localisation sur la carte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Carte interactive</p>
                <p className="text-sm text-gray-400">
                  Lat: {pharmacyInfo.coordinates.lat}<br/>
                  Lng: {pharmacyInfo.coordinates.lng}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                Ouvrir dans Google Maps
              </Button>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Ajuster la position
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Services & Accessibilité</CardTitle>
            <CardDescription>Services proposés et accessibilité</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Services disponibles</h4>
                <div className="flex flex-wrap gap-2">
                  {pharmacyInfo.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Accessibilité</h4>
                <div className="flex flex-wrap gap-2">
                  {pharmacyInfo.accessibility.map((access, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50">
                      {access}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Modifier services
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transports en Commun</CardTitle>
            <CardDescription>Accès et moyens de transport</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pharmacyInfo.transport.map((transport, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <Navigation className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{transport}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Edit className="h-4 w-4 mr-2" />
              Modifier transports
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Horaires d'Ouverture</CardTitle>
          <CardDescription>Horaires visibles par les clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Horaires de la semaine</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span>08:30 - 19:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi:</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche:</span>
                  <span>10:00 - 13:00</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Statut actuel</h4>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">
                  <Clock className="h-3 w-3 mr-1" />
                  Ouvert
                </Badge>
                <span className="text-sm text-gray-600">Ferme à 19:30</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyLocationPage;
