
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
    <section className="py-20 bg-gradient-to-br from-pharma-primary to-pharma-secondary text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Le déclic – Pourquoi j'ai créé PharmaConnect
            </h2>
            <p className="text-lg mb-6 leading-relaxed opacity-90">
              Ce jour-là, ma vie a basculé. Un banal accident de travail, une douleur vive, et personne 
              autour de moi pour m'aider. C'était le soir, il faisait nuit, et j'étais seule. J'avais 
              besoin d'un médicament, juste un, pour soulager cette douleur qui m'empêchait de respirer.
            </p>
            <p className="text-lg mb-6 leading-relaxed opacity-90">
              Arrivée à la pharmacie, une longue file d'attente m'attendait. J'étais à bout, physiquement 
              et moralement. C'est à ce moment-là que j'ai compris qu'on ne pouvait plus continuer ainsi. 
              Que personne ne devrait avoir à choisir entre douleur et solitude.
            </p>
            <p className="text-lg mb-8 font-semibold">
              C'est à ce moment-là que PharmaConnect a pris racine dans mon cœur. Une solution humaine, 
              digitale, accessible à tous.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Rejoignez PharmaConnect dès aujourd'hui</h3>
            <p className="text-lg mb-8 opacity-90">
              Commencez à améliorer votre parcours de soins en quelques clics. 
              Inscription gratuite pour tous les utilisateurs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link to="/register" className="sm:col-span-2">
                <Button size="lg" className="w-full bg-white text-pharma-primary hover:bg-white/90">
                  S'inscrire gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/for-patients">
                <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white/20">
                  Pour les patients
                </Button>
              </Link>
              
              <Link to="/for-doctors">
                <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white/20">
                  Pour les professionnels
                </Button>
              </Link>
            </div>
            
            <div className="border-t border-white/20 pt-6 mt-6">
              <p className="font-medium mb-4">Besoin d'aide ou d'informations ?</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:contact@pharmaconnect.ci" className="flex items-center text-sm hover:underline">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@pharmaconnect.ci
                </a>
                <a href="tel:+22512345678" className="flex items-center text-sm hover:underline">
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
