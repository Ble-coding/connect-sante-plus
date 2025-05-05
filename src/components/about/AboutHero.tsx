
import React from 'react';

const AboutHero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-pharma-light to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <img 
            src="/lovable-uploads/c1bd51ec-1648-40dd-aacd-3af632c6f816.png" 
            alt="PharmaConnect Logo" 
            className="h-32 md:h-40 mb-8" 
          />
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            À propos de PharmaConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PharmaConnect révolutionne l'accès aux soins de santé en connectant patients, professionnels de santé et pharmacies sur une plateforme unique et intuitive.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
