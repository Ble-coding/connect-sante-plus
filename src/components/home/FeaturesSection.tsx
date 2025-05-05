
import React from 'react';
import { 
  SearchCheck, 
  Video, 
  MessageSquare, 
  Pills, 
  Clock, 
  Bell 
} from 'lucide-react';

const features = [
  {
    title: 'Recherche de pharmacies',
    description: 'Localisez les pharmacies ouvertes à proximité et vérifiez la disponibilité des médicaments en temps réel.',
    icon: SearchCheck
  },
  {
    title: 'Téléconsultations',
    description: 'Consultez un médecin par visioconférence ou téléphone sans vous déplacer, à tout moment.',
    icon: Video
  },
  {
    title: 'Messagerie sécurisée',
    description: 'Échangez en toute confidentialité avec votre médecin ou pharmacien pour un suivi personnalisé.',
    icon: MessageSquare
  },
  {
    title: 'Ordonnance électronique',
    description: 'Recevez et présentez vos ordonnances numériques directement depuis votre téléphone.',
    icon: Pills
  },
  {
    title: 'Renouvellement d\'ordonnance',
    description: 'Demandez le renouvellement de votre ordonnance en quelques clics sans déplacement inutile.',
    icon: Clock
  },
  {
    title: 'Rappels de traitement',
    description: 'Recevez des notifications personnalisées pour ne jamais oublier votre traitement.',
    icon: Bell
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
            Comment ça marche
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-6">Une solution complète pour votre santé</h2>
          <p className="text-xl text-gray-600">
            PharmaConnect vous offre tous les outils nécessaires pour gérer votre santé efficacement,
            où que vous soyez, quand vous en avez besoin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card hover:scale-105 transition-transform duration-300"
            >
              <div className="h-14 w-14 mb-6 rounded-xl bg-pharma-light flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-pharma-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full">
            <span className="text-sm text-gray-500 mr-2">En savoir plus sur</span>
            <span className="text-sm font-medium text-pharma-primary">notre fonctionnement</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
