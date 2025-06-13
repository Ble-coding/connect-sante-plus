
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
              <div>
                <span className="px-3 py-1 text-sm font-medium bg-white text-pharma-primary rounded-full inline-block mb-6">
                  Solutions pour patients
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6">
                  Votre santé, simplifiée et accessible
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Accédez rapidement aux soins et médicaments dont vous avez besoin, 
                  où que vous soyez, quand vous en avez besoin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90">
                      Commencer gratuitement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/pharmacy-search">
                    <Button variant="outline" size="lg" className="border-pharma-primary text-pharma-primary">
                      Trouver une pharmacie
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://img.freepik.com/free-vector/patient-using-smartphone-telemedicine-online-doctor-consultation_74855-14247.jpg" 
                  alt="Patient utilisant PharmaConnect" 
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
              <h2 className="text-3xl font-bold mb-6">Des fonctionnalités pensées pour vous</h2>
              <p className="text-xl text-gray-600">
                PharmaConnect met à votre disposition tous les outils nécessaires pour gérer votre santé efficacement.
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

        {/* How it works */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Comment ça marche ?</h2>
              <p className="text-xl text-gray-600">
                Quatre étapes simples pour accéder à vos soins de santé
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-pharma-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-pharma-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <Heart className="h-16 w-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">
                Rejoignez des milliers de patients satisfaits
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Ne laissez plus la distance ou le temps être un obstacle à vos soins de santé.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                  Créer mon compte patient
                  <CheckCircle className="ml-2 h-4 w-4" />
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

export default ForPatientsPage;
