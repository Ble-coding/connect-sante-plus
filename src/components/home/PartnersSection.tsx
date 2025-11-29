
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

// Images des partenaires
const partnersLogos = [
  '/OIP21.webp',
  '/OIP22.webp',
  '/OIP23.webp',
  '/OIP24.webp',
  '/OIP25.webp',
  '/OIP26.webp',
  '/OIP27.webp',
  '/OIP28.webp'
];

// Composant pour gérer les erreurs de chargement d'image
const PartnerLogo = ({ src, alt }: { src: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Utiliser le placeholder SVG en cas d'erreur
      setImgSrc('/placeholder.svg');
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className="h-16 w-auto max-w-full object-contain" 
      onError={handleError}
      loading="lazy"
    />
  );
};

const PartnersSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  useEffect(() => {
    if (!emblaApi) return;

    // Auto-scroll
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
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
            Nos partenaires
          </motion.span>
          <h2 className="text-3xl font-bold mt-4 mb-6 text-gray-900">Ils nous font confiance</h2>
          <p className="text-gray-600 leading-relaxed">
            Pharma Africa Connect s'appuie sur un réseau solide de partenaires de confiance pour offrir 
            le meilleur service possible à nos utilisateurs.
          </p>
        </motion.div>
        
        <div className="overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex gap-8">
            {partnersLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 flex items-center justify-center"
              >
                <motion.div
                  className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.6, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    opacity: 1,
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <PartnerLogo 
                    src={logo} 
                    alt={`Partenaire ${index + 1}`}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.p 
            className="mb-6 text-gray-600 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Professionnel de santé ? Pharmacien ? Partenaire institutionnel ou investisseur ?<br />
            Pharma Africa Connect vous ouvre ses portes pour construire ensemble une santé digitale, inclusive et accessible.
          </motion.p>
          <Link to="/contact">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10 px-6">
                Devenir partenaire
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
