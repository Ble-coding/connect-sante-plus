
import React from 'react';

const teamMembers = [
  {
    name: 'Dr. Sophia Martin',
    role: 'Fondatrice & CEO',
    bio: 'Médecin de formation avec 15 ans d\'expérience dans la santé digitale.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Thomas Diallo',
    role: 'CTO',
    bio: 'Expert en technologies web et mobile avec un focus sur la sécurité des données de santé.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Aminata Koné',
    role: 'Directrice des Opérations',
    bio: 'Spécialiste en logistique pharmaceutique avec une expertise dans l\'optimisation de la chaîne d\'approvisionnement.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Dr. Robert Chen',
    role: 'Conseiller Médical',
    bio: 'Professeur en santé publique avec un intérêt particulier pour la télémédecine.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
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
