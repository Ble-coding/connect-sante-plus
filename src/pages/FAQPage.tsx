
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useQuery } from '@tanstack/react-query';
import { faqService } from '@/lib/api/services';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['faq-categories'],
    queryFn: () => faqService.getCategories(),
  });

  const { data: questionsData } = useQuery({
    queryKey: ['faq-questions', searchQuery],
    queryFn: () => faqService.getQuestions({ search: searchQuery }),
    enabled: !!searchQuery,
  });

  const faqCategories = categoriesData?.data?.results || categoriesData?.data || [];

  // Filtrer les catégories selon la recherche
  const filteredCategories = faqCategories
    .map((category: any) => ({
      ...category,
      questions: (category.questions || []).filter((qa: any) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          qa.question?.toLowerCase().includes(query) ||
          qa.answer?.toLowerCase().includes(query)
        );
      })
    }))
    .filter((category: any) => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-pharma-light to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pharma-primary/10 mb-6">
                <HelpCircle className="h-8 w-8 text-pharma-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-primary">
                Questions fréquemment posées
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Trouvez rapidement les réponses à vos questions sur Pharma Africa Connect
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            {isLoading ? (
              <div className="text-center py-12">
                <p>Chargement des questions...</p>
              </div>
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((category: any, categoryIndex: number) => (
                <motion.div
                  key={category.id || category.title}
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-pharma-primary">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((qa: any, index: number) => (
                      <AccordionItem
                        key={qa.id || index}
                        value={`${category.id || category.title}-${qa.id || index}`}
                        className="border border-gray-200 rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                          {qa.question || qa.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                          {qa.answer || qa.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {searchQuery 
                    ? `Aucune question trouvée pour "${searchQuery}". Essayez avec d'autres mots-clés.`
                    : 'Aucune question disponible.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-pharma-light">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-pharma-primary">
                Vous ne trouvez pas la réponse ?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Notre équipe de support est là pour vous aider
              </p>
              <a href="/support">
                <Button size="lg" className="bg-pharma-primary hover:bg-pharma-primary/90 text-white">
                  Contacter le support
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;

