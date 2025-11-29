
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileCheck, 
  TrendingUp, 
  Users, 
  Clock, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Building2,
  CreditCard,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ForInsurancesPage = () => {
  const features = [
    {
      icon: FileCheck,
      title: 'Gestion des remboursements',
      description: 'Automatisez le traitement des demandes de remboursement et réduisez les délais de traitement.'
    },
    {
      icon: Users,
      title: 'Suivi des assurés',
      description: 'Accédez à un tableau de bord complet pour suivre la santé de vos assurés en temps réel.'
    },
    {
      icon: Shield,
      title: 'Conformité réglementaire',
      description: 'Respectez toutes les normes de santé et d\'assurance avec notre système conforme.'
    },
    {
      icon: BarChart3,
      title: 'Analyses et rapports',
      description: 'Générez des rapports détaillés sur les coûts, l\'utilisation et les tendances de santé.'
    },
    {
      icon: Clock,
      title: 'Traitement rapide',
      description: 'Réduisez les temps de traitement des dossiers grâce à l\'automatisation intelligente.'
    },
    {
      icon: CreditCard,
      title: 'Intégration de paiement',
      description: 'Système de paiement sécurisé intégré pour les remboursements automatiques.'
    }
  ];

  const benefits = [
    {
      title: 'Réduction des coûts opérationnels',
      description: 'Automatisez vos processus et réduisez les coûts administratifs jusqu\'à 40%.',
      icon: TrendingUp
    },
    {
      title: 'Amélioration de la satisfaction client',
      description: 'Offrez un service plus rapide et transparent à vos assurés.',
      icon: Users
    },
    {
      title: 'Conformité garantie',
      description: 'Respectez automatiquement toutes les réglementations en vigueur.',
      icon: Shield
    },
    {
      title: 'Données en temps réel',
      description: 'Accédez à des données précises et à jour pour une meilleure prise de décision.',
      icon: BarChart3
    }
  ];

  const stats = [
    { value: "30%", label: "Réduction des coûts" },
    { value: "50%", label: "Temps de traitement" },
    { value: "95%", label: "Satisfaction assurés" },
    { value: "24/7", label: "Support disponible" }
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
                  Solutions pour assurances
                </motion.span>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Optimisez la gestion de vos assurés
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Simplifiez la gestion des remboursements, suivez la santé de vos assurés 
                  et réduisez vos coûts opérationnels avec notre plateforme dédiée.
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
                        Devenir partenaire
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
                    src="https://img.freepik.com/free-vector/health-insurance-concept-illustration_114360-1003.jpg" 
                    alt="Assurance santé avec Pharma Africa Connect" 
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
              <h2 className="text-3xl font-bold mb-6">Fonctionnalités dédiées aux assurances</h2>
              <p className="text-xl text-gray-600">
                Des outils puissants pour gérer efficacement vos assurés et leurs remboursements.
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

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Les avantages pour votre compagnie</h2>
              <p className="text-xl text-gray-600">
                Découvrez comment Pharma Africa Connect peut transformer votre gestion d'assurance.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
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
                      <benefit.icon className="h-6 w-6 text-pharma-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
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
                <h2 className="text-3xl font-bold mb-6">Résultats mesurables</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Les compagnies d'assurance partenaires constatent des améliorations significatives 
                  dans leurs opérations et la satisfaction de leurs assurés.
                </p>
                <div className="space-y-4">
                  {[
                    "Réduction des coûts administratifs de 30%",
                    "Traitement des dossiers 50% plus rapide",
                    "Satisfaction assurés à 95%",
                    "Conformité réglementaire garantie"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <motion.div 
                        className="h-2 w-2 rounded-full bg-pharma-primary mr-3"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="text-gray-600">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {stats.map((stat, index) => (
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
                <Building2 className="h-16 w-16 mx-auto mb-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-6">
                Partenaires avec les meilleures compagnies d'assurance
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez le réseau d'assurances qui révolutionnent l'accès aux soins en Afrique de l'Ouest.
              </p>
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                    Devenir partenaire assurance
                    <CheckCircle className="ml-2 h-4 w-4" />
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

export default ForInsurancesPage;

