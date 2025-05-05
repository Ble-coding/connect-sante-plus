
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
import { Search, MapPin } from 'lucide-react';

// Mock data for pharmacies
const mockPharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale",
    address: "15 Avenue de la République, Paris",
    phone: "+33 1 23 45 67 89",
    openingHours: "8h - 20h",
    distance: "0.5 km",
    medicationAvailable: true
  },
  {
    id: 2,
    name: "Pharmacie du Marché",
    address: "8 Place du Marché, Paris",
    phone: "+33 1 98 76 54 32",
    openingHours: "9h - 19h",
    distance: "1.2 km",
    medicationAvailable: false
  },
  {
    id: 3,
    name: "Grande Pharmacie",
    address: "45 Boulevard Haussmann, Paris",
    phone: "+33 1 45 67 89 01",
    openingHours: "8h - 22h",
    distance: "2.3 km",
    medicationAvailable: true
  },
];

const PharmacySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    // In a real app, this would call an API with the search parameters
    // For now, we'll just use our mock data
    setSearchResults(mockPharmacies);
    setSearchPerformed(true);
  };

  const handleUseMyLocation = () => {
    // In a real app, this would use the Geolocation API
    setLocation("Localisation actuelle");
    // For demo purposes, simulate search results
    setSearchResults(mockPharmacies);
    setSearchPerformed(true);
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
            
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((pharmacy) => (
                  <div key={pharmacy.id} className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{pharmacy.name}</h3>
                        <p className="text-sm text-gray-500">{pharmacy.address}</p>
                        <div className="mt-2 flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${pharmacy.medicationAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <p className="text-sm">
                            {pharmacy.medicationAvailable 
                              ? 'Médicament disponible' 
                              : 'Médicament non disponible'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-pharma-primary">{pharmacy.distance}</span>
                        <p className="text-xs text-gray-500 mt-1">{pharmacy.openingHours}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Appeler
                      </Button>
                      <Button variant="outline" size="sm">
                        Itinéraire
                      </Button>
                      <Button variant="default" size="sm" className="bg-pharma-primary hover:bg-pharma-primary/90">
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                ))}
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
