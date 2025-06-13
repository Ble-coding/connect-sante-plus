
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin, Plus, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Marie Diallo",
      specialty: "Médecin généraliste",
      date: "15 Juin 2024",
      time: "14:30",
      type: "Consultation",
      location: "Cabinet médical - 123 Rue de la Santé",
      status: "confirmé"
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Kone",
      specialty: "Cardiologue",
      date: "20 Juin 2024",
      time: "10:00",
      type: "Téléconsultation",
      location: "En ligne",
      status: "confirmé"
    },
    {
      id: 3,
      doctor: "Dr. Sophie Martin",
      specialty: "Dermatologue",
      date: "25 Juin 2024",
      time: "16:00",
      type: "Consultation",
      location: "Clinique dermatologique",
      status: "en_attente"
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      doctor: "Dr. Marie Diallo",
      specialty: "Médecin généraliste",
      date: "10 Juin 2024",
      time: "14:30",
      type: "Consultation",
      location: "Cabinet médical",
      status: "terminé"
    },
    {
      id: 5,
      doctor: "Dr. Paul Dubois",
      specialty: "Ophtalmologue",
      date: "5 Juin 2024",
      time: "09:15",
      type: "Consultation",
      location: "Centre ophtalmologique",
      status: "terminé"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmé': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'terminé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Téléconsultation' ? Video : MapPin;
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Mes rendez-vous</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau RDV
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un médecin, spécialité..."
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

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">À venir ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="past">Passés ({pastAppointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.map((appointment) => {
              const TypeIcon = getTypeIcon(appointment.type);
              return (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <TypeIcon className="h-4 w-4" />
                            {appointment.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button size="sm">
                          {appointment.type === 'Téléconsultation' ? 'Rejoindre' : 'Détails'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastAppointments.map((appointment) => {
              const TypeIcon = getTypeIcon(appointment.type);
              return (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <TypeIcon className="h-4 w-4" />
                            {appointment.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                        <Button variant="outline" size="sm">
                          Reprendre RDV
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
