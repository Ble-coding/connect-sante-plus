
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { FileText, Plus, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const PharmacyPrescriptionsPage = () => {
  const prescriptions = [
    {
      id: "PRES-101",
      doctor: "Dr. Leblanc",
      patient: "Anne Petit",
      medications: [
        { name: "Amoxicilline 1g", dosage: "3x/jour pendant 7 jours", quantity: 21 },
        { name: "Paracétamol 500mg", dosage: "Si besoin", quantity: 20 }
      ],
      status: "ready",
      time: "09:00",
      date: "2024-12-14",
      urgent: false
    },
    {
      id: "PRES-102",
      doctor: "Dr. Durand",
      patient: "Paul Garnier",
      medications: [
        { name: "Insuline", dosage: "Selon protocole", quantity: 1 },
        { name: "Bandelettes test", dosage: "Usage quotidien", quantity: 50 }
      ],
      status: "preparing",
      time: "10:30",
      date: "2024-12-14",
      urgent: true
    },
    {
      id: "PRES-103",
      doctor: "Dr. Moreno",
      patient: "Claire Roux",
      medications: [
        { name: "Ibuprofène 200mg", dosage: "3x/jour", quantity: 30 },
        { name: "Oméprazole 20mg", dosage: "1x/jour à jeun", quantity: 28 }
      ],
      status: "pending",
      time: "11:00",
      date: "2024-12-14",
      urgent: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Ordonnances</h1>
            <p className="text-gray-600">Gestion des prescriptions médicales</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle ordonnance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordonnances du jour</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prêtes</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Priorité haute</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ordonnances à Traiter</CardTitle>
          <CardDescription>Prescriptions reçues et en cours de traitement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{prescription.id}</h3>
                    <Badge className={getStatusColor(prescription.status)}>
                      {prescription.status === 'ready' ? 'Prêt' :
                       prescription.status === 'preparing' ? 'Préparation' : 'En attente'}
                    </Badge>
                    {prescription.urgent && (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </Button>
                    {prescription.status === 'pending' && (
                      <Button size="sm">
                        Commencer préparation
                      </Button>
                    )}
                    {prescription.status === 'preparing' && (
                      <Button size="sm">
                        Marquer prêt
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Patient</p>
                    <p className="font-medium">{prescription.patient}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Médecin prescripteur</p>
                    <p className="font-medium">{prescription.doctor}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Reçue le</p>
                    <p className="font-medium">{prescription.time} - {prescription.date}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Médicaments prescrits:</p>
                  <div className="space-y-2">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-gray-600">{med.dosage}</p>
                          </div>
                          <span className="text-sm font-medium">Qté: {med.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyPrescriptionsPage;
