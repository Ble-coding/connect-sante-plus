
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const partnersLogos = [
  'https://via.placeholder.com/180x80/e2e8f0/718096?text=Partenaire+1',
  'https://via.placeholder.com/180x80/e2e8f0/718096?text=Partenaire+2',
  'https://via.placeholder.com/180x80/e2e8f0/718096?text=Partenaire+3',
  'https://via.placeholder.com/180x80/e2e8f0/718096?text=Partenaire+4',
  'https://via.placeholder.com/180x80/e2e8f0/718096?text=Partenaire+5'
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
            Nos partenaires
          </span>
          <h2 className="text-2xl font-bold mt-4 mb-6">Ils nous font confiance</h2>
          <p className="text-gray-600">
            PharmaConnect s'appuie sur un réseau solide de partenaires de confiance pour offrir 
            le meilleur service possible à nos utilisateurs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {partnersLogos.map((logo, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img src={logo} alt={`Partenaire ${index + 1}`} className="h-12 w-auto" />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-6 text-gray-600">
            Professionnel de santé ? Pharmacien ? Partenaire institutionnel ou investisseur ?<br />
            PharmaConnect vous ouvre ses portes pour construire ensemble une santé digitale, inclusive et accessible.
          </p>
          <Link to="/contact">
            <Button variant="outline" className="border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10">
              Devenir partenaire
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
