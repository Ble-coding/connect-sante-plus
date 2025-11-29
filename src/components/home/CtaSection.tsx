
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Phone 
} from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-24 bg-pharma-primary text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Le déclic – Pourquoi j'ai créé PharmaConnect
            </h2>
            <div className="space-y-5 leading-relaxed text-white/95">
              <p className="text-lg">
                Ce jour-là, ma vie a basculé. Un banal accident de travail, une douleur vive, et personne 
                autour de moi pour m'aider. C'était le soir, il faisait nuit, et j'étais seule. J'avais 
                besoin d'un médicament, juste un, pour soulager cette douleur qui m'empêchait de respirer.
              </p>
              <p className="text-lg">
                Arrivée à la pharmacie, une longue file d'attente m'attendait. J'étais à bout, physiquement 
                et moralement. C'est à ce moment-là que j'ai compris qu'on ne pouvait plus continuer ainsi. 
                Que personne ne devrait avoir à choisir entre douleur et solitude.
              </p>
              <p className="text-lg font-semibold">
                C'est à ce moment-là que PharmaConnect a pris racine dans mon cœur. Une solution humaine, 
                digitale, accessible à tous.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Rejoignez PharmaConnect dès aujourd'hui</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Commencez à améliorer votre parcours de soins en quelques clics. 
              Inscription gratuite pour tous les utilisateurs.
            </p>
            
            <div className="space-y-4 mb-6">
              <Link to="/register" className="block">
                <Button size="lg" className="w-full bg-pharma-primary hover:bg-pharma-primary/90 text-white h-12">
                  S'inscrire gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                <Link to="/for-patients">
                  <Button variant="outline" size="lg" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12">
                    Pour les patients
                  </Button>
                </Link>
                
                <Link to="/for-doctors">
                  <Button variant="outline" size="lg" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12">
                    Pour les professionnels
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="font-medium mb-4 text-gray-900">Besoin d'aide ou d'informations ?</p>
              <div className="flex flex-col gap-3">
                <a href="mailto:contact@pharmaconnect.ci" className="flex items-center text-sm text-gray-600 hover:text-pharma-primary transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@pharmaconnect.ci
                </a>
                <a href="tel:+22512345678" className="flex items-center text-sm text-gray-600 hover:text-pharma-primary transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  +225 12 345 678
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
