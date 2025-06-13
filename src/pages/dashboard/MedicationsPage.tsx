
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, Clock, AlertCircle, CheckCircle, Plus, Search, Bell, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

export function MedicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const currentMedications = [
    {
      id: 1,
      name: "Paracétamol",
      dosage: "500mg",
      frequency: "3 fois par jour",
      nextDose: "14:00",
      lastTaken: "08:00",
      remainingDoses: 15,
      totalDoses: 21,
      startDate: "10 Juin 2024",
      endDate: "17 Juin 2024",
      reminders: true,
      status: "en_cours"
    },
    {
      id: 2,
      name: "Amoxicilline",
      dosage: "250mg",
      frequency: "2 fois par jour",
      nextDose: "20:00",
      lastTaken: "08:00",
      remainingDoses: 12,
      totalDoses: 20,
      startDate: "10 Juin 2024",
      endDate: "20 Juin 2024",
      reminders: true,
      status: "en_cours"
    },
    {
      id: 3,
      name: "Vitamine D",
      dosage: "1000 UI",
      frequency: "1 fois par jour",
      nextDose: "08:00",
      lastTaken: "hier 08:00",
      remainingDoses: 25,
      totalDoses: 30,
      startDate: "10 Juin 2024",
      endDate: "10 Juillet 2024",
      reminders: false,
      status: "en_retard"
    }
  ];

  const todaySchedule = [
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
      time: "08:00",
      taken: true
    },
    {
      id: 3,
      name: "Paracétamol",
      dosage: "500mg",
      time: "14:00",
      taken: false
    },
    {
      id: 4,
      name: "Vitamine D",
      dosage: "1000 UI",
      time: "08:00",
      taken: false,
      overdue: true
    },
    {
      id: 5,
      name: "Paracétamol",
      dosage: "500mg",
      time: "20:00",
      taken: false
    },
    {
      id: 6,
      name: "Amoxicilline",
      dosage: "250mg",
      time: "20:00",
      taken: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'bg-green-100 text-green-800';
      case 'en_retard': return 'bg-red-100 text-red-800';
      case 'terminé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours';
      case 'en_retard': return 'En retard';
      case 'terminé': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  const handleToggleReminder = (medicationId: number) => {
    console.log(`Toggle reminder for medication ${medicationId}`);
  };

  const handleMarkAsTaken = (scheduleId: number) => {
    console.log(`Mark dose ${scheduleId} as taken`);
  };

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
            <TabsTrigger value="current">Traitements actuels ({currentMedications.length})</TabsTrigger>
            <TabsTrigger value="schedule">Programme du jour</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {currentMedications.map((medication) => (
              <Card key={medication.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Pill className="h-5 w-5" />
                          {medication.name}
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
                          checked={medication.reminders}
                          onCheckedChange={() => handleToggleReminder(medication.id)}
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
                        <div className="text-muted-foreground">{medication.nextDose}</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Dernière prise</div>
                        <div className="text-muted-foreground">{medication.lastTaken}</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Période</div>
                        <div className="text-muted-foreground">
                          {medication.startDate} - {medication.endDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression du traitement</span>
                        <span>{medication.totalDoses - medication.remainingDoses}/{medication.totalDoses} prises</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: `${((medication.totalDoses - medication.remainingDoses) / medication.totalDoses) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        Historique
                      </Button>
                      <Button variant="outline" size="sm">
                        Arrêter le traitement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                <div className="space-y-3">
                  {todaySchedule.map((dose) => (
                    <div key={dose.id} className={`flex items-center justify-between p-3 rounded-lg border ${dose.overdue ? 'bg-red-50 border-red-200' : dose.taken ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {dose.taken ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : dose.overdue ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-400" />
                          )}
                          <div className="font-medium">{dose.time}</div>
                        </div>
                        <div>
                          <div className="font-medium">{dose.name}</div>
                          <div className="text-sm text-muted-foreground">{dose.dosage}</div>
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
                            <Button size="sm" onClick={() => handleMarkAsTaken(dose.id)}>
                              Marquer comme pris
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" onClick={() => handleMarkAsTaken(dose.id)}>
                            Marquer comme pris
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
