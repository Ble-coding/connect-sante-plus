
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Navigation, Search, Filter, Map } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function PharmaciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);

  const pharmacies = [
    {
      id: 1,
      name: "Pharmacie du Centre",
      address: "123 Rue de la République, 75001 Paris",
      distance: "0.2 km",
      phone: "01 42 34 56 78",
      rating: 4.8,
      reviews: 156,
      hours: {
        current: "Ouverte jusqu'à 19h30",
        status: "open"
      },
      services: ["Garde de nuit", "Ordonnances en ligne", "Livraison"],
      availability: {
        paracetamol: true,
        amoxicilline: true,
        vitamineD: false
      }
    },
    {
      id: 2,
      name: "Pharmacie Saint-Martin",
      address: "45 Avenue Saint-Martin, 75003 Paris",
      distance: "0.5 km",
      phone: "01 48 87 65 43",
      rating: 4.6,
      reviews: 89,
      hours: {
        current: "Ouverte jusqu'à 20h00",
        status: "open"
      },
      services: ["Garde week-end", "Tests COVID", "Vaccinations"],
      availability: {
        paracetamol: true,
        amoxicilline: false,
        vitamineD: true
      }
    },
    {
      id: 3,
      name: "Pharmacie des Halles",
      address: "78 Rue des Halles, 75001 Paris",
      distance: "0.8 km",
      phone: "01 42 21 43 65",
      rating: 4.4,
      reviews: 234,
      hours: {
        current: "Fermée - Ouvre demain à 8h30",
        status: "closed"
      },
      services: ["24h/24", "Orthopédie", "Matériel médical"],
      availability: {
        paracetamol: true,
        amoxicilline: true,
        vitamineD: true
      }
    },
    {
      id: 4,
      name: "Pharmacie Moderne",
      address: "12 Boulevard Voltaire, 75011 Paris",
      distance: "1.2 km",
      phone: "01 43 55 67 89",
      rating: 4.7,
      reviews: 127,
      hours: {
        current: "Ouverte jusqu'à 19h00",
        status: "open"
      },
      services: ["Drive", "Click & Collect", "Conseils beauté"],
      availability: {
        paracetamol: true,
        amoxicilline: true,
        vitamineD: true
      }
    }
  ];

  const userMedications = ["Paracétamol", "Amoxicilline", "Vitamine D"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityStatus = (pharmacy: any) => {
    const available = Object.values(pharmacy.availability).filter(Boolean).length;
    const total = Object.values(pharmacy.availability).length;
    return `${available}/${total} médicaments disponibles`;
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Pharmacies proches</h1>
        </div>
        <Button variant="outline">
          <Map className="h-4 w-4 mr-2" />
          Vue carte
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Search and current medications */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une pharmacie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mes médicaments actuels</CardTitle>
              <CardDescription>
                Vérifiez la disponibilité de vos médicaments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userMedications.map((medication, index) => (
                  <Badge key={index} variant="secondary">
                    {medication}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pharmacies list */}
        <div className="space-y-4">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className={selectedPharmacy === pharmacy.id ? 'ring-2 ring-blue-500' : ''}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {pharmacy.address}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Navigation className="h-4 w-4" />
                        {pharmacy.distance}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {pharmacy.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{pharmacy.rating}</span>
                        <span className="text-sm text-muted-foreground">({pharmacy.reviews})</span>
                      </div>
                      <Badge className={getStatusColor(pharmacy.hours.status)}>
                        {pharmacy.hours.status === 'open' ? 'Ouvert' : 'Fermé'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {pharmacy.hours.current}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Services */}
                  <div>
                    <h5 className="font-medium text-sm mb-2">Services</h5>
                    <div className="flex flex-wrap gap-2">
                      {pharmacy.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Medication availability */}
                  <div>
                    <h5 className="font-medium text-sm mb-2">
                      Disponibilité de vos médicaments
                      <span className="text-muted-foreground font-normal ml-2">
                        ({getAvailabilityStatus(pharmacy)})
                      </span>
                    </h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Paracétamol</span>
                        <Badge variant={pharmacy.availability.paracetamol ? "default" : "secondary"}>
                          {pharmacy.availability.paracetamol ? "Disponible" : "Non disponible"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Amoxicilline</span>
                        <Badge variant={pharmacy.availability.amoxicilline ? "default" : "secondary"}>
                          {pharmacy.availability.amoxicilline ? "Disponible" : "Non disponible"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Vitamine D</span>
                        <Badge variant={pharmacy.availability.vitamineD ? "default" : "secondary"}>
                          {pharmacy.availability.vitamineD ? "Disponible" : "Non disponible"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">
                      <Navigation className="h-4 w-4 mr-2" />
                      Itinéraire
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm">
                      Réserver médicaments
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedPharmacy(selectedPharmacy === pharmacy.id ? null : pharmacy.id)}
                    >
                      {selectedPharmacy === pharmacy.id ? 'Masquer détails' : 'Plus d\'infos'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarInset>
  );
}
