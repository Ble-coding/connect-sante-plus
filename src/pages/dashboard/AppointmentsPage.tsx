
import React, { useState, useMemo } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin, Plus, Filter, Search, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentModal } from '@/components/appointments/AppointmentModal';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/lib/api/services';

interface Appointment {
  id: number;
  doctor: {
    id: number;
    first_name: string;
    last_name: string;
    doctor_profile?: {
      specialization: string;
    };
  };
  date: string;
  duration: number;
  reason: string;
  status: string;
  consultation?: {
    consultation_type: string;
  };
}

export function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Charger les rendez-vous depuis l'API
  const { data: appointmentsData, isLoading, refetch } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => appointmentService.getAll(),
  });

  const allAppointments: Appointment[] = appointmentsData?.data?.results || appointmentsData?.data || [];

  // Séparer les rendez-vous à venir et passés
  const { upcomingAppointments, pastAppointments } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = allAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return apt.status !== 'completed' && apt.status !== 'cancelled' && aptDate >= today;
    });

    const past = allAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return apt.status === 'completed' || apt.status === 'cancelled' || aptDate < today;
    });

    return { upcomingAppointments: upcoming, pastAppointments: past };
  }, [allAppointments]);

  const handleSaveAppointment = () => {
    refetch();
  };

  const handleCancel = async (id: number) => {
    try {
      await appointmentService.cancel(id);
      toast({
        title: "Rendez-vous annulé",
        description: "Le rendez-vous a été annulé avec succès.",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'annuler le rendez-vous.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getTypeIcon = (appointment: Appointment) => {
    return appointment.consultation?.consultation_type === 'teleconsultation' ? Video : MapPin;
  };

  const formatDoctorName = (doctor: any) => {
    if (!doctor) return 'Médecin';
    return `Dr. ${doctor.first_name} ${doctor.last_name}`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  // Filtrer les rendez-vous selon la recherche
  const filteredUpcoming = upcomingAppointments.filter(apt => {
    const doctorName = formatDoctorName(apt.doctor);
    const specialty = apt.doctor?.doctor_profile?.specialization || '';
    return (
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredPast = pastAppointments.filter(apt => {
    const doctorName = formatDoctorName(apt.doctor);
    const specialty = apt.doctor?.doctor_profile?.specialization || '';
    return (
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-full">
          <p>Chargement des rendez-vous...</p>
        </div>
      </SidebarInset>
    );
  }

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
            {filteredUpcoming.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Aucun rendez-vous à venir
                </CardContent>
              </Card>
            ) : (
              filteredUpcoming.map((appointment) => {
                const TypeIcon = getTypeIcon(appointment);
                const { date, time } = formatDateTime(appointment.date);
                const doctorName = formatDoctorName(appointment.doctor);
                const specialty = appointment.doctor?.doctor_profile?.specialization || '';
                const isTeleconsultation = appointment.consultation?.consultation_type === 'teleconsultation';
                
                return (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{doctorName}</h3>
                            <Badge className={getStatusColor(appointment.status)}>
                              {getStatusLabel(appointment.status)}
                            </Badge>
                          </div>
                          {specialty && <p className="text-sm text-muted-foreground">{specialty}</p>}
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {time}
                            </div>
                            <div className="flex items-center gap-1">
                              <TypeIcon className="h-4 w-4" />
                              {isTeleconsultation ? 'Téléconsultation' : 'Consultation'}
                            </div>
                          </div>
                          {appointment.reason && (
                            <p className="text-sm text-muted-foreground">Raison: {appointment.reason}</p>
                          )}
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
                          {appointment.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCancel(appointment.id)}
                            >
                              Annuler
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {filteredPast.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Aucun rendez-vous passé
                </CardContent>
              </Card>
            ) : (
              filteredPast.map((appointment) => {
                const TypeIcon = getTypeIcon(appointment);
                const { date, time } = formatDateTime(appointment.date);
                const doctorName = formatDoctorName(appointment.doctor);
                const specialty = appointment.doctor?.doctor_profile?.specialization || '';
                
                return (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{doctorName}</h3>
                            <Badge className={getStatusColor(appointment.status)}>
                              {getStatusLabel(appointment.status)}
                            </Badge>
                          </div>
                          {specialty && <p className="text-sm text-muted-foreground">{specialty}</p>}
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {time}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            toast({
                              title: "Détails",
                              description: `Rendez-vous avec ${doctorName} le ${date} à ${time}`,
                            });
                          }}>
                            Voir détails
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
