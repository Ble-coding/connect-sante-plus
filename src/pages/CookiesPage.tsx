
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookiesPage = () => {
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
                <Cookie className="h-8 w-8 text-pharma-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-primary">
                Politique des cookies
              </h1>
              <p className="text-xl text-gray-600">
                Dernière mise à jour : 15 Janvier 2024
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            <motion.div
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">1. Qu'est-ce qu'un cookie ?</h2>
                  <p>
                    Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez 
                    un site web. Les cookies permettent au site de reconnaître votre appareil et de mémoriser certaines informations sur vos 
                    préférences ou actions passées.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">2. Comment utilisons-nous les cookies ?</h2>
                  <p className="mb-4">
                    Pharma Africa Connect utilise des cookies pour améliorer votre expérience sur notre plateforme. Nous utilisons les cookies 
                    pour :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mémoriser vos préférences et paramètres</li>
                    <li>Maintenir votre session connectée</li>
                    <li>Analyser l'utilisation de la plateforme</li>
                    <li>Améliorer la sécurité</li>
                    <li>Personnaliser votre expérience</li>
                    <li>Fournir des fonctionnalités essentielles</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">3. Types de cookies que nous utilisons</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Cookies essentiels</h3>
                  <p className="mb-4">
                    Ces cookies sont nécessaires au fonctionnement de la plateforme. Ils permettent des fonctionnalités de base comme la 
                    navigation et l'accès aux zones sécurisées.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Exemples :</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Cookies de session pour maintenir votre connexion</li>
                      <li>Cookies de sécurité pour prévenir les fraudes</li>
                      <li>Cookies de préférences linguistiques</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Cookies de performance</h3>
                  <p className="mb-4">
                    Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site en collectant des informations anonymes.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Exemples :</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Nombre de visiteurs</li>
                      <li>Pages les plus visitées</li>
                      <li>Temps passé sur le site</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Cookies de fonctionnalité</h3>
                  <p className="mb-4">
                    Ces cookies permettent à la plateforme de se souvenir de vos choix et de fournir des fonctionnalités améliorées.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Exemples :</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Préférences de langue</li>
                      <li>Paramètres d'affichage</li>
                      <li>Informations de géolocalisation</li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Cookies de ciblage/publicité</h3>
                  <p className="mb-4">
                    Ces cookies peuvent être utilisés pour vous montrer des publicités pertinentes sur notre plateforme ou sur d'autres sites.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">4. Cookies tiers</h2>
                  <p className="mb-4">
                    Certains cookies sont placés par des services tiers qui apparaissent sur nos pages. Nous n'avons pas le contrôle sur ces cookies. 
                    Les principaux services tiers que nous utilisons incluent :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Google Analytics :</strong> Pour analyser l'utilisation du site</li>
                    <li><strong>Services de paiement :</strong> Pour traiter les transactions</li>
                    <li><strong>Services de cartographie :</strong> Pour la géolocalisation</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">5. Durée de conservation</h2>
                  <p className="mb-4">Les cookies peuvent être :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cookies de session :</strong> Supprimés lorsque vous fermez votre navigateur</li>
                    <li><strong>Cookies persistants :</strong> Restent sur votre appareil pendant une période déterminée ou jusqu'à ce que vous les supprimiez</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">6. Gestion des cookies</h2>
                  <p className="mb-4">
                    Vous pouvez contrôler et gérer les cookies de plusieurs façons :
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Paramètres du navigateur</h3>
                  <p className="mb-4">
                    La plupart des navigateurs vous permettent de refuser ou d'accepter les cookies, et de supprimer les cookies existants. 
                    Voici comment procéder pour les principaux navigateurs :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                    <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                    <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                    <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Paramètres de la plateforme</h3>
                  <p>
                    Vous pouvez également gérer vos préférences de cookies directement depuis votre compte sur la plateforme.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">7. Conséquences du refus des cookies</h2>
                  <p>
                    Si vous choisissez de désactiver les cookies, certaines fonctionnalités de la plateforme peuvent ne pas fonctionner 
                    correctement. Les cookies essentiels sont nécessaires pour certaines fonctionnalités de base comme la connexion à votre compte.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">8. Cookies et données personnelles</h2>
                  <p>
                    Certains cookies peuvent collecter des informations personnelles. Pour plus d'informations sur la façon dont nous traitons 
                    vos données personnelles, consultez notre <a href="/privacy" className="text-pharma-primary hover:underline">Politique de confidentialité</a>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">9. Modifications de cette politique</h2>
                  <p>
                    Nous pouvons mettre à jour cette politique des cookies de temps à autre. Nous vous informerons de tout changement 
                    significatif en publiant la nouvelle politique sur cette page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">10. Contact</h2>
                  <p>
                    Si vous avez des questions concernant notre utilisation des cookies, contactez-nous :
                  </p>
                  <p className="mt-4">
                    <strong>Email :</strong> Info@pharmafriconnect.africa<br />
                    <strong>Téléphone :</strong> +225 12 345 678
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cookie Preferences CTA */}
        <section className="py-16 bg-pharma-light">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-pharma-primary">
                Gérer vos préférences de cookies
              </h2>
              <p className="text-gray-600 mb-6">
                Personnalisez les cookies que vous acceptez sur notre plateforme
              </p>
              <Button 
                size="lg" 
                className="bg-pharma-primary hover:bg-pharma-primary/90 text-white"
                onClick={() => {
                  // Ici vous pouvez ajouter la logique pour ouvrir le panneau de gestion des cookies
                  alert('Fonctionnalité de gestion des cookies à implémenter');
                }}
              >
                Gérer les cookies
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPage;

