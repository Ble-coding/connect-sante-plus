
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Stethoscope, Calendar, Award } from 'lucide-react';

export function AdminDoctorsPage() {
  const doctors = [
    { id: 1, name: "Dr. Marie Diallo", specialty: "Médecine générale", patients: 156, rating: 4.9, verified: true },
    { id: 2, name: "Dr. Ahmed Ben Ali", specialty: "Cardiologie", patients: 89, rating: 4.7, verified: false },
    { id: 3, name: "Dr. Fatou Sow", specialty: "Pédiatrie", patients: 234, rating: 4.8, verified: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion des médecins</h1>
        <p className="text-muted-foreground">
          Supervision et validation des médecins inscrits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">Médecins inscrits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">389</div>
            <p className="text-xs text-muted-foreground">Vérifiés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">67</div>
            <p className="text-xs text-muted-foreground">En attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <p className="text-xs text-muted-foreground">Consultations/mois</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  {doctor.name}
                </CardTitle>
                <div className="flex gap-2">
                  {doctor.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <Award className="w-3 h-3 mr-1" />
                      Vérifié
                    </Badge>
                  )}
                  <Badge variant="outline">{doctor.specialty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Patients suivis</p>
                  <p className="text-lg font-semibold">{doctor.patients}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Note moyenne</p>
                  <p className="text-lg font-semibold">{doctor.rating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
