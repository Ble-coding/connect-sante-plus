
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Search, 
  Plus, 
  Eye,
  Download,
  Send,
  User,
  Calendar,
  Pill,
  Filter
} from 'lucide-react';

export function DoctorPrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const prescriptions = [
    {
      id: 1,
      patient: "Jean Dupont",
      date: "2024-06-14 09:15",
      medications: [
        { name: "Amlodipine 5mg", dosage: "1 cp/jour", duration: "30 jours" },
        { name: "Metformine 850mg", dosage: "2 cp/jour", duration: "30 jours" },
        { name: "Ramipril 2.5mg", dosage: "1 cp/jour", duration: "30 jours" }
      ],
      status: "active",
      diagnosis: "Hypertension, Diabète type 2",
      pharmacy: "Pharmacie Saint-Michel",
      deliveryStatus: "délivrée"
    },
    {
      id: 2,
      patient: "Marie Martin",
      date: "2024-06-13 16:30",
      medications: [
        { name: "Salbutamol 100µg", dosage: "2 bouffées si besoin", duration: "1 mois" },
        { name: "Beclometasone 250µg", dosage: "2 bouffées 2x/jour", duration: "1 mois" }
      ],
      status: "active",
      diagnosis: "Asthme",
      pharmacy: "Pharmacie de la République",
      deliveryStatus: "en_attente"
    },
    {
      id: 3,
      patient: "Pierre Durand",
      date: "2024-06-12 14:45",
      medications: [
        { name: "Paracétamol 1g", dosage: "1 cp 3x/jour", duration: "7 jours" },
        { name: "Ibuprofène 400mg", dosage: "1 cp 2x/jour", duration: "5 jours" }
      ],
      status: "terminée",
      diagnosis: "Arthrose",
      pharmacy: "Pharmacie du Centre",
      deliveryStatus: "délivrée"
    },
    {
      id: 4,
      patient: "Sophie Leroy",
      date: "2024-06-14 15:45",
      medications: [
        { name: "Sumatriptan 50mg", dosage: "1 cp si crise", duration: "10 jours" },
        { name: "Propranolol 40mg", dosage: "1 cp 2x/jour", duration: "30 jours" }
      ],
      status: "active",
      diagnosis: "Migraine",
      pharmacy: "Pharmacie Victor Hugo",
      deliveryStatus: "en_préparation"
    },
    {
      id: 5,
      patient: "Antoine Bernard",
      date: "2024-06-10 11:20",
      medications: [
        { name: "Atorvastatine 20mg", dosage: "1 cp/jour le soir", duration: "30 jours" },
        { name: "Aspirine 75mg", dosage: "1 cp/jour", duration: "30 jours" }
      ],
      status: "active",
      diagnosis: "Hypercholestérolémie",
      pharmacy: "Pharmacie de la Paix",
      deliveryStatus: "délivrée"
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medications.some(med => 
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'terminée': return 'bg-gray-100 text-gray-800';
      case 'annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'délivrée': return 'bg-green-100 text-green-800';
      case 'en_préparation': return 'bg-blue-100 text-blue-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'non_délivrée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const totalMedications = prescriptions.reduce((sum, p) => sum + p.medications.length, 0);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Ordonnances</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle ordonnance
        </Button>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ordonnances actives</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activePrescriptions.length}</div>
              <p className="text-xs text-muted-foreground">
                En cours de traitement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {prescriptions.filter(p => 
                  new Date(p.date).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Ordonnances émises
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Médicaments prescrits</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMedications}</div>
              <p className="text-xs text-muted-foreground">
                Au total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de délivrance</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((prescriptions.filter(p => p.deliveryStatus === 'délivrée').length / prescriptions.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Ordonnances délivrées
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Prescriptions List */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des ordonnances</CardTitle>
            <CardDescription>
              Gérez et suivez vos prescriptions médicales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par patient, diagnostic ou médicament..."
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
                  <TableHead>Date</TableHead>
                  <TableHead>Diagnostic</TableHead>
                  <TableHead>Médicaments</TableHead>
                  <TableHead>Pharmacie</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Délivrance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div className="font-medium">{prescription.patient}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(prescription.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(prescription.date).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{prescription.diagnosis}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {prescription.medications.slice(0, 2).map((med, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium">{med.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {med.dosage} • {med.duration}
                            </div>
                          </div>
                        ))}
                        {prescription.medications.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{prescription.medications.length - 2} autre(s)
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{prescription.pharmacy}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDeliveryStatusColor(prescription.deliveryStatus)}>
                        {prescription.deliveryStatus.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Envoyer
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
