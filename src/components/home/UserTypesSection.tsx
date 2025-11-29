
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  User, 
  Users,
  FileText 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const userTypes = [
  {
    type: 'patient',
    title: 'Pour les patients',
    description: 'Accédez facilement à vos soins et médicaments, prenez rendez-vous et suivez votre santé où que vous soyez.',
    icon: User,
    features: [
      "Recherche de pharmacies par géolocalisation",
      "Téléconsultation médicale à tout moment",
      "Gestion de vos ordonnances et traitements",
      "Rappels et notifications de prise de médicaments"
    ],
    link: '/for-patients',
    color: 'pharma-patient'
  },
  {
    type: 'doctor',
    title: 'Pour les professionnels de santé',
    description: 'Gérez efficacement vos consultations à distance et suivez vos patients de manière sécurisée.',
    icon: Users,
    features: [
      "Tableau de bord personnalisé pour vos rendez-vous",
      "Consultation en ligne par audio, vidéo ou chat",
      "Accès sécurisé au dossier des patients",
      "Prescription numérique et suivi des traitements"
    ],
    link: '/for-doctors',
    color: 'pharma-doctor'
  },
  {
    type: 'pharmacy',
    title: 'Pour les pharmacies',
    description: 'Améliorez votre visibilité et gérez vos stocks de médicaments en temps réel pour mieux servir vos clients.',
    icon: FileText,
    features: [
      "Mise à jour en temps réel de vos stocks",
      "Réception directe des ordonnances électroniques",
      "Communication facilitée avec médecins et patients",
      "Visibilité accrue auprès des patients à proximité"
    ],
    link: '/for-pharmacies',
    color: 'pharma-pharmacy'
  }
];

const UserTypesSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
            Pour tous les acteurs de la santé
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">Solutions adaptées à vos besoins</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            PharmaConnect propose des solutions personnalisées pour tous les acteurs de la santé,
            facilitant la communication et l'accès aux soins.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
              <div className="bg-pharma-light p-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md mb-5">
                  <userType.icon className="h-9 w-9 text-pharma-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-pharma-primary">{userType.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{userType.description}</p>
              </div>
              
              <CardContent className="pt-6 px-6 pb-6">
                <ul className="space-y-3 mb-6">
                  {userType.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <div className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-pharma-primary flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={userType.link}>
                  <Button 
                    variant="outline" 
                    className="w-full border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10 hover:border-pharma-primary/80 transition-colors"
                  >
                    En savoir plus
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
