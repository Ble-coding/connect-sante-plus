
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    content: "PharmaConnect m'a permis de consulter un médecin et de récupérer mes médicaments sans quitter mon quartier. Une vraie révolution !",
    author: "M. Coulibaly",
    role: "Patient"
  },
  {
    content: "Aujourd'hui, je reçois mes ordonnances directement dans mon interface, je gagne du temps et mes patients aussi.",
    author: "Mme Touré",
    role: "Pharmacienne"
  },
  {
    content: "Nous avons intégré PharmaConnect dans notre politique RH pour assurer un meilleur suivi médical à notre personnel.",
    author: "M. Diallo",
    role: "Responsable RH"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
            Témoignages
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-6">Ce qu'ils disent de nous</h2>
          <p className="text-xl text-gray-600">
            Découvrez comment PharmaConnect transforme l'expérience de santé de nos utilisateurs au quotidien.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-pharma-light/30 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6">
                  <svg className="h-10 w-10 text-pharma-accent opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 font-light italic">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-pharma-primary font-semibold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
