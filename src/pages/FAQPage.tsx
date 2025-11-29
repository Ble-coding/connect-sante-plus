
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqCategories = [
  {
    title: 'Général',
    questions: [
      {
        q: 'Qu\'est-ce que Pharma Africa Connect ?',
        a: 'Pharma Africa Connect est une plateforme digitale qui facilite l\'accès aux soins de santé en connectant patients, professionnels de santé et pharmacies sur une plateforme unique. Nous offrons des services de téléconsultation, recherche de pharmacies, gestion d\'ordonnances électroniques et bien plus encore.'
      },
      {
        q: 'Comment puis-je m\'inscrire sur la plateforme ?',
        a: 'L\'inscription est simple et gratuite. Cliquez sur le bouton "S\'inscrire" en haut de la page, remplissez le formulaire avec vos informations personnelles, et validez votre compte via l\'email de confirmation que vous recevrez.'
      },
      {
        q: 'La plateforme est-elle gratuite ?',
        a: 'L\'inscription et l\'accès de base à la plateforme sont gratuits. Certains services comme les téléconsultations peuvent avoir des frais, mais nous offrons des tarifs compétitifs et transparents.'
      },
      {
        q: 'Dans quels pays la plateforme est-elle disponible ?',
        a: 'Pharma Africa Connect est actuellement disponible en Afrique de l\'Ouest, avec une expansion prévue dans d\'autres régions. Vérifiez notre page d\'accueil pour les pays actuellement couverts.'
      }
    ]
  },
  {
    title: 'Pour les patients',
    questions: [
      {
        q: 'Comment puis-je trouver une pharmacie près de chez moi ?',
        a: 'Utilisez notre fonction de recherche de pharmacies sur la page d\'accueil. Vous pouvez rechercher par localisation, vérifier les horaires d\'ouverture et la disponibilité des médicaments en temps réel.'
      },
      {
        q: 'Comment fonctionne la téléconsultation ?',
        a: 'La téléconsultation vous permet de consulter un médecin à distance via vidéo, audio ou chat. Prenez rendez-vous, connectez-vous à l\'heure prévue, et recevez votre ordonnance électronique directement sur la plateforme.'
      },
      {
        q: 'Mes données médicales sont-elles sécurisées ?',
        a: 'Absolument. Nous utilisons un cryptage de niveau bancaire pour protéger toutes vos données médicales. Nous respectons strictement les réglementations sur la confidentialité des données de santé.'
      },
      {
        q: 'Comment puis-je recevoir mes ordonnances électroniques ?',
        a: 'Après une consultation, votre médecin peut vous envoyer une ordonnance électronique directement sur votre compte. Vous pouvez la présenter dans n\'importe quelle pharmacie partenaire ou la télécharger en format PDF.'
      }
    ]
  },
  {
    title: 'Pour les professionnels de santé',
    questions: [
      {
        q: 'Comment puis-je rejoindre la plateforme en tant que médecin ?',
        a: 'Les médecins peuvent s\'inscrire en sélectionnant "Professionnel de santé" lors de l\'inscription. Vous devrez fournir vos qualifications et documents professionnels pour validation.'
      },
      {
        q: 'Comment gérer mes consultations en ligne ?',
        a: 'Notre tableau de bord médical vous permet de gérer votre calendrier, consulter vos patients, accéder aux dossiers médicaux (avec autorisation), et prescrire des médicaments électroniquement.'
      },
      {
        q: 'Quels sont les tarifs pour les professionnels ?',
        a: 'Nous proposons différents plans d\'abonnement pour les professionnels de santé. Contactez-nous pour obtenir des informations détaillées sur nos tarifs et fonctionnalités.'
      }
    ]
  },
  {
    title: 'Pour les pharmacies',
    questions: [
      {
        q: 'Comment ma pharmacie peut-elle rejoindre la plateforme ?',
        a: 'Les pharmacies peuvent s\'inscrire en sélectionnant "Pharmacie" lors de l\'inscription. Vous devrez fournir les documents de licence et informations sur votre établissement.'
      },
      {
        q: 'Comment mettre à jour mon inventaire de médicaments ?',
        a: 'Notre système vous permet de mettre à jour votre inventaire en temps réel. Vous pouvez ajouter, modifier ou retirer des médicaments directement depuis votre tableau de bord.'
      },
      {
        q: 'Comment recevoir les ordonnances électroniques ?',
        a: 'Les ordonnances électroniques sont automatiquement reçues dans votre tableau de bord. Vous pouvez les consulter, préparer les médicaments et notifier le patient lorsque la commande est prête.'
      }
    ]
  },
  {
    title: 'Support technique',
    questions: [
      {
        q: 'J\'ai oublié mon mot de passe, que faire ?',
        a: 'Cliquez sur "Mot de passe oublié" sur la page de connexion. Vous recevrez un email avec un lien pour réinitialiser votre mot de passe.'
      },
      {
        q: 'Comment contacter le support client ?',
        a: 'Vous pouvez nous contacter via le formulaire de contact sur la page Support, par email à Info@pharmafriconnect.africa, ou par téléphone au +225 12 345 678.'
      },
      {
        q: 'La plateforme fonctionne-t-elle sur mobile ?',
        a: 'Oui, Pharma Africa Connect est entièrement responsive et fonctionne parfaitement sur smartphones, tablettes et ordinateurs. Une application mobile est également en développement.'
      }
    ]
  }
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(qa => 
      qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
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
                    {category.questions.map((qa, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.title}-${index}`}
                        className="border border-gray-200 rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                          {qa.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                          {qa.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Aucune question trouvée pour "{searchQuery}". Essayez avec d'autres mots-clés.
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

