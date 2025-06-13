
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar, User, Pill, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const activePrescriptions = [
    {
      id: 1,
      doctor: "Dr. Marie Diallo",
      date: "10 Juin 2024",
      medications: [
        { name: "Paracétamol", dosage: "500mg", frequency: "3x/jour", duration: "7 jours" },
        { name: "Amoxicilline", dosage: "250mg", frequency: "2x/jour", duration: "10 jours" },
        { name: "Vitamine D", dosage: "1000 UI", frequency: "1x/jour", duration: "30 jours" }
      ],
      status: "active",
      validUntil: "10 Juillet 2024"
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Kone",
      date: "5 Juin 2024",
      medications: [
        { name: "Aspirine", dosage: "100mg", frequency: "1x/jour", duration: "continue" },
        { name: "Atorvastatine", dosage: "20mg", frequency: "1x/soir", duration: "continue" }
      ],
      status: "active",
      validUntil: "5 Juillet 2024"
    }
  ];

  const completedPrescriptions = [
    {
      id: 3,
      doctor: "Dr. Sophie Martin",
      date: "25 Mai 2024",
      medications: [
        { name: "Cortisone", dosage: "10mg", frequency: "1x/jour", duration: "5 jours" },
        { name: "Antihistaminique", dosage: "10mg", frequency: "1x/soir", duration: "7 jours" }
      ],
      status: "terminée",
      validUntil: "25 Juin 2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'terminée': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Mes ordonnances</h1>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par médecin, médicament..."
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

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Actives ({activePrescriptions.length})</TabsTrigger>
            <TabsTrigger value="completed">Terminées ({completedPrescriptions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activePrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Ordonnance du {prescription.date}
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <User className="h-4 w-4" />
                        {prescription.doctor}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      Valable jusqu'au: {prescription.validUntil}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Pill className="h-4 w-4" />
                        Médicaments ({prescription.medications.length})
                      </h4>
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                          <div>
                            <div className="font-medium">{med.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {med.dosage} • {med.frequency} • {med.duration}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Trouver en pharmacie
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedPrescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Ordonnance du {prescription.date}
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <User className="h-4 w-4" />
                        {prescription.doctor}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Pill className="h-4 w-4" />
                        Médicaments ({prescription.medications.length})
                      </h4>
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">{med.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {med.dosage} • {med.frequency} • {med.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
