
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-white to-pharma-light/30 -z-0"></div>
      <motion.div 
        className="container px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="flex flex-col space-y-6 md:w-1/2"
            variants={itemVariants}
          >
            <motion.span 
              className="px-4 py-1.5 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block w-fit"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              La santé digitale accessible pour tous
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pharma-primary leading-tight"
              variants={itemVariants}
            >
              La santé connectée pour tous, partout
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed"
              variants={itemVariants}
            >
              Pharma Africa Connect facilite l'accès aux soins et aux médicaments en connectant patients, 
              professionnels de santé et pharmacies sur une plateforme unique.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-2"
              variants={itemVariants}
            >
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90 text-white px-8 py-6 text-base">
                    Commencer gratuitement
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10 px-8 py-6 text-base"
                  onClick={scrollToFeatures}
                >
                  Découvrir comment ça marche
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative w-full"
            variants={imageVariants}
          >
            <motion.div 
              className="relative rounded-xl shadow-2xl overflow-hidden bg-pharma-light/20 p-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/image.png" 
                alt="Pharma Africa Connect - Plateforme de santé connectée" 
                className="rounded-lg w-full h-auto"
              />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-white p-5 rounded-xl shadow-xl border border-gray-100 md:w-52 hidden md:flex flex-col"
              variants={cardVariants}
              whileHover="hover"
              animate="visible"
            >
              <div className="text-2xl font-bold text-pharma-primary">+68%</div>
              <div className="text-xs text-gray-600 mt-1">d'accès aux soins facilité</div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-4 -left-4 bg-white p-5 rounded-xl shadow-xl border border-gray-100 md:w-52 hidden md:flex flex-col"
              variants={cardVariants}
              whileHover="hover"
              animate="visible"
            >
              <div className="text-2xl font-bold text-pharma-primary">24/7</div>
              <div className="text-xs text-gray-600 mt-1">Assistance médicale disponible</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-white/80 hover:bg-white shadow-lg"
            onClick={scrollToFeatures}
          >
            <ArrowDown className="h-5 w-5 text-pharma-primary" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
