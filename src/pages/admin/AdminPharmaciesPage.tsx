
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Clock, CheckCircle } from 'lucide-react';

export function AdminPharmaciesPage() {
  const pharmacies = [
    { id: 1, name: "Pharmacie du Centre", address: "123 Rue Principal, Dakar", status: "Actif", orders: 45, rating: 4.8 },
    { id: 2, name: "Pharmacie de l'Amitié", address: "456 Avenue Liberté, Dakar", status: "En attente", orders: 32, rating: 4.6 },
    { id: 3, name: "Grande Pharmacie", address: "789 Boulevard République, Thiès", status: "Actif", orders: 67, rating: 4.9 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion des pharmacies</h1>
        <p className="text-muted-foreground">
          Supervision et validation des pharmacies partenaires
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Pharmacies actives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">45</div>
            <p className="text-xs text-muted-foreground">En attente de validation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">Taux de satisfaction</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {pharmacies.map((pharmacy) => (
          <Card key={pharmacy.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {pharmacy.name}
                </CardTitle>
                <Badge variant={pharmacy.status === 'Actif' ? 'default' : 'secondary'}>
                  {pharmacy.status === 'Actif' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {pharmacy.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {pharmacy.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Commandes ce mois</p>
                  <p className="text-lg font-semibold">{pharmacy.orders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Note moyenne</p>
                  <p className="text-lg font-semibold">{pharmacy.rating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
