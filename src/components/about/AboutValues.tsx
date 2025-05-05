
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
            Ce qui nous guide
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-6">Nos Valeurs</h2>
          <p className="text-xl text-gray-600">
            Ces principes guident chacune de nos actions et décisions pour offrir 
            le meilleur service à tous nos utilisateurs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px]"
            >
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="h-10 w-10 rounded-full bg-pharma-light flex items-center justify-center">
                      <Check className="h-5 w-5 text-pharma-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-pharma-primary">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
