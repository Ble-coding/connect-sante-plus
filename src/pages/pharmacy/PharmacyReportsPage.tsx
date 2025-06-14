
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { BarChart3, Download, TrendingUp, Users, Package, Euro } from 'lucide-react';

const PharmacyReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const salesData = [
    { period: 'Janvier', sales: 25430, orders: 342, customers: 156 },
    { period: 'Février', sales: 28150, orders: 389, customers: 178 },
    { period: 'Mars', sales: 31250, orders: 425, customers: 195 },
    { period: 'Avril', sales: 29800, orders: 398, customers: 187 },
    { period: 'Mai', sales: 33200, orders: 456, customers: 210 },
    { period: 'Juin', sales: 35600, orders: 487, customers: 225 }
  ];

  const topMedications = [
    { name: 'Paracétamol 500mg', quantity: 1250, revenue: 3125 },
    { name: 'Ibuprofène 200mg', quantity: 890, revenue: 2848 },
    { name: 'Doliprane 1000mg', quantity: 750, revenue: 3075 },
    { name: 'Amoxicilline 1g', quantity: 320, revenue: 2848 },
    { name: 'Vitamine D', quantity: 280, revenue: 3500 }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Rapports</h1>
            <p className="text-gray-600">Analyses et statistiques de performance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <Euro className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35,600€</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients uniques</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">225</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.4%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.11€</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4.1%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Ventes</CardTitle>
            <CardDescription>Chiffre d'affaires mensuel sur 6 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{data.period}</p>
                    <p className="text-sm text-gray-600">{data.orders} commandes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{data.sales.toLocaleString()}€</p>
                    <p className="text-sm text-gray-600">{data.customers} clients</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Médicaments</CardTitle>
            <CardDescription>Médicaments les plus vendus ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMedications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-pharma-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-gray-600">{med.quantity} unités vendues</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{med.revenue.toLocaleString()}€</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rapport Financier</CardTitle>
            <CardDescription>Synthèse financière mensuelle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Chiffre d'affaires:</span>
              <span className="font-medium">35,600€</span>
            </div>
            <div className="flex justify-between">
              <span>Coût des marchandises:</span>
              <span className="font-medium">24,920€</span>
            </div>
            <div className="flex justify-between">
              <span>Marge brute:</span>
              <span className="font-medium">10,680€</span>
            </div>
            <div className="flex justify-between">
              <span>Frais opérationnels:</span>
              <span className="font-medium">7,200€</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Bénéfice net:</span>
              <span className="text-green-600">3,480€</span>
            </div>
            <Button className="w-full mt-4">
              <Download className="h-4 w-4 mr-2" />
              Télécharger rapport
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rapport Stock</CardTitle>
            <CardDescription>Analyse des stocks et rotations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Valeur totale stock:</span>
              <span className="font-medium">45,230€</span>
            </div>
            <div className="flex justify-between">
              <span>Rotation moyenne:</span>
              <span className="font-medium">4.2x/an</span>
            </div>
            <div className="flex justify-between">
              <span>Stock mort ({'>'}6 mois):</span>
              <span className="font-medium text-orange-600">2,340€</span>
            </div>
            <div className="flex justify-between">
              <span>Ruptures de stock:</span>
              <span className="font-medium text-red-600">23 articles</span>
            </div>
            <div className="flex justify-between">
              <span>Péremptions proches:</span>
              <span className="font-medium text-orange-600">8 articles</span>
            </div>
            <Button className="w-full mt-4">
              <Download className="h-4 w-4 mr-2" />
              Télécharger rapport
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rapport Clients</CardTitle>
            <CardDescription>Analyse de la clientèle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Clients totaux:</span>
              <span className="font-medium">892</span>
            </div>
            <div className="flex justify-between">
              <span>Clients actifs:</span>
              <span className="font-medium">743</span>
            </div>
            <div className="flex justify-between">
              <span>Nouveaux clients:</span>
              <span className="font-medium text-green-600">67</span>
            </div>
            <div className="flex justify-between">
              <span>Taux de rétention:</span>
              <span className="font-medium">83.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Satisfaction moyenne:</span>
              <span className="font-medium">4.6/5</span>
            </div>
            <Button className="w-full mt-4">
              <Download className="h-4 w-4 mr-2" />
              Télécharger rapport
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyReportsPage;
