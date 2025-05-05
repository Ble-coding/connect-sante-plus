
import React from 'react';
import { CheckCircle, Calendar, MessageSquare, Search, Clock, Heart } from 'lucide-react';

const features = [
  {
    title: 'Consultations à distance',
    description: 'Consultez un médecin par visioconférence ou téléphone sans vous déplacer',
    icon: Calendar
  },
  {
    title: 'Messagerie sécurisée',
    description: 'Échangez en toute confidentialité avec votre médecin ou pharmacien',
    icon: MessageSquare
  },
  {
    title: 'Trouver une pharmacie',
    description: 'Localisez les pharmacies à proximité et vérifiez la disponibilité des médicaments',
    icon: Search
  },
  {
    title: 'Suivi médical',
    description: 'Gardez une trace de votre historique médical et de vos ordonnances',
    icon: Heart
  },
  {
    title: 'Renouvellement d\'ordonnance',
    description: 'Demandez le renouvellement de votre ordonnance en quelques clics',
    icon: Clock
  },
  {
    title: 'Rappels de traitement',
    description: 'Recevez des notifications pour ne jamais oublier votre traitement',
    icon: CheckCircle
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos fonctionnalités</h2>
          <p className="text-xl text-gray-600">
            PharmaConnect vous offre tous les outils nécessaires pour gérer votre santé efficacement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="h-12 w-12 mb-4 rounded-full bg-pharma-light flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-pharma-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
