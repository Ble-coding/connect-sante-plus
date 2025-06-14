
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Pill, Search, Plus, Eye, AlertTriangle } from 'lucide-react';

const PharmacyMedicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const medications = [
    {
      id: 1,
      name: "Paracétamol 500mg",
      brand: "Doliprane",
      category: "Antalgique",
      form: "Comprimé",
      dosage: "500mg",
      prescription: false,
      price: 2.50,
      manufacturer: "Sanofi",
      barcode: "3400930000000",
      interactions: ["Warfarine", "Alcool"],
      contraindications: ["Insuffisance hépatique"],
      sideEffects: ["Nausées", "Éruptions cutanées"]
    },
    {
      id: 2,
      name: "Amoxicilline 1g",
      brand: "Clamoxyl",
      category: "Antibiotique",
      form: "Gélule",
      dosage: "1g",
      prescription: true,
      price: 8.90,
      manufacturer: "GSK",
      barcode: "3400930000001",
      interactions: ["Méthotrexate", "Warfarine"],
      contraindications: ["Allergie pénicilline"],
      sideEffects: ["Diarrhée", "Nausées", "Éruptions"]
    },
    {
      id: 3,
      name: "Ibuprofène 200mg",
      brand: "Advil",
      category: "Anti-inflammatoire",
      form: "Comprimé",
      dosage: "200mg",
      prescription: false,
      price: 3.20,
      manufacturer: "Pfizer",
      barcode: "3400930000002",
      interactions: ["Warfarine", "Lithium"],
      contraindications: ["Ulcère gastrique", "Grossesse"],
      sideEffects: ["Maux d'estomac", "Vertiges"]
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Médicaments</h1>
            <p className="text-gray-600">Base de données des médicaments</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter médicament
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Médicaments</CardTitle>
            <Pill className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
            <p className="text-xs text-muted-foreground">Références actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sur ordonnance</CardTitle>
            <Pill className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,856</div>
            <p className="text-xs text-muted-foreground">Prescription requise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automédication</CardTitle>
            <Pill className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,391</div>
            <p className="text-xs text-muted-foreground">Vente libre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouvelles références</CardTitle>
            <Pill className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Catalogue Médicaments</CardTitle>
              <CardDescription>Base de données complète des médicaments</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un médicament..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-pharma-primary/10 flex items-center justify-center">
                      <Pill className="h-5 w-5 text-pharma-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{med.name}</h3>
                      <p className="text-sm text-gray-600">{med.brand} • {med.manufacturer}</p>
                    </div>
                    <Badge variant="outline">{med.category}</Badge>
                    <Badge className={med.prescription ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {med.prescription ? 'Prescription' : 'Vente libre'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{med.price.toFixed(2)}€</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Forme</p>
                    <p className="font-medium">{med.form}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Dosage</p>
                    <p className="font-medium">{med.dosage}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Code-barres</p>
                    <p className="font-medium">{med.barcode}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fabricant</p>
                    <p className="font-medium">{med.manufacturer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Interactions
                    </p>
                    <div className="mt-1">
                      {med.interactions.map((interaction, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                          {interaction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Contre-indications
                    </p>
                    <div className="mt-1">
                      {med.contraindications.map((contra, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs bg-red-50">
                          {contra}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Effets secondaires</p>
                    <div className="mt-1">
                      {med.sideEffects.map((effect, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs bg-yellow-50">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyMedicationsPage;
