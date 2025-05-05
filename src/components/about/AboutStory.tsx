
import React from 'react';

const AboutStory = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                PharmaConnect est né d'un constat simple : dans de nombreuses régions, l'accès aux soins de santé reste un défi majeur. 
                Les longues distances, la pénurie de professionnels de santé et le manque d'information sur la disponibilité des médicaments 
                créent des obstacles pour de nombreux patients.
              </p>
              <p>
                Fondé en 2021 par une équipe de professionnels de la santé et d'experts en technologie, 
                PharmaConnect a été conçu pour répondre à ces défis en tirant parti des technologies digitales.
              </p>
              <p>
                Après deux ans de développement et de tests rigoureux, notre plateforme est maintenant 
                opérationnelle et continue d'évoluer pour mieux répondre aux besoins de nos utilisateurs.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-w-5 aspect-h-4 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Équipe PharmaConnect" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-pharma-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
              Depuis<br/>2021
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
