
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Users, Search, Plus, Eye, Phone, Mail } from 'lucide-react';

const PharmacyCustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: "Marie Dupont",
      email: "marie.dupont@email.com",
      phone: "06 12 34 56 78",
      address: "123 Rue de la Paix, 75001 Paris",
      lastVisit: "2024-12-14",
      totalOrders: 25,
      totalSpent: 456.78,
      loyaltyPoints: 1200,
      status: "active"
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@email.com", 
      phone: "06 98 76 54 32",
      address: "456 Avenue des Champs, 75008 Paris",
      lastVisit: "2024-12-13",
      totalOrders: 42,
      totalSpent: 892.45,
      loyaltyPoints: 2100,
      status: "active"
    },
    {
      id: 3,
      name: "Sophie Rousseau",
      email: "sophie.rousseau@email.com",
      phone: "06 55 44 33 22",
      address: "789 Boulevard Saint-Germain, 75006 Paris",
      lastVisit: "2024-12-10",
      totalOrders: 18,
      totalSpent: 324.56,
      loyaltyPoints: 890,
      status: "active"
    },
    {
      id: 4,
      name: "Pierre Moreau",
      email: "pierre.moreau@email.com",
      phone: "06 77 88 99 00",
      address: "321 Rue de Rivoli, 75004 Paris",
      lastVisit: "2024-11-28",
      totalOrders: 8,
      totalSpent: 156.32,
      loyaltyPoints: 350,
      status: "inactive"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Clients</h1>
            <p className="text-gray-600">Gestion de la clientèle</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+15% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">743</div>
            <p className="text-xs text-muted-foreground">Visite récente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux ce mois</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">+12% vs mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fidélité moyenne</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">Points de fidélité</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Base Clients</CardTitle>
              <CardDescription>Liste de tous les clients enregistrés</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-pharma-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-pharma-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Profil
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Téléphone</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Dernière visite</p>
                    <p className="font-medium">{customer.lastVisit}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total dépensé</p>
                    <p className="font-medium">{customer.totalSpent.toFixed(2)}€</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Points fidélité</p>
                    <p className="font-medium">{customer.loyaltyPoints} pts</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-gray-600 text-sm">Adresse</p>
                  <p className="font-medium">{customer.address}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyCustomersPage;
