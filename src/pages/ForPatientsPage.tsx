
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Video, 
  Smartphone, 
  Bell, 
  Shield, 
  Clock,
  Heart,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ForPatientsPage = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Géolocalisation des pharmacies',
      description: 'Trouvez instantanément les pharmacies ouvertes les plus proches de vous, même en cas d\'urgence.'
    },
    {
      icon: Video,
      title: 'Téléconsultations 24/7',
      description: 'Consultez un médecin qualifié à tout moment, par vidéo, audio ou chat sécurisé.'
    },
    {
      icon: Smartphone,
      title: 'Ordonnances électroniques',
      description: 'Recevez et présentez vos ordonnances directement depuis votre téléphone.'
    },
    {
      icon: Bell,
      title: 'Rappels intelligents',
      description: 'Ne manquez plus jamais une prise de médicament grâce à nos notifications personnalisées.'
    },
    {
      icon: Shield,
      title: 'Données sécurisées',
      description: 'Vos informations de santé sont protégées par un chiffrement de niveau bancaire.'
    },
    {
      icon: Clock,
      title: 'Gain de temps',
      description: 'Évitez les files d\'attente et gérez votre santé depuis chez vous.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Créez votre compte',
      description: 'Inscription gratuite en quelques minutes avec vérification sécurisée.'
    },
    {
      number: '02',
      title: 'Complétez votre profil',
      description: 'Ajoutez vos informations médicales et allergies pour un suivi personnalisé.'
    },
    {
      number: '03',
      title: 'Trouvez et consultez',
      description: 'Localisez des pharmacies ou prenez rendez-vous avec un professionnel de santé.'
    },
    {
      number: '04',
      title: 'Recevez vos soins',
      description: 'Obtenez votre ordonnance numérique et suivez votre traitement.'
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
                  Solutions pour patients
                </motion.span>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Votre santé, simplifiée et accessible
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Accédez rapidement aux soins et médicaments dont vous avez besoin, 
                  où que vous soyez, quand vous en avez besoin.
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
                        Commencer gratuitement
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/pharmacy-search">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="lg" className="border-pharma-primary text-pharma-primary">
                        Trouver une pharmacie
                      </Button>
                    </motion.div>
                  </Link>
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
                    src="/utilisateur.jpeg" 
                    alt="Patient utilisant Pharma Africa Connect" 
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
              <h2 className="text-3xl font-bold mb-6">Des fonctionnalités pensées pour vous</h2>
              <p className="text-xl text-gray-600">
                Pharma Africa Connect met à votre disposition tous les outils nécessaires pour gérer votre santé efficacement.
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

        {/* How it works */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Comment ça marche ?</h2>
              <p className="text-xl text-gray-600">
                Quatre étapes simples pour accéder à vos soins de santé
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-pharma-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
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
                <Heart className="h-16 w-16 mx-auto mb-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-6">
                Rejoignez des milliers de patients satisfaits
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Ne laissez plus la distance ou le temps être un obstacle à vos soins de santé.
              </p>
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                    Créer mon compte patient
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

export default ForPatientsPage;
