
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Video
} from 'lucide-react';

export function DoctorSchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const scheduleData = {
    workingHours: { start: '08:00', end: '18:00' },
    lunchBreak: { start: '12:00', end: '14:00' },
    timeSlots: [
      { time: '08:00', duration: 30 },
      { time: '08:30', duration: 30 },
      { time: '09:00', duration: 30 },
      { time: '09:30', duration: 30 },
      { time: '10:00', duration: 30 },
      { time: '10:30', duration: 30 },
      { time: '11:00', duration: 30 },
      { time: '11:30', duration: 30 },
      { time: '14:00', duration: 30 },
      { time: '14:30', duration: 30 },
      { time: '15:00', duration: 30 },
      { time: '15:30', duration: 30 },
      { time: '16:00', duration: 30 },
      { time: '16:30', duration: 30 },
      { time: '17:00', duration: 30 },
      { time: '17:30', duration: 30 }
    ]
  };

  const appointments = [
    {
      day: 1, // Lundi
      time: '09:00',
      patient: 'Jean Dupont',
      type: 'consultation',
      duration: 30,
      reason: 'Contrôle hypertension'
    },
    {
      day: 1,
      time: '10:30',
      patient: 'Marie Martin',
      type: 'téléconsultation',
      duration: 20,
      reason: 'Suivi asthme'
    },
    {
      day: 2, // Mardi
      time: '14:00',
      patient: 'Pierre Durand',
      type: 'consultation',
      duration: 45,
      reason: 'Première consultation'
    },
    {
      day: 2,
      time: '15:30',
      patient: 'Sophie Leroy',
      type: 'consultation',
      duration: 30,
      reason: 'Migraine'
    },
    {
      day: 3, // Mercredi
      time: '09:00',
      patient: 'Antoine Bernard',
      type: 'consultation',
      duration: 30,
      reason: 'Contrôle cardiaque'
    },
    {
      day: 4, // Jeudi
      time: '11:00',
      patient: 'Claire Petit',
      type: 'téléconsultation',
      duration: 25,
      reason: 'Résultats analyses'
    },
    {
      day: 5, // Vendredi
      time: '16:00',
      patient: 'Michel Rousseau',
      type: 'consultation',
      duration: 30,
      reason: 'Vaccination'
    }
  ];

  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  
  const getWeekDates = (startDate: Date) => {
    const dates = [];
    const monday = new Date(startDate);
    monday.setDate(startDate.getDate() - startDate.getDay() + 1);
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const getAppointmentForSlot = (day: number, time: string) => {
    return appointments.find(apt => apt.day === day && apt.time === time);
  };

  const isLunchTime = (time: string) => {
    return time >= '12:00' && time < '14:00';
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Planning</h1>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau créneau
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Rendez-vous programmés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heures travaillées</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32h</div>
              <p className="text-xs text-muted-foreground">
                Sur 40h prévues
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                Créneaux occupés
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
                {Math.round((appointments.filter(apt => apt.type === 'téléconsultation').length / appointments.length) * 100)}% du total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Planning hebdomadaire</CardTitle>
                <CardDescription>
                  Visualisez et gérez votre planning de la semaine
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {weekDates[0].toLocaleDateString('fr-FR')} - {weekDates[4].toLocaleDateString('fr-FR')}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {/* Header */}
              <div className="p-2 text-sm font-medium text-center">Heure</div>
              {weekDays.map((day, index) => (
                <div key={day} className="p-2 text-sm font-medium text-center">
                  <div>{day}</div>
                  <div className="text-xs text-muted-foreground">
                    {weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}
                  </div>
                </div>
              ))}

              {/* Time slots */}
              {scheduleData.timeSlots.map((slot) => (
                <React.Fragment key={slot.time}>
                  <div className="p-2 text-sm text-center border-r">
                    {slot.time}
                  </div>
                  {[1, 2, 3, 4, 5].map((dayIndex) => {
                    const appointment = getAppointmentForSlot(dayIndex, slot.time);
                    const isLunch = isLunchTime(slot.time);
                    
                    return (
                      <div
                        key={`${dayIndex}-${slot.time}`}
                        className={`p-1 min-h-[60px] border border-gray-200 ${
                          isLunch ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        {isLunch ? (
                          <div className="text-xs text-gray-500 text-center">
                            Pause déjeuner
                          </div>
                        ) : appointment ? (
                          <div className={`p-2 rounded text-xs ${
                            appointment.type === 'téléconsultation' 
                              ? 'bg-blue-100 border-blue-300' 
                              : 'bg-green-100 border-green-300'
                          }`}>
                            <div className="flex items-center gap-1 mb-1">
                              {appointment.type === 'téléconsultation' ? (
                                <Video className="h-3 w-3" />
                              ) : (
                                <User className="h-3 w-3" />
                              )}
                              <span className="font-medium">{appointment.patient}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {appointment.reason}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {appointment.duration} min
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-gray-400 h-auto p-1"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Gérez votre planning rapidement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2">
                <Plus className="h-5 w-5" />
                <span className="text-xs">Bloquer créneaux</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">Congés</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-xs">Horaires</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Configuration</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
