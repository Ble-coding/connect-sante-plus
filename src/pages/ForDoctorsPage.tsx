
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
              <div>
                <span className="px-3 py-1 text-sm font-medium bg-white text-pharma-primary rounded-full inline-block mb-6">
                  Solutions pour professionnels de santé
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6">
                  Exercez la médecine sans frontières
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Développez votre pratique médicale avec nos outils numériques 
                  et touchez plus de patients tout en optimisant votre temps.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90">
                      Rejoindre la plateforme
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="border-pharma-primary text-pharma-primary">
                    Voir la démonstration
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1646.jpg" 
                  alt="Médecin utilisant Pharma Africa Connect" 
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
              <h2 className="text-3xl font-bold mb-6">Outils professionnels avancés</h2>
              <p className="text-xl text-gray-600">
                Tout ce dont vous avez besoin pour offrir des soins de qualité à distance.
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

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Pourquoi choisir Pharma Africa Connect ?</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-pharma-primary flex items-center justify-center mr-4 mt-1">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-pharma-primary">Statistiques d'impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pharma-primary">+40%</div>
                    <div className="text-sm text-gray-600">de patients consultés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pharma-primary">-60%</div>
                    <div className="text-sm text-gray-600">de temps d'attente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pharma-primary">95%</div>
                    <div className="text-sm text-gray-600">de satisfaction patient</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pharma-primary">24/7</div>
                    <div className="text-sm text-gray-600">disponibilité</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-pharma-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <Stethoscope className="h-16 w-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">
                Rejoignez le réseau de médecins Pharma Africa Connect
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Participez à la révolution de la santé numérique en Afrique de l'Ouest.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                  Créer mon compte professionnel
                  <Users className="ml-2 h-4 w-4" />
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

export default ForDoctorsPage;
