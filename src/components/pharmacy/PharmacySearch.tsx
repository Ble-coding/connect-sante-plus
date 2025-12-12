
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, MapPin, Phone, Navigation } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { pharmacyService } from '@/lib/api/services';
import { useToast } from '@/components/ui/use-toast';

const PharmacySearch = () => {
  const [location, setLocation] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { toast } = useToast();

  const { data: searchResults, isLoading, refetch } = useQuery({
    queryKey: ['pharmacies', 'search', location, medicationName],
    queryFn: () => pharmacyService.search({
      city: location || undefined,
      medication: medicationName || undefined,
    }),
    enabled: false, // Ne pas exécuter automatiquement
  });

  const pharmacies = searchResults?.data?.results || searchResults?.data || [];

  const handleSearch = () => {
    if (!location && !medicationName) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une localisation ou un médicament.",
        variant: "destructive",
      });
      return;
    }
    setSearchPerformed(true);
    refetch();
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Localisation actuelle");
          // TODO: Utiliser latitude/longitude pour la recherche
          toast({
            title: "Localisation obtenue",
            description: "Recherche des pharmacies à proximité...",
          });
        },
        (error) => {
          toast({
            title: "Erreur de géolocalisation",
            description: "Impossible d'obtenir votre position.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Trouvez une pharmacie</h1>
          <p className="text-gray-600">
            Recherchez les pharmacies à proximité et vérifiez la disponibilité des médicaments
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Localisation</Label>
                <div className="flex mt-1">
                  <Input
                    id="location"
                    placeholder="Ville, code postal..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    onClick={handleUseMyLocation}
                    variant="outline"
                    className="rounded-l-none border-l-0"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ma position
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="radius">Distance</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 km</SelectItem>
                    <SelectItem value="3">3 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="medication">Médicament (optionnel)</Label>
                <Input
                  id="medication"
                  placeholder="Nom du médicament..."
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="openNow">Disponibilité</Label>
                <Select defaultValue="open">
                  <SelectTrigger>
                    <SelectValue placeholder="Disponibilité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Ouvert maintenant</SelectItem>
                    <SelectItem value="24h">Ouvert 24h/24</SelectItem>
                    <SelectItem value="all">Toutes les pharmacies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6 bg-pharma-primary hover:bg-pharma-primary/90" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" /> Rechercher
          </Button>
        </div>

        {searchPerformed && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Résultats de recherche</h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <p>Recherche en cours...</p>
              </div>
            ) : pharmacies.length > 0 ? (
              <div className="space-y-4">
                {pharmacies.map((pharmacy: any) => {
                  const openingHours = pharmacy.opening_hours || {};
                  const hoursText = pharmacy.is_24_7 
                    ? 'Ouvert 24h/24' 
                    : Object.values(openingHours)[0] || 'Horaires non disponibles';
                  
                  return (
                    <div key={pharmacy.id} className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{pharmacy.name}</h3>
                          <p className="text-sm text-gray-500">{pharmacy.address}</p>
                          <p className="text-sm text-gray-500">{pharmacy.city}, {pharmacy.country}</p>
                          {pharmacy.phone && (
                            <p className="text-sm text-gray-500 mt-1">
                              <Phone className="h-3 w-3 inline mr-1" />
                              {pharmacy.phone}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mt-1">{hoursText}</p>
                          {pharmacy.is_24_7 && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-1 inline-block">
                              24/7
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {pharmacy.phone && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.location.href = `tel:${pharmacy.phone}`}
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Appeler
                          </Button>
                        )}
                        {pharmacy.latitude && pharmacy.longitude && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              window.open(
                                `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`,
                                '_blank'
                              );
                            }}
                          >
                            <Navigation className="h-4 w-4 mr-1" />
                            Itinéraire
                          </Button>
                        )}
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-pharma-primary hover:bg-pharma-primary/90"
                          onClick={() => {
                            // TODO: Naviguer vers la page de détails de la pharmacie
                            toast({
                              title: "Détails",
                              description: `Voir les détails de ${pharmacy.name}`,
                            });
                          }}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p>Aucun résultat trouvé. Veuillez modifier votre recherche.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacySearch;
