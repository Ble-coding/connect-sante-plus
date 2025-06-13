
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Calendar, FileText, User, Download, Eye, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const medicalHistory = [
    {
      id: 1,
      type: "consultation",
      title: "Consultation généraliste",
      doctor: "Dr. Marie Diallo",
      date: "10 Juin 2024",
      description: "Contrôle de routine, tension artérielle normale",
      documents: ["Compte-rendu.pdf", "Ordonnance.pdf"],
      tags: ["routine", "tension"]
    },
    {
      id: 2,
      type: "examen",
      title: "Bilan sanguin",
      doctor: "Laboratoire Biolab",
      date: "5 Juin 2024",
      description: "Bilan complet : cholestérol, glycémie, NFS",
      documents: ["Resultats_bilan.pdf"],
      tags: ["bilan", "sang"]
    },
    {
      id: 3,
      type: "consultation",
      title: "Consultation cardiologie",
      doctor: "Dr. Ahmed Kone",
      date: "1 Juin 2024",
      description: "ECG normal, prescription traitement préventif",
      documents: ["ECG.pdf", "Ordonnance.pdf"],
      tags: ["cardiologie", "ecg"]
    },
    {
      id: 4,
      type: "vaccination",
      title: "Rappel vaccin tétanos",
      doctor: "Dr. Marie Diallo",
      date: "25 Mai 2024",
      description: "Vaccination de rappel tétanos-diphtérie",
      documents: ["Certificat_vaccination.pdf"],
      tags: ["vaccin", "rappel"]
    },
    {
      id: 5,
      type: "urgence",
      title: "Consultation urgences",
      doctor: "Urgences CHU",
      date: "15 Mai 2024",
      description: "Chute, contrôle radiologique, aucune fracture",
      documents: ["Radio_poignet.pdf", "Compte_rendu_urgences.pdf"],
      tags: ["urgences", "radiologie"]
    }
  ];

  const vaccinations = [
    {
      id: 1,
      vaccine: "Tétanos-Diphtérie",
      date: "25 Mai 2024",
      nextDue: "25 Mai 2034",
      status: "à_jour"
    },
    {
      id: 2,
      vaccine: "Grippe saisonnière",
      date: "15 Octobre 2023",
      nextDue: "15 Octobre 2024",
      status: "bientôt_due"
    },
    {
      id: 3,
      vaccine: "COVID-19",
      date: "10 Septembre 2023",
      nextDue: "À définir",
      status: "à_jour"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return User;
      case 'examen': return FileText;
      case 'vaccination': return Calendar;
      case 'urgence': return History;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'examen': return 'bg-purple-100 text-purple-800';
      case 'vaccination': return 'bg-green-100 text-green-800';
      case 'urgence': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVaccineStatusColor = (status: string) => {
    switch (status) {
      case 'à_jour': return 'bg-green-100 text-green-800';
      case 'bientôt_due': return 'bg-yellow-100 text-yellow-800';
      case 'en_retard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Historique médical</h1>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exporter l'historique
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans l'historique..."
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

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Historique complet</TabsTrigger>
            <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {medicalHistory.map((entry) => {
              const TypeIcon = getTypeIcon(entry.type);
              return (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TypeIcon className="h-5 w-5" />
                            {entry.title}
                          </CardTitle>
                          <Badge className={getTypeColor(entry.type)}>
                            {entry.type}
                          </Badge>
                        </div>
                        <CardDescription>
                          {entry.doctor} • {entry.date}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{entry.description}</p>
                      
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {entry.documents.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Documents joints:</h5>
                          <div className="flex flex-wrap gap-2">
                            {entry.documents.map((doc, index) => (
                              <Button key={index} variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                {doc}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="vaccinations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Carnet de vaccination</CardTitle>
                <CardDescription>
                  Suivi de vos vaccinations et rappels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vaccinations.map((vaccine) => (
                    <div key={vaccine.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                      <div className="space-y-1">
                        <div className="font-medium">{vaccine.vaccine}</div>
                        <div className="text-sm text-muted-foreground">
                          Dernière dose: {vaccine.date}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Prochain rappel: {vaccine.nextDue}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getVaccineStatusColor(vaccine.status)}>
                          {vaccine.status === 'à_jour' ? 'À jour' : 
                           vaccine.status === 'bientôt_due' ? 'Bientôt dû' : 'En retard'}
                        </Badge>
                        {vaccine.status === 'bientôt_due' && (
                          <Button size="sm">
                            Prendre RDV
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
