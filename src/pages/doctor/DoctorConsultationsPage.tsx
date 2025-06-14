
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Stethoscope, 
  Search, 
  Plus, 
  Eye,
  Clock,
  Video,
  User,
  FileText,
  Calendar,
  Filter
} from 'lucide-react';

export function DoctorConsultationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const consultations = [
    {
      id: 1,
      patient: "Jean Dupont",
      date: "2024-06-14 09:00",
      duration: 30,
      type: "consultation",
      reason: "Contrôle hypertension",
      diagnosis: "Hypertension artérielle stable",
      treatment: "Poursuite du traitement actuel",
      nextAppointment: "2024-07-14",
      status: "terminée",
      notes: "Tension bien contrôlée. Patient observant. Continuer Amlodipine 5mg."
    },
    {
      id: 2,
      patient: "Marie Martin",
      date: "2024-06-13 16:30",
      duration: 20,
      type: "téléconsultation",
      reason: "Suivi asthme",
      diagnosis: "Asthme allergique stable",
      treatment: "Adaptation du traitement de fond",
      nextAppointment: "2024-07-13",
      status: "terminée",
      notes: "Amélioration des symptômes. Augmentation de la dose de corticoïdes inhalés."
    },
    {
      id: 3,
      patient: "Pierre Durand",
      date: "2024-06-14 14:00",
      duration: 45,
      type: "consultation",
      reason: "Première consultation - arthrose",
      diagnosis: "Gonarthrose bilatérale",
      treatment: "Traitement symptomatique",
      nextAppointment: "2024-07-14",
      status: "en_cours",
      notes: "Première consultation. Radiographies prescrites. Traitement antalgique."
    },
    {
      id: 4,
      patient: "Sophie Leroy",
      date: "2024-06-12 15:30",
      duration: 25,
      type: "consultation",
      reason: "Migraine récurrente",
      diagnosis: "Migraine sans aura",
      treatment: "Traitement prophylactique",
      nextAppointment: "2024-08-12",
      status: "terminée",
      notes: "Migraines fréquentes. Prescription de Propranolol en prophylaxie."
    },
    {
      id: 5,
      patient: "Antoine Bernard",
      date: "2024-06-10 11:00",
      duration: 35,
      type: "consultation",
      reason: "Contrôle cardiologique",
      diagnosis: "Insuffisance cardiaque stable",
      treatment: "Optimisation du traitement",
      nextAppointment: "2024-09-10",
      status: "terminée",
      notes: "Fonction cardiaque stable. Ajustement des doses d'IEC."
    }
  ];

  const filteredConsultations = consultations.filter(consultation =>
    consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'terminée': return 'bg-green-100 text-green-800';
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'programmée': return 'bg-yellow-100 text-yellow-800';
      case 'annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedConsultations = consultations.filter(c => c.status === 'terminée');
  const avgDuration = Math.round(consultations.reduce((sum, c) => sum + c.duration, 0) / consultations.length);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Consultations</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle consultation
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultations terminées</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedConsultations.length}</div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Durée moyenne</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgDuration} min</div>
              <p className="text-xs text-muted-foreground">
                Par consultation
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
                {consultations.filter(c => c.type === 'téléconsultation').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((consultations.filter(c => c.type === 'téléconsultation').length / consultations.length) * 100)}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suivi programmé</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consultations.filter(c => c.nextAppointment).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Prochains RDV planifiés
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Consultations List */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des consultations</CardTitle>
            <CardDescription>
              Consultez l'historique complet de vos consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par patient, motif ou diagnostic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Durée</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Diagnostic</TableHead>
                  <TableHead>Prochain RDV</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div className="font-medium">{consultation.patient}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">
                          {new Date(consultation.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(consultation.date).toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} • {consultation.duration} min
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {consultation.type === 'téléconsultation' ? (
                          <Video className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Stethoscope className="h-4 w-4 text-green-600" />
                        )}
                        <span className="capitalize text-sm">{consultation.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{consultation.reason}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-xs">
                        <div className="font-medium">{consultation.diagnosis}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {consultation.treatment}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {consultation.nextAppointment ? (
                        <div className="text-sm">
                          {new Date(consultation.nextAppointment).toLocaleDateString('fr-FR')}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Non programmé</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(consultation.status)}>
                        {consultation.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Détails
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Compte-rendu
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
