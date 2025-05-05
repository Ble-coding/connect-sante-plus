
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col space-y-4 md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Une santé connectée pour tous, partout
            </h1>
            <p className="text-xl text-gray-600 md:text-2xl">
              PharmaConnect facilite l'accès aux soins et aux médicaments en connectant patients, professionnels de santé et pharmacies sur une plateforme unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/register">
                <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90">
                  Créer un compte
                </Button>
              </Link>
              <Link to="/pharmacy-search">
                <Button variant="outline" size="lg">
                  Rechercher une pharmacie
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
            <img 
              src="https://img.freepik.com/free-vector/online-doctor-consultation-illustration_88138-414.jpg" 
              alt="PharmaConnect - Plateforme de santé connectée" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
