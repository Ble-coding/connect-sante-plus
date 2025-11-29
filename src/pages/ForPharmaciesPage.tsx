
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  className="px-3 py-1 text-sm font-medium bg-white text-pharma-primary rounded-full inline-block mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Solutions pour pharmacies
                </motion.span>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Transformez votre pharmacie en hub de santé connecté
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Modernisez votre officine, augmentez votre visibilité et offrez 
                  un service exceptionnel à vos patients grâce à nos outils numériques.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link to="/register">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90">
                        Rejoindre le réseau
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="border-pharma-primary text-pharma-primary">
                      Demander une démo
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/pharmacie.webp" 
                    alt="Pharmacie moderne avec Pharma Africa Connect" 
                    className="rounded-lg w-full"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Outils de gestion moderne</h2>
              <p className="text-xl text-gray-600">
                Équipez votre pharmacie des technologies de demain pour un service optimal.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <motion.div 
                        className="h-12 w-12 rounded-lg bg-pharma-light flex items-center justify-center mb-4"
                        whileHover={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="h-6 w-6 text-pharma-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Les avantages pour votre officine</h2>
              <p className="text-xl text-gray-600">
                Découvrez comment Pharma Africa Connect peut transformer votre activité pharmaceutique.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-start">
                    <motion.div 
                      className="h-12 w-12 rounded-lg bg-pharma-light flex items-center justify-center mr-6"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <advantage.icon className="h-6 w-6 text-pharma-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                      <p className="text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">Des résultats concrets</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Les pharmacies partenaires constatent rapidement l'impact positif 
                  de Pharma Africa Connect sur leur activité.
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
              </motion.div>
              <motion.div 
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {[
                  { value: "500+", label: "Pharmacies partenaires" },
                  { value: "98%", label: "Taux de satisfaction" },
                  { value: "24h", label: "Support technique" },
                  { value: "0€", label: "Frais d'installation" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-pharma-light p-6 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className="text-3xl font-bold text-pharma-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-pharma-primary text-white relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Store className="h-16 w-16 mx-auto mb-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-6">
                Faites partie du réseau Pharma Africa Connect
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez dès aujourd'hui les pharmacies qui transforment l'accès aux médicaments en Afrique de l'Ouest.
              </p>
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                    Inscrire ma pharmacie
                    <Package className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForPharmaciesPage;
