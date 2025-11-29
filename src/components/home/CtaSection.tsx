
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Phone 
} from 'lucide-react';
import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <section className="py-24 bg-pharma-primary text-white relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Le déclic – Pourquoi j'ai créé Pharma Africa Connect
            </motion.h2>
            <motion.div 
              className="space-y-5 leading-relaxed text-white/95"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Ce jour-là, ma vie a basculé. Un banal accident de travail, une douleur vive, et personne 
                autour de moi pour m'aider. C'était le soir, il faisait nuit, et j'étais seule. J'avais 
                besoin d'un médicament, juste un, pour soulager cette douleur qui m'empêchait de respirer.
              </motion.p>
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Arrivée à la pharmacie, une longue file d'attente m'attendait. J'étais à bout, physiquement 
                et moralement. C'est à ce moment-là que j'ai compris qu'on ne pouvait plus continuer ainsi. 
                Que personne ne devrait avoir à choisir entre douleur et solitude.
              </motion.p>
              <motion.p 
                className="text-lg font-semibold"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                C'est à ce moment-là que Pharma Africa Connect a pris racine dans mon cœur. Une solution humaine, 
                digitale, accessible à tous.
              </motion.p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-8 shadow-2xl"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Rejoignez Pharma Africa Connect dès aujourd'hui
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Commencez à améliorer votre parcours de soins en quelques clics. 
              Inscription gratuite pour tous les utilisateurs.
            </motion.p>
            
            <div className="space-y-4 mb-6">
              <Link to="/register" className="block">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full bg-pharma-primary hover:bg-pharma-primary/90 text-white h-12">
                    S'inscrire gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
              
              <div className="grid grid-cols-2 gap-3">
                <Link to="/for-patients">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12">
                      Pour les patients
                    </Button>
                  </motion.div>
                </Link>
                
                <Link to="/for-doctors">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12">
                      Pour les professionnels
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
            
            <motion.div 
              className="border-t border-gray-200 pt-6 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-medium mb-4 text-gray-900">Besoin d'aide ou d'informations ?</p>
              <div className="flex flex-col gap-3">
                <motion.a 
                  href="mailto:Info@pharmafriconnect.africa" 
                  className="flex items-center text-sm text-gray-600 hover:text-pharma-primary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Info@pharmafriconnect.africa
                </motion.a>
                <motion.a 
                  href="tel:+22512345678" 
                  className="flex items-center text-sm text-gray-600 hover:text-pharma-primary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +225 12 345 678
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
