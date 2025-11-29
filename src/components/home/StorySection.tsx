
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StorySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://img.freepik.com/free-photo/african-american-woman-using-smartphone-pharmacy_1303-22095.jpg" 
              alt="Notre histoire" 
              className="rounded-xl shadow-xl object-cover h-[500px] w-full"
            />
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
                Notre histoire
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Créé pour ceux qui ont besoin d'aide</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                PharmaConnect est née d'une expérience personnelle douloureuse : l'impossibilité 
                d'accéder rapidement à un médicament urgent en pleine nuit.
              </p>
              <p>
                Notre mission est de faciliter l'accès rapide, fiable et coordonné aux médicaments 
                et services de santé grâce à la technologie. Nous rêvons d'une Afrique de l'Ouest où 
                chaque citoyen peut accéder aux soins de santé avec dignité, sans barrières géographiques 
                ni sociales.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-pharma-primary mb-1">5,000+</div>
                <div className="text-sm text-gray-600">Utilisateurs actifs</div>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-pharma-primary mb-1">150+</div>
                <div className="text-sm text-gray-600">Pharmacies partenaires</div>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-pharma-primary mb-1">300+</div>
                <div className="text-sm text-gray-600">Professionnels de santé</div>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-pharma-primary mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support disponible</div>
              </div>
            </div>
            
            <div className="pt-2">
              <Link to="/about">
                <Button variant="outline" className="border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10 px-6">
                  Découvrir notre histoire complète
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
