
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  Pill, 
  MapPin, 
  Plus,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { AppointmentModal } from '@/components/appointments/AppointmentModal';

export function DashboardContent() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Utilisateur');

  // Charger le nom de l'utilisateur depuis la session
  useEffect(() => {
    const session = localStorage.getItem('pharmaconnect_user_session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        if (sessionData.firstName) {
          setUserName(sessionData.firstName);
        }
      } catch (e) {
        console.error('Erreur lors du chargement de la session:', e);
      }
    }
  }, []);
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Marie Diallo",
      specialty: "Médecin généraliste",
      date: "15 Juin 2024",
      time: "14:30",
      type: "Consultation"
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Kone",
      specialty: "Cardiologue", 
      date: "20 Juin 2024",
      time: "10:00",
      type: "Téléconsultation"
    }
  ];

  const recentPrescriptions = [
    {
      id: 1,
      doctor: "Dr. Marie Diallo",
      date: "10 Juin 2024",
      medications: 3,
      status: "active"
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Kone",
      date: "5 Juin 2024", 
      medications: 2,
      status: "completed"
    }
  ];

  const medicationReminders = [
    {
      id: 1,
      name: "Paracétamol",
      dosage: "500mg",
      time: "08:00",
      taken: true
    },
    {
      id: 2,
      name: "Amoxicilline",
      dosage: "250mg", 
      time: "14:00",
      taken: false
    },
    {
      id: 3,
      name: "Vitamine D",
      dosage: "1000 UI",
      time: "20:00",
      taken: false
    }
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Tableau de bord patient</h1>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Welcome Section */}
        <div className="grid gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bonjour {userName} ! 👋</h2>
            <p className="text-muted-foreground">
              Voici un aperçu de votre santé aujourd'hui.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prochain RDV
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 Juin</div>
              <p className="text-xs text-muted-foreground">
                Dr. Marie Diallo à 14:30
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ordonnances actives
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                5 médicaments au total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Médicaments aujourd'hui
              </CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                1 pris, 2 à prendre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pharmacies proches
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Dans un rayon de 5km
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Prochains rendez-vous
              </CardTitle>
              <CardDescription>
                Vos consultations à venir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{appointment.doctor}</p>
                    <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3" />
                      {appointment.date} à {appointment.time}
                    </div>
                  </div>
                  <Badge variant={appointment.type === "Téléconsultation" ? "secondary" : "default"}>
                    {appointment.type}
                  </Badge>
                </div>
              ))}
              <AppointmentModal
                trigger={
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Prendre un rendez-vous
                  </Button>
                }
                onSave={() => window.location.reload()}
              />
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
                Vos dernières prescriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{prescription.doctor}</p>
                    <p className="text-xs text-muted-foreground">{prescription.date}</p>
                    <p className="text-xs">{prescription.medications} médicaments</p>
                  </div>
                  <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                    {prescription.status === "active" ? "Active" : "Terminée"}
                  </Badge>
                </div>
              ))}
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate('/dashboard/prescriptions')}
              >
                Voir toutes les ordonnances
              </Button>
            </CardContent>
          </Card>

          {/* Medication Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Rappels médicaments
              </CardTitle>
              <CardDescription>
                Vos prises d'aujourd'hui
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {medicationReminders.map((medication) => (
                <div key={medication.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{medication.name}</p>
                    <p className="text-xs text-muted-foreground">{medication.dosage}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {medication.time}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {medication.taken ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate('/dashboard/medications')}
              >
                Gérer mes médicaments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
