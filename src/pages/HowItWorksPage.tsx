
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  UserCheck, 
  Search, 
  Calendar, 
  Pill, 
  CheckCircle,
  ArrowRight,
  Smartphone,
  Users,
  Shield,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorksPage = () => {
  const steps = [
    {
      step: '01',
      title: 'Créez votre compte',
      description: 'Inscription gratuite en quelques minutes sur notre plateforme web ou mobile.',
      icon: UserCheck,
      details: [
        'Formulaire d\'inscription simple et sécurisé',
        'Vérification par SMS ou email',
        'Configuration de votre profil de santé'
      ]
    },
    {
      step: '02',
      title: 'Trouvez votre solution',
      description: 'Recherchez une pharmacie ouverte ou prenez rendez-vous avec un professionnel.',
      icon: Search,
      details: [
        'Géolocalisation des pharmacies ouvertes',
        'Vérification de disponibilité des médicaments',
        'Prise de rendez-vous en ligne'
      ]
    },
    {
      step: '03',
      title: 'Consultez ou commandez',
      description: 'Téléconsultation avec un médecin ou commande de médicaments disponibles.',
      icon: Calendar,
      details: [
        'Consultation par vidéo, audio ou chat',
        'Commande de médicaments en ligne',
        'Suivi en temps réel de votre demande'
      ]
    },
    {
      step: '04',
      title: 'Recevez vos soins',
      description: 'Ordonnance électronique et récupération en pharmacie ou livraison.',
      icon: Pill,
      details: [
        'Ordonnance numérique sécurisée',
        'Récupération en pharmacie partenaire',
        'Rappels automatiques de traitement'
      ]
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Multi-plateforme',
      description: 'Accessible via web, mobile et SMS pour tous les types d\'utilisateurs.'
    },
    {
      icon: Users,
      title: 'Réseau de partenaires',
      description: 'Pharmacies, médecins et établissements de santé certifiés et vérifiés.'
    },
    {
      icon: Shield,
      title: 'Sécurité garantie',
      description: 'Données de santé protégées selon les standards internationaux.'
    },
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description: 'Service d\'urgence et téléconsultations disponibles à tout moment.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pharma-light to-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <span className="px-3 py-1 text-sm font-medium bg-white text-pharma-primary rounded-full inline-block mb-6">
                Comment ça marche
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-pharma-primary mb-6">
                Une solution simple pour vos besoins de santé
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Découvrez comment PharmaConnect révolutionne l'accès aux soins de santé 
                en seulement 4 étapes simples.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">4 étapes vers vos soins</h2>
              <p className="text-xl text-gray-600">
                Un processus pensé pour être simple, rapide et efficace
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-pharma-primary text-white flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className="h-6 w-6 text-pharma-primary" />
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Pourquoi choisir PharmaConnect ?</h2>
              <p className="text-xl text-gray-600">
                Des fonctionnalités avancées au service de votre santé
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow text-center">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-pharma-light flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-pharma-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Le processus en détail</h2>
              <p className="text-xl text-gray-600">
                Comprendre chaque étape de votre parcours de soin
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-pharma-light hidden md:block"></div>
                
                <div className="space-y-12">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-pharma-primary text-white flex items-center justify-center text-lg font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Inscription et profil de santé</h3>
                      <p className="text-gray-600 mb-4">
                        Créez votre compte en renseignant vos informations de base et votre profil de santé. 
                        Ajoutez vos allergies, traitements en cours et antécédents médicaux pour un suivi personnalisé.
                      </p>
                      <div className="bg-pharma-light p-4 rounded-lg">
                        <p className="text-sm text-pharma-primary font-medium">
                          💡 Astuce : Plus votre profil est complet, plus les recommandations seront précises !
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-pharma-primary text-white flex items-center justify-center text-lg font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Recherche et géolocalisation</h3>
                      <p className="text-gray-600 mb-4">
                        Utilisez notre système de géolocalisation pour trouver les pharmacies ouvertes les plus proches. 
                        Vérifiez en temps réel la disponibilité de vos médicaments ou prenez rendez-vous avec un professionnel.
                      </p>
                      <div className="bg-pharma-light p-4 rounded-lg">
                        <p className="text-sm text-pharma-primary font-medium">
                          📍 Disponible même en zone rurale grâce à notre réseau étendu de partenaires
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-pharma-primary text-white flex items-center justify-center text-lg font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Consultation et prescription</h3>
                      <p className="text-gray-600 mb-4">
                        Consultez un médecin par téléconsultation (vidéo, audio ou chat) ou rendez-vous directement 
                        en pharmacie. Recevez votre prescription électronique sécurisée instantanément.
                      </p>
                      <div className="bg-pharma-light p-4 rounded-lg">
                        <p className="text-sm text-pharma-primary font-medium">
                          🔒 Toutes les consultations sont sécurisées et les données protégées
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-pharma-primary text-white flex items-center justify-center text-lg font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Récupération et suivi</h3>
                      <p className="text-gray-600 mb-4">
                        Présentez votre ordonnance électronique en pharmacie ou organisez une livraison. 
                        Bénéficiez de rappels automatiques pour vos traitements et renouvellez vos ordonnances en un clic.
                      </p>
                      <div className="bg-pharma-light p-4 rounded-lg">
                        <p className="text-sm text-pharma-primary font-medium">
                          ⏰ Rappels personnalisés pour ne jamais oublier vos médicaments
                        </p>
                      </div>
                    </div>
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
              <h2 className="text-3xl font-bold mb-6">
                Prêt à simplifier vos soins de santé ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez des milliers d'utilisateurs qui font déjà confiance à PharmaConnect
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                    Créer mon compte gratuit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/pharmacy-search">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-pharma-primary">
                    Trouver une pharmacie
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
