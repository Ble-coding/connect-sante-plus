
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Video, 
  FileText, 
  MessageSquare, 
  Shield, 
  BarChart3,
  Users,
  Clock,
  Stethoscope,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ForDoctorsPage = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Gestion des rendez-vous',
      description: 'Planifiez et gérez vos consultations avec un agenda intelligent et synchronisé.'
    },
    {
      icon: Video,
      title: 'Téléconsultations HD',
      description: 'Consultez vos patients en haute qualité avec des outils de diagnostic intégrés.'
    },
    {
      icon: FileText,
      title: 'Dossiers patients centralisés',
      description: 'Accédez instantanément à l\'historique médical complet de vos patients.'
    },
    {
      icon: MessageSquare,
      title: 'Communication sécurisée',
      description: 'Échangez avec vos patients et confrères via une messagerie cryptée.'
    },
    {
      icon: Shield,
      title: 'Prescriptions numériques',
      description: 'Créez et envoyez des ordonnances électroniques directement aux pharmacies.'
    },
    {
      icon: BarChart3,
      title: 'Analyses et rapports',
      description: 'Suivez l\'évolution de vos patients avec des tableaux de bord détaillés.'
    }
  ];

  const benefits = [
    {
      title: 'Élargissez votre patientèle',
      description: 'Atteignez des patients dans toute la région grâce à la téléconsultation.'
    },
    {
      title: 'Optimisez votre temps',
      description: 'Réduisez les temps d\'attente et consultez plus efficacement.'
    },
    {
      title: 'Améliorez le suivi',
      description: 'Maintenez un contact régulier avec vos patients entre les consultations.'
    },
    {
      title: 'Sécurisez vos données',
      description: 'Bénéficiez d\'un système conforme aux normes de confidentialité médicale.'
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
                  Solutions pour professionnels de santé
                </motion.span>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Exercez la médecine sans frontières
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Développez votre pratique médicale avec nos outils numériques 
                  et touchez plus de patients tout en optimisant votre temps.
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
                        Rejoindre la plateforme
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="border-pharma-primary text-pharma-primary">
                      Voir la démonstration
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
                    src="/image.png" 
                    alt="Médecin utilisant Pharma Africa Connect" 
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
              <h2 className="text-3xl font-bold mb-6">Outils professionnels avancés</h2>
              <p className="text-xl text-gray-600">
                Tout ce dont vous avez besoin pour offrir des soins de qualité à distance.
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">Pourquoi choisir Pharma Africa Connect ?</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div 
                        className="h-6 w-6 rounded-full bg-pharma-primary flex items-center justify-center mr-4 mt-1"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </motion.div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-pharma-primary">Statistiques d'impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "+40%", label: "de patients consultés" },
                    { value: "-60%", label: "de temps d'attente" },
                    { value: "95%", label: "de satisfaction patient" },
                    { value: "24/7", label: "disponibilité" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-3xl font-bold text-pharma-primary">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
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
                <Stethoscope className="h-16 w-16 mx-auto mb-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-6">
                Rejoignez le réseau de médecins Pharma Africa Connect
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Participez à la révolution de la santé numérique en Afrique de l'Ouest.
              </p>
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                    Créer mon compte professionnel
                    <Users className="ml-2 h-4 w-4" />
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

export default ForDoctorsPage;
