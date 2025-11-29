
import React, { useState, useEffect, useMemo } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin, Plus, Filter, Search, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentModal } from '@/components/appointments/AppointmentModal';
import { useToast } from '@/components/ui/use-toast';

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  location: string;
  status: string;
}

export function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Charger les rendez-vous depuis localStorage
  const loadAppointments = () => {
    const saved = localStorage.getItem('pharmafriconnect_appointments');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        doctor: "Dr. Marie Diallo",
        specialty: "Médecin généraliste",
        date: "2024-06-15",
        time: "14:30",
        type: "Consultation",
        location: "Cabinet médical - 123 Rue de la Santé",
        status: "confirmé"
      },
      {
        id: 2,
        doctor: "Dr. Ahmed Kone",
        specialty: "Cardiologue",
        date: "2024-06-20",
        time: "10:00",
        type: "Téléconsultation",
        location: "En ligne",
        status: "confirmé"
      },
      {
        id: 3,
        doctor: "Dr. Sophie Martin",
        specialty: "Dermatologue",
        date: "2024-06-25",
        time: "16:00",
        type: "Consultation",
        location: "Clinique dermatologique",
        status: "en_attente"
      },
      {
        id: 4,
        doctor: "Dr. Marie Diallo",
        specialty: "Médecin généraliste",
        date: "2024-06-10",
        time: "14:30",
        type: "Consultation",
        location: "Cabinet médical",
        status: "terminé"
      },
      {
        id: 5,
        doctor: "Dr. Paul Dubois",
        specialty: "Ophtalmologue",
        date: "2024-06-05",
        time: "09:15",
        type: "Consultation",
        location: "Centre ophtalmologique",
        status: "terminé"
      }
    ];
  };

  const [allAppointments, setAllAppointments] = useState<Appointment[]>(loadAppointments());

  // Séparer les rendez-vous à venir et passés (recalculé à chaque changement)
  const { upcomingAppointments, pastAppointments } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = allAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return apt.status !== 'terminé' && aptDate >= today;
    });

    const past = allAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return apt.status === 'terminé' || aptDate < today;
    });

    return { upcomingAppointments: upcoming, pastAppointments: past };
  }, [allAppointments]);

  const handleSaveAppointment = (appointment: Appointment) => {
    // Recharger les rendez-vous depuis localStorage
    const updated = loadAppointments();
    setAllAppointments(updated);
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };
  
  // Recharger les rendez-vous quand le composant se monte ou quand localStorage change
  useEffect(() => {
    const handleAppointmentsUpdate = () => {
      setAllAppointments(loadAppointments());
    };
    
    // Écouter l'événement personnalisé
    window.addEventListener('appointments-updated', handleAppointmentsUpdate);
    
    // Écouter les changements dans localStorage (pour les autres onglets)
    window.addEventListener('storage', handleAppointmentsUpdate);
    
    return () => {
      window.removeEventListener('appointments-updated', handleAppointmentsUpdate);
      window.removeEventListener('storage', handleAppointmentsUpdate);
    };
  }, []);

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const updated = allAppointments.filter(apt => apt.id !== id);
    setAllAppointments(updated);
    localStorage.setItem('pharmafriconnect_appointments', JSON.stringify(updated));
    toast({
      title: "Rendez-vous supprimé",
      description: "Le rendez-vous a été supprimé avec succès.",
    });
  };

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

  // Filtrer les rendez-vous selon la recherche
  const filteredUpcoming = upcomingAppointments.filter(apt =>
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPast = pastAppointments.filter(apt =>
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Mes rendez-vous</h1>
        </div>
        <AppointmentModal
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau RDV
            </Button>
          }
          onSave={handleSaveAppointment}
        />
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
            <TabsTrigger value="upcoming">À venir ({filteredUpcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Passés ({filteredPast.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {filteredUpcoming.map((appointment) => {
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
                            {new Date(appointment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                        <AppointmentModal
                          trigger={
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </Button>
                          }
                          appointment={appointment}
                          onSave={handleSaveAppointment}
                        />
                        <Button size="sm" onClick={() => {
                          if (appointment.type === 'Téléconsultation') {
                            toast({
                              title: "Téléconsultation",
                              description: "Fonctionnalité de téléconsultation en développement",
                            });
                          } else {
                            toast({
                              title: "Détails",
                              description: `Rendez-vous avec ${appointment.doctor} le ${new Date(appointment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à ${appointment.time}`,
                            });
                          }
                        }}>
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
            {filteredPast.map((appointment) => {
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
                            {new Date(appointment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Détails",
                            description: `Rendez-vous avec ${appointment.doctor} le ${appointment.date} à ${appointment.time}`,
                          });
                        }}>
                          Voir détails
                        </Button>
                        <AppointmentModal
                          trigger={
                            <Button variant="outline" size="sm">
                              Reprendre RDV
                            </Button>
                          }
                          appointment={{...appointment, status: 'en_attente'}}
                          onSave={handleSaveAppointment}
                        />
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
