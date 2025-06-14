
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Calendar, 
  FileText,
  Phone,
  Mail,
  MapPin,
  Filter
} from 'lucide-react';

export function DoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 1,
      name: "Jean Dupont",
      age: 45,
      gender: "M",
      phone: "0123456789",
      email: "jean.dupont@email.com",
      address: "123 Rue de la Santé, Paris",
      lastVisit: "2024-06-10",
      status: "actif",
      conditions: ["Hypertension", "Diabète type 2"],
      nextAppointment: "2024-06-20 14:00"
    },
    {
      id: 2,
      name: "Marie Martin",
      age: 32,
      gender: "F",
      phone: "0123456790",
      email: "marie.martin@email.com",
      address: "456 Avenue de la République, Lyon",
      lastVisit: "2024-06-12",
      status: "actif",
      conditions: ["Asthme"],
      nextAppointment: "2024-06-18 10:30"
    },
    {
      id: 3,
      name: "Pierre Durand",
      age: 58,
      gender: "M",
      phone: "0123456791",
      email: "pierre.durand@email.com",
      address: "789 Boulevard Saint-Germain, Marseille",
      lastVisit: "2024-06-08",
      status: "inactif",
      conditions: ["Arthrose", "Cholestérol"],
      nextAppointment: null
    },
    {
      id: 4,
      name: "Sophie Leroy",
      age: 28,
      gender: "F",
      phone: "0123456792",
      email: "sophie.leroy@email.com",
      address: "321 Rue Victor Hugo, Toulouse",
      lastVisit: "2024-06-13",
      status: "actif",
      conditions: ["Migraine"],
      nextAppointment: "2024-06-15 16:00"
    },
    {
      id: 5,
      name: "Antoine Bernard",
      age: 67,
      gender: "M",
      phone: "0123456793",
      email: "antoine.bernard@email.com",
      address: "654 Place de la Liberté, Nice",
      lastVisit: "2024-06-05",
      status: "actif",
      conditions: ["Hypertension", "Insuffisance cardiaque"],
      nextAppointment: "2024-06-22 09:00"
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'inactif': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Mes patients</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau patient
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {patients.filter(p => p.status === 'actif').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((patients.filter(p => p.status === 'actif').length / patients.length) * 100)}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RDV programmés</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {patients.filter(p => p.nextAppointment).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Âge moyen</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)} ans
              </div>
              <p className="text-xs text-muted-foreground">
                De vos patients
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des patients</CardTitle>
            <CardDescription>
              Gérez vos patients et consultez leurs informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, email ou condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Dernière visite</TableHead>
                  <TableHead>Prochain RDV</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {patient.age} ans • {patient.gender === 'M' ? 'Homme' : 'Femme'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {patient.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(patient.lastVisit).toLocaleDateString('fr-FR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.nextAppointment ? (
                        <div className="text-sm">
                          {new Date(patient.nextAppointment).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(patient.nextAppointment).toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Aucun</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          RDV
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Dossier
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
