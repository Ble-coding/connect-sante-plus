
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  User, 
  Users,
  FileText 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const userTypes = [
  {
    type: 'patient',
    title: 'Pour les patients',
    description: 'Accédez facilement à vos soins et médicaments, prenez rendez-vous et suivez votre santé où que vous soyez.',
    icon: User,
    features: [
      "Recherche de pharmacies par géolocalisation",
      "Téléconsultation médicale à tout moment",
      "Gestion de vos ordonnances et traitements",
      "Rappels et notifications de prise de médicaments"
    ],
    link: '/for-patients',
    color: 'pharma-patient'
  },
  {
    type: 'doctor',
    title: 'Pour les professionnels de santé',
    description: 'Gérez efficacement vos consultations à distance et suivez vos patients de manière sécurisée.',
    icon: Users,
    features: [
      "Tableau de bord personnalisé pour vos rendez-vous",
      "Consultation en ligne par audio, vidéo ou chat",
      "Accès sécurisé au dossier des patients",
      "Prescription numérique et suivi des traitements"
    ],
    link: '/for-doctors',
    color: 'pharma-doctor'
  },
  {
    type: 'pharmacy',
    title: 'Pour les pharmacies',
    description: 'Améliorez votre visibilité et gérez vos stocks de médicaments en temps réel pour mieux servir vos clients.',
    icon: FileText,
    features: [
      "Mise à jour en temps réel de vos stocks",
      "Réception directe des ordonnances électroniques",
      "Communication facilitée avec médecins et patients",
      "Visibilité accrue auprès des patients à proximité"
    ],
    link: '/for-pharmacies',
    color: 'pharma-pharmacy'
  }
];

const UserTypesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="px-4 py-1.5 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Pour tous les acteurs de la santé
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">Solutions adaptées à vos besoins</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pharma Africa Connect propose des solutions personnalisées pour tous les acteurs de la santé,
            facilitant la communication et l'accès aux soins.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {userTypes.map((userType, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white h-full">
                <motion.div 
                  className="bg-pharma-light p-8 pb-6"
                  whileHover={{ backgroundColor: "rgba(230, 249, 240, 0.8)" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md mb-5"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <userType.icon className="h-9 w-9 text-pharma-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-pharma-primary">{userType.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{userType.description}</p>
                </motion.div>
                
                <CardContent className="pt-6 px-6 pb-6">
                  <ul className="space-y-3 mb-6">
                    {userType.features.map((feature, fIndex) => (
                      <motion.li 
                        key={fIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + fIndex * 0.1 }}
                      >
                        <motion.div 
                          className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-pharma-primary flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link to={userType.link}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline" 
                        className="w-full border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10 hover:border-pharma-primary/80 transition-colors"
                      >
                        En savoir plus
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserTypesSection;
