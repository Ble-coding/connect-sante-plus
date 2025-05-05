
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
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
            Pour tous les acteurs de la santé
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-6">Solutions adaptées à vos besoins</h2>
          <p className="text-xl text-gray-600">
            PharmaConnect propose des solutions personnalisées pour tous les acteurs de la santé,
            facilitant la communication et l'accès aux soins.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow">
              <div className="bg-pharma-light p-6">
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <userType.icon className="h-8 w-8 text-pharma-primary" />
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-pharma-primary">{userType.title}</h3>
                <p className="text-gray-700">{userType.description}</p>
              </div>
              
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  {userType.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-pharma-light flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-pharma-primary"></div>
                      </div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={userType.link}>
                  <Button 
                    variant="outline" 
                    className="w-full border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10"
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
