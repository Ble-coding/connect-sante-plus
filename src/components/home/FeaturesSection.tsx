
import React from 'react';
import { 
  SearchCheck, 
  Video, 
  MessageSquare, 
  Pill, 
  Clock, 
  Bell 
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Recherche de pharmacies',
    description: 'Localisez les pharmacies ouvertes à proximité et vérifiez la disponibilité des médicaments en temps réel.',
    icon: SearchCheck
  },
  {
    title: 'Téléconsultations',
    description: 'Consultez un médecin par visioconférence ou téléphone sans vous déplacer, à tout moment.',
    icon: Video
  },
  {
    title: 'Messagerie sécurisée',
    description: 'Échangez en toute confidentialité avec votre médecin ou pharmacien pour un suivi personnalisé.',
    icon: MessageSquare
  },
  {
    title: 'Ordonnance électronique',
    description: 'Recevez et présentez vos ordonnances numériques directement depuis votre téléphone.',
    icon: Pill
  },
  {
    title: 'Renouvellement d\'ordonnance',
    description: 'Demandez le renouvellement de votre ordonnance en quelques clics sans déplacement inutile.',
    icon: Clock
  },
  {
    title: 'Rappels de traitement',
    description: 'Recevez des notifications personnalisées pour ne jamais oublier votre traitement.',
    icon: Bell
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="px-4 py-1.5 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Comment ça marche
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">Une solution complète pour votre santé</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pharma Africa Connect vous offre tous les outils nécessaires pour gérer votre santé efficacement,
            où que vous soyez, quand vous en avez besoin.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="feature-card bg-white p-6 rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="h-14 w-14 mb-6 rounded-xl bg-pharma-light flex items-center justify-center"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-8 w-8 text-pharma-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm text-gray-500 mr-2">En savoir plus sur</span>
            <span className="text-sm font-medium text-pharma-primary hover:underline cursor-pointer">notre fonctionnement</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
