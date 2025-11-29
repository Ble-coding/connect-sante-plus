
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-white to-pharma-light/30 -z-0"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-col space-y-6 md:w-1/2">
            <span className="px-4 py-1.5 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block w-fit">
              La santé digitale accessible pour tous
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pharma-primary leading-tight">
              La santé connectée pour tous, partout
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              PharmaConnect facilite l'accès aux soins et aux médicaments en connectant patients, 
              professionnels de santé et pharmacies sur une plateforme unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link to="/register">
                <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90 text-white px-8 py-6 text-base">
                  Commencer gratuitement
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10 px-8 py-6 text-base"
                onClick={scrollToFeatures}
              >
                Découvrir comment ça marche
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-3 mt-4">
              <div className="flex -space-x-2">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
              </div>
              <span className="text-sm text-gray-600">
                Rejoint par <span className="font-bold text-pharma-primary">5,000+</span> utilisateurs
              </span>
            </div>
          </div>
          
          <div className="md:w-1/2 relative w-full">
            <div className="relative rounded-xl shadow-2xl overflow-hidden bg-pharma-light/20 p-2">
              <img 
                src="https://img.freepik.com/free-vector/online-doctor-consultation-illustration_88138-414.jpg" 
                alt="PharmaConnect - Plateforme de santé connectée" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white p-5 rounded-xl shadow-xl border border-gray-100 md:w-52 hidden md:flex flex-col">
              <div className="text-2xl font-bold text-pharma-primary">+68%</div>
              <div className="text-xs text-gray-600 mt-1">d'accès aux soins facilité</div>
            </div>
            
            <div className="absolute -top-4 -left-4 bg-white p-5 rounded-xl shadow-xl border border-gray-100 md:w-52 hidden md:flex flex-col">
              <div className="text-2xl font-bold text-pharma-primary">24/7</div>
              <div className="text-xs text-gray-600 mt-1">Assistance médicale disponible</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="animate-bounce rounded-full h-12 w-12 p-0 flex items-center justify-center bg-white/80 hover:bg-white shadow-lg"
          onClick={scrollToFeatures}
        >
          <ArrowDown className="h-5 w-5 text-pharma-primary" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
