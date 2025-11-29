
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    content: "Pharma Africa Connect m'a permis de consulter un médecin et de récupérer mes médicaments sans quitter mon quartier. Une vraie révolution !",
    author: "M. Coulibaly",
    role: "Patient"
  },
  {
    content: "Aujourd'hui, je reçois mes ordonnances directement dans mon interface, je gagne du temps et mes patients aussi.",
    author: "Mme Touré",
    role: "Pharmacienne"
  },
  {
    content: "Nous avons intégré Pharma Africa Connect dans notre politique RH pour assurer un meilleur suivi médical à notre personnel.",
    author: "M. Diallo",
    role: "Responsable RH"
  },
  {
    content: "Grâce à cette plateforme, je peux suivre mes patients à distance et leur prescrire des médicaments en toute sécurité.",
    author: "Dr. Koné",
    role: "Médecin généraliste"
  },
  {
    content: "L'interface est intuitive et les notifications m'aident à ne jamais oublier mes rendez-vous médicaux.",
    author: "Mme Diabaté",
    role: "Patient"
  }
];

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    // Auto-scroll
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 text-sm font-medium bg-pharma-light text-pharma-primary rounded-full inline-block">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">Ce qu'ils disent de nous</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Découvrez comment Pharma Africa Connect transforme l'expérience de santé de nos utilisateurs au quotidien.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                      <CardContent className="p-8">
                        <div className="mb-6">
                          <svg className="h-12 w-12 text-pharma-accent/70" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="text-gray-700 mb-6 font-light italic leading-relaxed text-sm">{testimonial.content}</p>
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-pharma-primary font-semibold text-lg">
                              {testimonial.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.author}</p>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:bg-gray-50 z-10 rounded-full h-10 w-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:bg-gray-50 z-10 rounded-full h-10 w-10"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'w-8 bg-pharma-primary' : 'w-2 bg-gray-300'
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
