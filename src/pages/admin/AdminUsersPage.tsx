
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal, Ban, CheckCircle, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: "Jean Dupont", email: "jean@email.com", type: "Patient", status: "Actif", joinDate: "2024-01-15", lastActive: "2024-01-20" },
    { id: 2, name: "Dr. Marie Diallo", email: "marie@clinic.com", type: "Médecin", status: "Actif", joinDate: "2024-01-10", lastActive: "2024-01-20" },
    { id: 3, name: "Pharmacie du Centre", email: "contact@pharmacie-centre.com", type: "Pharmacie", status: "Suspendu", joinDate: "2024-01-05", lastActive: "2024-01-18" },
    { id: 4, name: "Pierre Martin", email: "pierre@email.com", type: "Patient", status: "Actif", joinDate: "2024-01-12", lastActive: "2024-01-19" },
    { id: 5, name: "Dr. Ahmed Ben Ali", email: "ahmed@clinic.com", type: "Médecin", status: "En attente", joinDate: "2024-01-18", lastActive: "2024-01-20" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Actif':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Actif</Badge>;
      case 'Suspendu':
        return <Badge variant="destructive"><Ban className="w-3 h-3 mr-1" />Suspendu</Badge>;
      case 'En attente':
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Patient': 'bg-blue-100 text-blue-800',
      'Médecin': 'bg-purple-100 text-purple-800',
      'Pharmacie': 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez tous les utilisateurs de la plateforme
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12,547</div>
            <p className="text-xs text-muted-foreground">Total utilisateurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">8,432</div>
            <p className="text-xs text-muted-foreground">Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">456</div>
            <p className="text-xs text-muted-foreground">Médecins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">1,234</div>
            <p className="text-xs text-muted-foreground">Pharmacies</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>
            Recherchez et gérez les comptes utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>

          {/* Tableau des utilisateurs */}
          <div className="border rounded-lg">
            <div className="grid grid-cols-7 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
              <div>Nom</div>
              <div>Email</div>
              <div>Type</div>
              <div>Statut</div>
              <div>Inscription</div>
              <div>Dernière activité</div>
              <div>Actions</div>
            </div>
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-gray-50">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div>{getTypeBadge(user.type)}</div>
                <div>{getStatusBadge(user.status)}</div>
                <div className="text-sm text-gray-600">{user.joinDate}</div>
                <div className="text-sm text-gray-600">{user.lastActive}</div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Suspendre</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
