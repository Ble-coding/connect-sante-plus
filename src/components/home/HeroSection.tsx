
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-pharma-light to-white py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col space-y-6 md:w-1/2 mb-10 md:mb-0">
            <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block w-fit">
              La santé digitale accessible pour tous
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-pharma-primary">
              La santé connectée pour tous, partout
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              PharmaConnect facilite l'accès aux soins et aux médicaments en connectant patients, 
              professionnels de santé et pharmacies sur une plateforme unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/register">
                <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90 text-white px-8">
                  Commencer gratuitement
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10"
                onClick={scrollToFeatures}
              >
                Découvrir comment ça marche
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex -space-x-2">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
              <span className="text-sm text-gray-500">
                Rejoint par <span className="font-bold">5,000+</span> utilisateurs
              </span>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://img.freepik.com/free-vector/online-doctor-consultation-illustration_88138-414.jpg" 
                alt="PharmaConnect - Plateforme de santé connectée" 
                className="rounded-lg w-full"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg md:w-48 hidden md:flex flex-col">
              <div className="text-xl font-bold text-pharma-primary">+68%</div>
              <div className="text-sm text-gray-500">d'accès aux soins facilité</div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg md:w-48 hidden md:flex flex-col">
              <div className="text-xl font-bold text-pharma-primary">24/7</div>
              <div className="text-sm text-gray-500">Assistance médicale disponible</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="animate-bounce rounded-full h-10 w-10 p-0 flex items-center justify-center"
          onClick={scrollToFeatures}
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
