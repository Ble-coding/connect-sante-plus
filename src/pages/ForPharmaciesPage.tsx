
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  Clock, 
  Bell, 
  BarChart3, 
  Smartphone,
  Store,
  TrendingUp,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ForPharmaciesPage = () => {
  const features = [
    {
      icon: Package,
      title: 'Gestion de stock en temps réel',
      description: 'Mettez à jour automatiquement vos stocks et informez les patients de la disponibilité.'
    },
    {
      icon: MapPin,
      title: 'Visibilité géolocalisée',
      description: 'Apparaissez dans les recherches de patients à proximité selon vos horaires d\'ouverture.'
    },
    {
      icon: Bell,
      title: 'Notifications d\'ordonnances',
      description: 'Recevez instantanément les prescriptions des médecins partenaires.'
    },
    {
      icon: Clock,
      title: 'Gestion des horaires',
      description: 'Informez les patients de vos heures d\'ouverture et services de garde.'
    },
    {
      icon: BarChart3,
      title: 'Analyses de ventes',
      description: 'Suivez vos performances et identifiez les tendances de consommation.'
    },
    {
      icon: Smartphone,
      title: 'Interface mobile',
      description: 'Gérez votre pharmacie depuis n\'importe où avec notre app mobile.'
    }
  ];

  const advantages = [
    {
      title: 'Augmentez votre chiffre d\'affaires',
      description: 'Attirez de nouveaux clients grâce à votre visibilité accrue sur la plateforme.',
      icon: TrendingUp
    },
    {
      title: 'Optimisez votre gestion',
      description: 'Réduisez les ruptures de stock et améliorez la rotation de vos produits.',
      icon: Package
    },
    {
      title: 'Fidélisez vos patients',
      description: 'Offrez un service premium avec des notifications et un suivi personnalisé.',
      icon: Shield
    },
    {
      title: 'Gagnez du temps',
      description: 'Automatisez vos processus et concentrez-vous sur le conseil pharmaceutique.',
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pharma-light to-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="px-3 py-1 text-sm font-medium bg-white text-pharma-primary rounded-full inline-block mb-6">
                  Solutions pour pharmacies
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6">
                  Transformez votre pharmacie en hub de santé connecté
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Modernisez votre officine, augmentez votre visibilité et offrez 
                  un service exceptionnel à vos patients grâce à nos outils numériques.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90">
                      Rejoindre le réseau
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="border-pharma-primary text-pharma-primary">
                    Demander une démo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://img.freepik.com/free-vector/pharmacy-concept-illustration_114360-8292.jpg" 
                  alt="Pharmacie moderne avec PharmaConnect" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Outils de gestion moderne</h2>
              <p className="text-xl text-gray-600">
                Équipez votre pharmacie des technologies de demain pour un service optimal.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-pharma-light flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-pharma-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Les avantages pour votre officine</h2>
              <p className="text-xl text-gray-600">
                Découvrez comment PharmaConnect peut transformer votre activité pharmaceutique.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-lg bg-pharma-light flex items-center justify-center mr-6">
                      <advantage.icon className="h-6 w-6 text-pharma-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                      <p className="text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Des résultats concrets</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Les pharmacies partenaires constatent rapidement l'impact positif 
                  de PharmaConnect sur leur activité.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-pharma-primary mr-3"></div>
                    <span className="text-gray-600">Augmentation moyenne du CA : +25%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-pharma-primary mr-3"></div>
                    <span className="text-gray-600">Nouveaux clients par mois : +40</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-pharma-primary mr-3"></div>
                    <span className="text-gray-600">Réduction des ruptures de stock : -70%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-pharma-light p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pharma-primary mb-2">500+</div>
                  <div className="text-sm text-gray-600">Pharmacies partenaires</div>
                </div>
                <div className="bg-pharma-light p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pharma-primary mb-2">98%</div>
                  <div className="text-sm text-gray-600">Taux de satisfaction</div>
                </div>
                <div className="bg-pharma-light p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pharma-primary mb-2">24h</div>
                  <div className="text-sm text-gray-600">Support technique</div>
                </div>
                <div className="bg-pharma-light p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-pharma-primary mb-2">0€</div>
                  <div className="text-sm text-gray-600">Frais d'installation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-pharma-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <Store className="h-16 w-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">
                Faites partie du réseau PharmaConnect
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez dès aujourd'hui les pharmacies qui transforment l'accès aux médicaments en Afrique de l'Ouest.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                  Inscrire ma pharmacie
                  <Package className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForPharmaciesPage;
