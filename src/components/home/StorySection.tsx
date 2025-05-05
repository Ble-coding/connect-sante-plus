
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StorySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://img.freepik.com/free-photo/african-american-woman-using-smartphone-pharmacy_1303-22095.jpg" 
              alt="Notre histoire" 
              className="rounded-xl shadow-lg object-cover h-[400px] w-full"
            />
          </div>
          
          <div>
            <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
              Notre histoire
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-6">Créé pour ceux qui ont besoin d'aide</h2>
            <p className="text-gray-600 mb-4">
              PharmaConnect est née d'une expérience personnelle douloureuse : l'impossibilité 
              d'accéder rapidement à un médicament urgent en pleine nuit.
            </p>
            <p className="text-gray-600 mb-6">
              Notre mission est de faciliter l'accès rapide, fiable et coordonné aux médicaments 
              et services de santé grâce à la technologie. Nous rêvons d'une Afrique de l'Ouest où 
              chaque citoyen peut accéder aux soins de santé avec dignité, sans barrières géographiques 
              ni sociales.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pharma-primary">5,000+</div>
                <div className="text-sm text-gray-500">Utilisateurs actifs</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pharma-primary">150+</div>
                <div className="text-sm text-gray-500">Pharmacies partenaires</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pharma-primary">300+</div>
                <div className="text-sm text-gray-500">Professionnels de santé</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pharma-primary">24/7</div>
                <div className="text-sm text-gray-500">Support disponible</div>
              </div>
            </div>
            
            <Link to="/about">
              <Button variant="outline" className="border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10">
                Découvrir notre histoire complète
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
