
import React from 'react';
import { Heart, User, MessageCircle } from 'lucide-react';

const AboutMission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
          <p className="text-xl text-gray-600">
            Nous voulons rendre les soins de santé accessibles à tous, partout, tout le temps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-pharma-light flex items-center justify-center">
              <Heart className="h-8 w-8 text-pharma-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Améliorer l'accès aux soins</h3>
            <p className="text-gray-600">
              Offrir des solutions digitales qui éliminent les barrières géographiques et temporelles pour les soins de santé.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-pharma-light flex items-center justify-center">
              <User className="h-8 w-8 text-pharma-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Autonomiser les patients</h3>
            <p className="text-gray-600">
              Donner aux patients les outils pour gérer leur santé de manière proactive et prendre des décisions éclairées.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-pharma-light flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-pharma-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Faciliter la communication</h3>
            <p className="text-gray-600">
              Créer un écosystème où patients, médecins et pharmaciens peuvent communiquer efficacement et en toute sécurité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
