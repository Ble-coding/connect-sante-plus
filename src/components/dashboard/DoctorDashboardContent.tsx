
import React from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  Users, 
  Clock,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  Video,
  Plus,
  TrendingUp
} from 'lucide-react';
import { TeleconsultationModal } from '@/components/doctor/TeleconsultationModal';
import { NewPatientModal } from '@/components/doctor/NewPatientModal';

export function DoctorDashboardContent() {
  const todayAppointments = [
    {
      id: 1,
      patient: "Jean Dupont",
      time: "09:00",
      type: "Consultation",
      status: "confirmé",
      duration: "30 min"
    },
    {
      id: 2,
      patient: "Marie Martin",
      time: "10:30",
      type: "Téléconsultation",
      status: "confirmé",
      duration: "20 min"
    },
    {
      id: 3,
      patient: "Pierre Durand",
      time: "14:00",
      type: "Consultation",
      status: "en_attente",
      duration: "45 min"
    },
    {
      id: 4,
      patient: "Sophie Leroy",
      time: "15:30",
      type: "Consultation",
      status: "confirmé",
      duration: "30 min"
    }
  ];

  const recentPrescriptions = [
    {
      id: 1,
      patient: "Jean Dupont",
      date: "Aujourd'hui 09:15",
      medications: 3,
      status: "active"
    },
    {
      id: 2,
      patient: "Marie Martin",
      date: "Hier 16:30",
      medications: 2,
      status: "active"
    },
    {
      id: 3,
      patient: "Paul Moreau",
      date: "13 Juin 2024",
      medications: 1,
      status: "terminée"
    }
  ];

  const patientAlerts = [
    {
      id: 1,
      patient: "Marie Rousseau",
      type: "urgence",
      message: "Allergie médicamenteuse signalée",
      time: "Il y a 2h"
    },
    {
      id: 2,
      patient: "Antoine Bernard",
      type: "suivi",
      message: "Résultats d'analyses disponibles",
      time: "Il y a 4h"
    },
    {
      id: 3,
      patient: "Claire Petit",
      type: "rappel",
      message: "Rendez-vous de contrôle à programmer",
      time: "Il y a 1 jour"
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

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgence': return 'border-l-red-500 bg-red-50';
      case 'suivi': return 'border-l-blue-500 bg-blue-50';
      case 'rappel': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handlePatientAdded = (newPatient: any) => {
    console.log('Nouveau patient ajouté:', newPatient);
    // Ici on pourrait mettre à jour la liste des patients ou afficher une notification
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Tableau de bord médecin</h1>
        </div>
        <div className="flex gap-2">
          <TeleconsultationModal
            trigger={
              <Button variant="outline">
                <Video className="h-4 w-4 mr-2" />
                Téléconsultation
              </Button>
            }
          />
          <NewPatientModal
            trigger={
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau patient
              </Button>
            }
            onPatientAdded={handlePatientAdded}
          />
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Welcome Section */}
        <div className="grid gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bonjour Dr. Diallo ! 👩‍⚕️</h2>
            <p className="text-muted-foreground">
              Voici un aperçu de votre journée et de vos patients.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                RDV aujourd'hui
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Prochain à 09:00
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patients actifs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                +12 ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ordonnances cette semaine
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                +15% vs semaine dernière
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Téléconsultations
              </CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                60% du total des consultations
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rendez-vous du jour
              </CardTitle>
              <CardDescription>
                Vos consultations d'aujourd'hui
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{appointment.patient}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {appointment.time} - {appointment.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={appointment.type === "Téléconsultation" ? "secondary" : "default"} className="text-xs">
                        {appointment.type}
                      </Badge>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {appointment.type === "Téléconsultation" && (
                      <TeleconsultationModal
                        trigger={
                          <Button size="sm" variant="outline">
                            <Video className="h-3 w-3 mr-1" />
                            Démarrer
                          </Button>
                        }
                        patient={{
                          name: appointment.patient,
                          age: 35,
                          reason: "Consultation de suivi",
                          scheduledTime: appointment.time
                        }}
                      />
                    )}
                    <Button size="sm" variant="outline">
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                Voir tout le planning
              </Button>
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Ordonnances récentes
              </CardTitle>
              <CardDescription>
                Dernières prescriptions émises
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{prescription.patient}</p>
                    <p className="text-xs text-muted-foreground">{prescription.date}</p>
                    <p className="text-xs">{prescription.medications} médicaments</p>
                  </div>
                  <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                    {prescription.status === "active" ? "Active" : "Terminée"}
                  </Badge>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                Voir toutes les ordonnances
              </Button>
            </CardContent>
          </Card>

          {/* Patient Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Alertes patients
              </CardTitle>
              <CardDescription>
                Notifications importantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {patientAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 border-l-4 rounded-lg ${getAlertColor(alert.type)}`}>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{alert.patient}</p>
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                Voir toutes les alertes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Raccourcis vers les actions fréquentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button className="h-20 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">Nouveau RDV</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Ordonnance</span>
              </Button>
              <NewPatientModal
                trigger={
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Nouveau patient</span>
                  </Button>
                }
                onPatientAdded={handlePatientAdded}
              />
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Stethoscope className="h-5 w-5" />
                <span className="text-xs">Consultation</span>
              </Button>
              <TeleconsultationModal
                trigger={
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Video className="h-5 w-5" />
                    <span className="text-xs">Téléconsultation</span>
                  </Button>
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
