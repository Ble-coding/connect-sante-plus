
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Package, Search, Plus, AlertTriangle, Edit, Trash2 } from 'lucide-react';

const PharmacyInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const medications = [
    {
      id: 1,
      name: "Paracétamol 500mg",
      category: "Antalgique",
      stock: 45,
      minStock: 50,
      price: "2.50€",
      expiry: "2025-08-15",
      supplier: "Laboratoire ABC"
    },
    {
      id: 2,
      name: "Ibuprofène 200mg",
      category: "Anti-inflammatoire",
      stock: 8,
      minStock: 30,
      price: "3.20€",
      expiry: "2025-06-20",
      supplier: "PharmaCorp"
    },
    {
      id: 3,
      name: "Amoxicilline 1g",
      category: "Antibiotique",
      stock: 22,
      minStock: 40,
      price: "8.90€",
      expiry: "2025-12-10",
      supplier: "MediLab"
    },
    {
      id: 4,
      name: "Doliprane 1000mg",
      category: "Antalgique",
      stock: 120,
      minStock: 25,
      price: "4.10€",
      expiry: "2026-01-30",
      supplier: "Laboratoire ABC"
    }
  ];

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock * 0.5) return { status: 'critical', color: 'bg-red-100 text-red-800' };
    if (stock <= minStock) return { status: 'low', color: 'bg-orange-100 text-orange-800' };
    return { status: 'normal', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Stock & Inventaire</h1>
            <p className="text-gray-600">Gestion du stock de médicaments</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un médicament
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Médicaments</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Nécessitent réapprovisionnement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,230€</div>
            <p className="text-xs text-muted-foreground">Valeur totale du stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Péremption Proche</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Expire dans 30 jours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventaire des Médicaments</CardTitle>
              <CardDescription>Liste complète des médicaments en stock</CardDescription>
            </div>
            <div className="flex items-center gap-2">
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((med) => {
              const stockStatus = getStockStatus(med.stock, med.minStock);
              return (
                <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{med.name}</h3>
                      <Badge variant="outline">{med.category}</Badge>
                      <Badge className={stockStatus.color}>
                        {stockStatus.status === 'critical' ? 'Stock Critique' :
                         stockStatus.status === 'low' ? 'Stock Faible' : 'Stock Normal'}
                      </Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <span>Stock: {med.stock} unités</span>
                      <span>Prix: {med.price}</span>
                      <span>Expire: {med.expiry}</span>
                      <span>Fournisseur: {med.supplier}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyInventoryPage;
