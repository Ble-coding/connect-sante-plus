
import React, { useState, useMemo } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar, User, Pill, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { prescriptionService } from '@/lib/api/services';

export function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: activeData, isLoading: isLoadingActive } = useQuery({
    queryKey: ['prescriptions', 'active'],
    queryFn: () => prescriptionService.getActive(),
  });

  const { data: completedData, isLoading: isLoadingCompleted } = useQuery({
    queryKey: ['prescriptions', 'completed'],
    queryFn: () => prescriptionService.getCompleted(),
  });

  const activePrescriptions = activeData?.data?.results || activeData?.data || [];
  const completedPrescriptions = completedData?.data?.results || completedData?.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const formatDoctorName = (doctor: any) => {
    if (!doctor) return 'Médecin';
    return `Dr. ${doctor.first_name} ${doctor.last_name}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Filtrer les ordonnances selon la recherche
  const filteredActive = useMemo(() => {
    return activePrescriptions.filter((prescription: any) => {
      const doctorName = formatDoctorName(prescription.doctor);
      const medicationNames = prescription.medications?.map((m: any) => m.medication?.name || '').join(' ') || '';
      const search = searchTerm.toLowerCase();
      return (
        doctorName.toLowerCase().includes(search) ||
        medicationNames.toLowerCase().includes(search)
      );
    });
  }, [activePrescriptions, searchTerm]);

  const filteredCompleted = useMemo(() => {
    return completedPrescriptions.filter((prescription: any) => {
      const doctorName = formatDoctorName(prescription.doctor);
      const medicationNames = prescription.medications?.map((m: any) => m.medication?.name || '').join(' ') || '';
      const search = searchTerm.toLowerCase();
      return (
        doctorName.toLowerCase().includes(search) ||
        medicationNames.toLowerCase().includes(search)
      );
    });
  }, [completedPrescriptions, searchTerm]);

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
            <TabsTrigger value="active">
              Actives ({filteredActive.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Terminées ({filteredCompleted.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {isLoadingActive ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>Chargement des ordonnances...</p>
                </CardContent>
              </Card>
            ) : filteredActive.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Aucune ordonnance active
                </CardContent>
              </Card>
            ) : (
              filteredActive.map((prescription: any) => (
                <Card key={prescription.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Ordonnance du {formatDate(prescription.issue_date)}
                          <Badge className={getStatusColor(prescription.status)}>
                            {getStatusLabel(prescription.status)}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <User className="h-4 w-4" />
                          {formatDoctorName(prescription.doctor)}
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
                        Valable jusqu'au: {formatDate(prescription.valid_until)}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <Pill className="h-4 w-4" />
                          Médicaments ({prescription.medications?.length || 0})
                        </h4>
                        {prescription.medications?.map((med: any, index: number) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                            <div>
                              <div className="font-medium">{med.medication?.name || med.name}</div>
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
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {isLoadingCompleted ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>Chargement des ordonnances...</p>
                </CardContent>
              </Card>
            ) : filteredCompleted.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Aucune ordonnance terminée
                </CardContent>
              </Card>
            ) : (
              filteredCompleted.map((prescription: any) => (
                <Card key={prescription.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Ordonnance du {formatDate(prescription.issue_date)}
                          <Badge className={getStatusColor(prescription.status)}>
                            {getStatusLabel(prescription.status)}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <User className="h-4 w-4" />
                          {formatDoctorName(prescription.doctor)}
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
                          Médicaments ({prescription.medications?.length || 0})
                        </h4>
                        {prescription.medications?.map((med: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <div className="font-medium">{med.medication?.name || med.name}</div>
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
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}
