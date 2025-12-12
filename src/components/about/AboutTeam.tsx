
import React from 'react';

const teamMembers = [
  {
    name: 'Dr KOUAME Désiré ',
    role: 'Enseignement-Chercheur à l\'Universite Félix HB',
    bio: 'Dir. Cord. Adjoint Prog.Nat.Nutrition MSHPCMU',
    image: '/WhatsApp Image 2025-12-08 at 07.57.18.jpeg'
  },
  {
    name: 'Thomas Diallo',
    role: 'CTO',
    bio: 'Expert en technologies web et mobile avec un focus sur la sécurité des données de santé.',
    image: '/WhatsApp Image 2025-12-08 at 07.57.18 (1).jpeg'
  },
  {
    name: 'Dr Ékra Nadia',
    role: 'Pharmacienne à la centrale d\'achat en Côte d\'Ivoire.',
    
    image: '/WhatsApp Image 2025-12-08 at 07.57.18 (2).jpeg'
  },
  {
    name: 'Prisca N’Gotta Fondatrice',
    role: 'Ingénieur comptable de formation',
   
    image: '/WhatsApp Image 2025-12-07 at 22.43.19.jpeg'
  }
];

const AboutTeam = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
          <p className="text-xl text-gray-600">
            Des professionnels passionnés par la santé et la technologie.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-pharma-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Rejoignez Notre Équipe</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Nous sommes toujours à la recherche de talents passionnés pour nous aider à transformer l'accès aux soins de santé.
          </p>
          <a href="/careers" className="inline-flex items-center text-pharma-primary hover:underline">
            Voir nos offres d'emploi <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
