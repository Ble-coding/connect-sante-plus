
import React from 'react';

const testimonials = [
  {
    content: "PharmaConnect m'a fait gagner un temps précieux. Je peux désormais consulter mon médecin sans me déplacer et recevoir mes médicaments rapidement.",
    author: "Marie L.",
    role: "Patiente"
  },
  {
    content: "En tant que médecin, cette plateforme me permet de mieux organiser mes consultations et d'assurer un suivi plus régulier de mes patients.",
    author: "Dr. Thomas B.",
    role: "Médecin généraliste"
  },
  {
    content: "Notre pharmacie a vu sa visibilité augmenter considérablement depuis que nous avons rejoint PharmaConnect. La gestion des stocks est également simplifiée.",
    author: "Sophie M.",
    role: "Pharmacienne"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce qu'ils disent de nous</h2>
          <p className="text-xl text-gray-600">
            Découvrez les témoignages de nos utilisateurs satisfaits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <svg className="h-8 w-8 text-pharma-accent opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
