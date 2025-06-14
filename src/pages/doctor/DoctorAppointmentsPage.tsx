
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calendar, 
  Search, 
  Plus, 
  Clock,
  Video,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

export function DoctorAppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const appointments = [
    {
      id: 1,
      patient: "Jean Dupont",
      date: "2024-06-14",
      time: "09:00",
      duration: 30,
      type: "consultation",
      status: "confirmé",
      reason: "Contrôle hypertension",
      notes: "Patient régulier, bon suivi"
    },
    {
      id: 2,
      patient: "Marie Martin",
      date: "2024-06-14",
      time: "10:30",
      duration: 20,
      type: "téléconsultation",
      status: "confirmé",
      reason: "Suivi asthme",
      notes: "Téléconsultation de suivi"
    },
    {
      id: 3,
      patient: "Pierre Durand",
      date: "2024-06-14",
      time: "14:00",
      duration: 45,
      type: "consultation",
      status: "en_attente",
      reason: "Bilan arthrose",
      notes: "Première consultation"
    },
    {
      id: 4,
      patient: "Sophie Leroy",
      date: "2024-06-14",
      time: "15:30",
      duration: 30,
      type: "consultation",
      status: "confirmé",
      reason: "Migraine récurrente",
      notes: "Suivi migraine"
    },
    {
      id: 5,
      patient: "Antoine Bernard",
      date: "2024-06-15",
      time: "09:00",
      duration: 30,
      type: "consultation",
      status: "reporté",
      reason: "Contrôle cardiaque",
      notes: "Patient a reporté"
    },
    {
      id: 6,
      patient: "Claire Petit",
      date: "2024-06-15",
      time: "11:00",
      duration: 25,
      type: "téléconsultation",
      status: "terminé",
      reason: "Résultats analyses",
      notes: "Consultation terminée"
    }
  ];

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmé': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'terminé': return 'bg-blue-100 text-blue-800';
      case 'reporté': return 'bg-orange-100 text-orange-800';
      case 'annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmé': return <CheckCircle className="h-4 w-4" />;
      case 'en_attente': return <AlertCircle className="h-4 w-4" />;
      case 'reporté': return <Clock className="h-4 w-4" />;
      case 'annulé': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
  const upcomingAppointments = appointments.filter(apt => apt.date > new Date().toISOString().split('T')[0]);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Rendez-vous</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau RDV
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Rendez-vous prévus
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">À venir</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Prochains RDV
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Téléconsultations</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(apt => apt.type === 'téléconsultation').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle>Planning des rendez-vous</CardTitle>
            <CardDescription>
              Gérez vos rendez-vous et consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par patient ou motif..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{appointment.patient}</div>
                          <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(appointment.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {appointment.type === 'téléconsultation' ? (
                          <Video className="h-4 w-4 text-blue-600" />
                        ) : (
                          <User className="h-4 w-4 text-green-600" />
                        )}
                        <span className="capitalize">{appointment.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{appointment.reason}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{appointment.duration} min</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(appointment.status)}
                          {appointment.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Modifier
                        </Button>
                        {appointment.type === 'téléconsultation' && appointment.status === 'confirmé' && (
                          <Button size="sm">
                            <Video className="h-3 w-3 mr-1" />
                            Démarrer
                          </Button>
                        )}
                        {appointment.status === 'confirmé' && (
                          <Button size="sm" variant="outline">
                            Terminé
                          </Button>
                        )}
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
