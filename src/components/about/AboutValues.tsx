
import React from 'react';
import { Check } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'Nous cherchons constamment à améliorer nos solutions pour mieux servir nos utilisateurs.'
    },
    {
      title: 'Accessibilité',
      description: 'Nous concevons nos services pour qu\'ils soient utilisables par tous, indépendamment de leur localisation ou de leurs moyens.'
    },
    {
      title: 'Confidentialité',
      description: 'La protection des données de santé de nos utilisateurs est notre priorité absolue.'
    },
    {
      title: 'Collaboration',
      description: 'Nous croyons au pouvoir de la collaboration entre tous les acteurs du système de santé.'
    },
    {
      title: 'Empathie',
      description: 'Nous plaçons l\'humain au centre de toutes nos décisions et innovations.'
    },
    {
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tous nos services et interactions.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
          <p className="text-xl text-gray-600">
            Ces principes guident chacune de nos actions et décisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-pharma-secondary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-pharma-primary">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
