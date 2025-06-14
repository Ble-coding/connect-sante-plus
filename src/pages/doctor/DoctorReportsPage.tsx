
import React, { useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, 
  Download, 
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Filter,
  Eye
} from 'lucide-react';

export function DoctorReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reportData = {
    consultations: {
      total: 156,
      thisMonth: 42,
      increase: 12,
      byType: {
        consultation: 34,
        téléconsultation: 8
      }
    },
    patients: {
      total: 247,
      new: 8,
      active: 198,
      inactive: 49
    },
    prescriptions: {
      total: 128,
      thisMonth: 35,
      avgMedications: 2.4
    },
    revenue: {
      total: 15680,
      thisMonth: 4200,
      increase: 8.5
    }
  };

  const topDiagnoses = [
    { name: 'Hypertension artérielle', count: 45, percentage: 18.2 },
    { name: 'Diabète type 2', count: 32, percentage: 13.0 },
    { name: 'Asthme', count: 28, percentage: 11.3 },
    { name: 'Arthrose', count: 25, percentage: 10.1 },
    { name: 'Migraine', count: 22, percentage: 8.9 },
    { name: 'Hypercholestérolémie', count: 18, percentage: 7.3 },
    { name: 'Anxiété', count: 15, percentage: 6.1 },
    { name: 'Autres', count: 62, percentage: 25.1 }
  ];

  const monthlyStats = [
    { month: 'Jan', consultations: 38, patients: 45, revenue: 3800 },
    { month: 'Fév', consultations: 42, patients: 48, revenue: 4200 },
    { month: 'Mar', consultations: 35, patients: 41, revenue: 3500 },
    { month: 'Avr', consultations: 48, patients: 52, revenue: 4800 },
    { month: 'Mai', consultations: 45, patients: 49, revenue: 4500 },
    { month: 'Juin', consultations: 42, patients: 47, revenue: 4200 }
  ];

  const prescriptionStats = [
    { category: 'Antihypertenseurs', count: 45, percentage: 35.2 },
    { category: 'Antidiabétiques', count: 32, percentage: 25.0 },
    { category: 'Bronchodilatateurs', count: 28, percentage: 21.9 },
    { category: 'Antalgiques', count: 23, percentage: 18.0 }
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-lg font-semibold">Rapports et statistiques</h1>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="month"
            value="2024-06"
            className="w-40"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-6">
        {/* Main Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.consultations.thisMonth}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{reportData.consultations.increase}%</span> vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nouveaux patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.patients.new}</div>
              <p className="text-xs text-muted-foreground">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ordonnances</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.prescriptions.thisMonth}</div>
              <p className="text-xs text-muted-foreground">
                {reportData.prescriptions.avgMedications} médicaments/ordonnance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.revenue.thisMonth}€</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{reportData.revenue.increase}%</span> vs mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Top Diagnoses */}
          <Card>
            <CardHeader>
              <CardTitle>Top diagnostics</CardTitle>
              <CardDescription>
                Diagnostics les plus fréquents cette période
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topDiagnoses.map((diagnosis, index) => (
                  <div key={diagnosis.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{diagnosis.name}</div>
                        <div className="text-xs text-muted-foreground">{diagnosis.count} cas</div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {diagnosis.percentage}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prescription Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions par catégorie</CardTitle>
              <CardDescription>
                Répartition des médicaments prescrits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptionStats.map((stat) => (
                  <div key={stat.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{stat.category}</span>
                      <span className="text-muted-foreground">{stat.count} prescriptions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      {stat.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution mensuelle</CardTitle>
            <CardDescription>
              Consultations, patients et chiffre d'affaires par mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground">
                <div>Mois</div>
                <div>Consultations</div>
                <div>Nouveaux patients</div>
                <div>Chiffre d'affaires</div>
                <div>Évolution</div>
                <div>Actions</div>
              </div>
              {monthlyStats.map((stat, index) => (
                <div key={stat.month} className="grid grid-cols-6 gap-4 items-center py-2 border-b">
                  <div className="font-medium">{stat.month} 2024</div>
                  <div>{stat.consultations}</div>
                  <div>{stat.patients}</div>
                  <div>{stat.revenue}€</div>
                  <div>
                    {index > 0 && (
                      <Badge variant={
                        stat.consultations > monthlyStats[index - 1].consultations 
                          ? "default" 
                          : "secondary"
                      }>
                        {stat.consultations > monthlyStats[index - 1].consultations ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                        )}
                        {Math.abs(((stat.consultations - monthlyStats[index - 1].consultations) / monthlyStats[index - 1].consultations * 100)).toFixed(1)}%
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Rapports prédéfinis</CardTitle>
            <CardDescription>
              Générez rapidement des rapports personnalisés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">Rapport mensuel</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">Analyse patients</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Prescriptions</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
