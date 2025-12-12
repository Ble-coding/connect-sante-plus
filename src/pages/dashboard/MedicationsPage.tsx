
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, Clock, AlertCircle, CheckCircle, Plus, Search, Bell, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientMedicationService } from '@/lib/api/services';
import { useToast } from '@/components/ui/use-toast';

export function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Charger les médicaments actifs depuis l'API
  const { data: medicationsData, isLoading } = useQuery({
    queryKey: ['patient-medications', 'active'],
    queryFn: () => patientMedicationService.getActive(),
  });

  // Charger le planning du jour
  const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ['patient-medications', 'today-schedule'],
    queryFn: () => patientMedicationService.getTodaySchedule(),
  });

  const currentMedications = medicationsData?.data?.results || medicationsData?.data || [];
  const todaySchedule = scheduleData?.data?.results || scheduleData?.data || [];

  // Mutation pour marquer une dose comme prise
  const markDoseMutation = useMutation({
    mutationFn: ({ medicationId, doseId }: { medicationId: number; doseId: number }) =>
      patientMedicationService.markDoseTaken(medicationId, doseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-medications'] });
      toast({
        title: "Dose enregistrée",
        description: "La prise de médicament a été enregistrée.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Impossible d'enregistrer la prise.",
        variant: "destructive",
      });
    },
  });

  // Mutation pour activer/désactiver les rappels
  const toggleRemindersMutation = useMutation({
    mutationFn: (id: number) => patientMedicationService.toggleReminders(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-medications'] });
    },
  });

  // Mutation pour arrêter un traitement
  const stopMedicationMutation = useMutation({
    mutationFn: (id: number) => patientMedicationService.stop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-medications'] });
      toast({
        title: "Traitement arrêté",
        description: "Le traitement a été arrêté.",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'overdue': return 'En retard';
      case 'completed': return 'Terminé';
      case 'stopped': return 'Arrêté';
      default: return 'Inconnu';
    }
  };

  const handleToggleReminder = (medicationId: number) => {
    toggleRemindersMutation.mutate(medicationId);
  };

  const handleMarkAsTaken = (medicationId: number, doseId: number) => {
    markDoseMutation.mutate({ medicationId, doseId });
  };

  const handleStopMedication = (medicationId: number) => {
    if (confirm('Êtes-vous sûr de vouloir arrêter ce traitement ?')) {
      stopMedicationMutation.mutate(medicationId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Filtrer les médicaments selon la recherche
  const filteredMedications = currentMedications.filter((med: any) =>
    med.medication?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.dosage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Mes médicaments</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un médicament
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un médicament..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">
              Traitements actuels ({filteredMedications.length})
            </TabsTrigger>
            <TabsTrigger value="schedule">Programme du jour</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>Chargement des médicaments...</p>
                </CardContent>
              </Card>
            ) : filteredMedications.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Aucun traitement en cours
                </CardContent>
              </Card>
            ) : (
              filteredMedications.map((medication: any) => {
                const medicationName = medication.medication?.name || medication.name;
                const progress = medication.total_doses > 0 
                  ? ((medication.total_doses - medication.remaining_doses) / medication.total_doses) * 100 
                  : 0;
                
                return (
                  <Card key={medication.id}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Pill className="h-5 w-5" />
                              {medicationName}
                            </CardTitle>
                            <Badge className={getStatusColor(medication.status)}>
                              {getStatusText(medication.status)}
                            </Badge>
                          </div>
                          <CardDescription>
                            {medication.dosage} • {medication.frequency}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            <span className="text-sm">Rappels</span>
                            <Switch
                              checked={medication.reminders_enabled}
                              onCheckedChange={() => handleToggleReminder(medication.id)}
                              disabled={toggleRemindersMutation.isPending}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-1">Prochaine prise</div>
                            <div className="text-muted-foreground">
                              {medication.next_dose_time ? formatTime(medication.next_dose_time) : 'N/A'}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">Dernière prise</div>
                            <div className="text-muted-foreground">
                              {medication.last_taken_at 
                                ? new Date(medication.last_taken_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                                : 'Aucune'}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">Période</div>
                            <div className="text-muted-foreground">
                              {formatDate(medication.start_date)}
                              {medication.end_date && ` - ${formatDate(medication.end_date)}`}
                            </div>
                          </div>
                        </div>
                        
                        {medication.total_doses > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progression du traitement</span>
                              <span>
                                {medication.total_doses - medication.remaining_doses}/{medication.total_doses} prises
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStopMedication(medication.id)}
                            disabled={stopMedicationMutation.isPending}
                          >
                            Arrêter le traitement
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Programme du jour - {new Date().toLocaleDateString('fr-FR')}
                </CardTitle>
                <CardDescription>
                  Vos prises de médicaments prévues aujourd'hui
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingSchedule ? (
                  <div className="text-center py-8">
                    <p>Chargement du planning...</p>
                  </div>
                ) : todaySchedule.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Aucune prise prévue aujourd'hui</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todaySchedule.map((dose: any) => {
                      const scheduledTime = new Date(dose.scheduled_time);
                      const medicationName = dose.patient_medication?.medication?.name || 'Médicament';
                      const dosage = dose.patient_medication?.dosage || '';
                      const medicationId = dose.patient_medication?.id;
                      
                      return (
                        <div 
                          key={dose.id} 
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            dose.overdue ? 'bg-red-50 border-red-200' : 
                            dose.taken ? 'bg-green-50 border-green-200' : 
                            'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {dose.taken ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : dose.overdue ? (
                                <AlertCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-gray-400" />
                              )}
                              <div className="font-medium">
                                {scheduledTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">{medicationName}</div>
                              <div className="text-sm text-muted-foreground">{dosage}</div>
                            </div>
                          </div>
                          <div>
                            {dose.taken ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Pris
                              </Badge>
                            ) : dose.overdue ? (
                              <div className="flex gap-2">
                                <Badge variant="destructive">En retard</Badge>
                                <Button 
                                  size="sm" 
                                  onClick={() => medicationId && handleMarkAsTaken(medicationId, dose.id)}
                                  disabled={markDoseMutation.isPending}
                                >
                                  Marquer comme pris
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => medicationId && handleMarkAsTaken(medicationId, dose.id)}
                                disabled={markDoseMutation.isPending}
                              >
                                Marquer comme pris
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
