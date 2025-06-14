
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Package,
  ShoppingCart,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';

export function PharmacyDashboardContent() {
  const stats = [
    {
      title: "Stock total",
      value: "2,847",
      change: "+12%",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Commandes du jour",
      value: "47",
      change: "+5%",
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Ordonnances traitées",
      value: "156",
      change: "+8%",
      icon: FileText,
      color: "text-purple-600"
    },
    {
      title: "Clients actifs",
      value: "892",
      change: "+15%",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const lowStockMedications = [
    { name: "Paracétamol 500mg", stock: 15, minimum: 50, urgency: "high" },
    { name: "Ibuprofène 200mg", stock: 8, minimum: 30, urgency: "critical" },
    { name: "Amoxicilline 1g", stock: 22, minimum: 40, urgency: "medium" },
    { name: "Doliprane 1000mg", stock: 5, minimum: 25, urgency: "critical" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Marie Dupont", items: 3, total: "45.60€", status: "completed", time: "10:30" },
    { id: "ORD-002", customer: "Jean Martin", items: 2, total: "28.40€", status: "pending", time: "11:15" },
    { id: "ORD-003", customer: "Sophie Rousseau", items: 5, total: "67.80€", status: "processing", time: "11:45" },
    { id: "ORD-004", customer: "Pierre Moreau", items: 1, total: "12.30€", status: "completed", time: "12:20" },
  ];

  const todayPrescriptions = [
    { id: "PRES-101", doctor: "Dr. Leblanc", patient: "Anne Petit", medications: 3, status: "ready", time: "09:00" },
    { id: "PRES-102", doctor: "Dr. Durand", patient: "Paul Garnier", medications: 2, status: "preparing", time: "10:30" },
    { id: "PRES-103", doctor: "Dr. Moreno", patient: "Claire Roux", medications: 4, status: "pending", time: "11:00" },
    { id: "PRES-104", doctor: "Dr. Simon", patient: "Luc Blanc", medications: 1, status: "ready", time: "13:30" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Tableau de bord Pharmacie</h1>
            <p className="text-gray-600">Pharmacie du Centre - {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle commande
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Rapports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> depuis hier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Stock Faible */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Alertes Stock
                </CardTitle>
                <CardDescription>Médicaments nécessitant un réapprovisionnement</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockMedications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-gray-600">Stock: {med.stock} / Min: {med.minimum}</p>
                  </div>
                  <Badge className={getUrgencyColor(med.urgency)}>
                    {med.urgency === 'critical' ? 'Critique' : 
                     med.urgency === 'high' ? 'Urgent' : 'Moyen'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commandes récentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-500" />
                  Commandes Récentes
                </CardTitle>
                <CardDescription>Dernières transactions de la journée</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-600">
                      {order.items} articles • {order.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status === 'completed' ? 'Terminé' :
                       order.status === 'processing' ? 'En cours' : 'En attente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ordonnances du jour */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Ordonnances du Jour
              </CardTitle>
              <CardDescription>Prescriptions reçues et à traiter aujourd'hui</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle ordonnance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayPrescriptions.map((prescription, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{prescription.patient}</p>
                  <p className="text-sm text-gray-600">
                    Prescrit par {prescription.doctor}
                  </p>
                  <p className="text-sm text-gray-500">
                    {prescription.medications} médicaments • {prescription.time}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(prescription.status)}>
                    {prescription.status === 'ready' ? 'Prêt' :
                     prescription.status === 'preparing' ? 'Préparation' : 'En attente'}
                  </Badge>
                  <div className="mt-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="h-6 w-6" />
              Gérer Stock
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              Traiter Ordonnance
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              Gérer Clients
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              Voir Rapports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
