
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ShoppingCart, Plus, Eye, CheckCircle, Clock, X } from 'lucide-react';

const PharmacyOrdersPage = () => {
  const orders = [
    {
      id: "ORD-001",
      customer: "Marie Dupont",
      items: [
        { name: "Paracétamol 500mg", quantity: 2, price: 5.00 },
        { name: "Vitamine D", quantity: 1, price: 12.50 }
      ],
      total: 17.50,
      status: "completed",
      time: "10:30",
      date: "2024-12-14"
    },
    {
      id: "ORD-002",
      customer: "Jean Martin",
      items: [
        { name: "Ibuprofène 200mg", quantity: 1, price: 3.20 },
        { name: "Sirop toux", quantity: 1, price: 8.90 }
      ],
      total: 12.10,
      status: "pending",
      time: "11:15",
      date: "2024-12-14"
    },
    {
      id: "ORD-003",
      customer: "Sophie Rousseau",
      items: [
        { name: "Amoxicilline 1g", quantity: 1, price: 8.90 },
        { name: "Paracétamol 500mg", quantity: 3, price: 7.50 }
      ],
      total: 16.40,
      status: "processing",
      time: "11:45",
      date: "2024-12-14"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <X className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-pharma-primary">Commandes</h1>
            <p className="text-gray-600">Gestion des commandes clients</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle commande
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes du jour</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+5% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247€</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commandes Récentes</CardTitle>
          <CardDescription>Liste des dernières commandes clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">
                        {order.status === 'completed' ? 'Terminé' :
                         order.status === 'processing' ? 'En cours' : 'En attente'}
                      </span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    {order.status === 'pending' && (
                      <Button size="sm">
                        Traiter
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Client</p>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Heure</p>
                    <p className="font-medium">{order.time} - {order.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total</p>
                    <p className="font-medium text-lg">{order.total.toFixed(2)}€</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-gray-600 text-sm mb-2">Articles commandés:</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                        <span>{item.name} x{item.quantity}</span>
                        <span>{item.price.toFixed(2)}€</span>
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

export default PharmacyOrdersPage;
