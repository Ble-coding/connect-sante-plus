
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 bg-pharma-light">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez PharmaConnect dès aujourd'hui</h2>
          <p className="text-xl text-gray-700 mb-8">
            Commencez à améliorer votre parcours de soins en quelques clics. 
            Inscription gratuite pour tous les utilisateurs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90">
                S'inscrire gratuitement
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
