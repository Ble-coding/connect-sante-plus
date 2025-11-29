
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsPage = () => {
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
                <FileText className="h-8 w-8 text-pharma-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-primary">
                Conditions d'utilisation
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
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">1. Acceptation des conditions</h2>
                  <p>
                    En accédant et en utilisant la plateforme Pharma Africa Connect, vous acceptez d'être lié par ces conditions d'utilisation. 
                    Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">2. Description du service</h2>
                  <p>
                    Pharma Africa Connect est une plateforme digitale qui facilite l'accès aux soins de santé en connectant patients, 
                    professionnels de santé et pharmacies. Nos services incluent, sans s'y limiter :
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Recherche et localisation de pharmacies</li>
                    <li>Téléconsultation médicale</li>
                    <li>Gestion d'ordonnances électroniques</li>
                    <li>Messagerie sécurisée entre patients et professionnels</li>
                    <li>Rappels de traitement et notifications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">3. Inscription et compte utilisateur</h2>
                  <p className="mb-4">
                    Pour utiliser certains services, vous devez créer un compte. Vous vous engagez à :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fournir des informations exactes, complètes et à jour</li>
                    <li>Maintenir la sécurité de votre mot de passe</li>
                    <li>Être responsable de toutes les activités sous votre compte</li>
                    <li>Nous notifier immédiatement de toute utilisation non autorisée</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">4. Utilisation acceptable</h2>
                  <p className="mb-4">Vous acceptez de ne pas :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Utiliser la plateforme à des fins illégales ou non autorisées</li>
                    <li>Violer les droits de propriété intellectuelle</li>
                    <li>Transmettre des virus ou codes malveillants</li>
                    <li>Tenter d'accéder à des zones non autorisées de la plateforme</li>
                    <li>Usurper l'identité d'une autre personne</li>
                    <li>Collecter des informations sur d'autres utilisateurs sans autorisation</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">5. Services médicaux</h2>
                  <p className="mb-4">
                    Pharma Africa Connect facilite la connexion entre patients et professionnels de santé, mais ne fournit pas directement 
                    de services médicaux. Les professionnels de santé sont indépendants et responsables de leurs propres services.
                  </p>
                  <p>
                    Nous ne garantissons pas les résultats des consultations ou traitements. Les décisions médicales doivent être prises en 
                    consultation avec des professionnels de santé qualifiés.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">6. Propriété intellectuelle</h2>
                  <p>
                    Tous les contenus de la plateforme, incluant mais sans s'y limiter les textes, graphiques, logos, icônes, images, 
                    clips audio et logiciels, sont la propriété de Pharma Africa Connect ou de ses fournisseurs de contenu et sont protégés 
                    par les lois sur la propriété intellectuelle.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">7. Limitation de responsabilité</h2>
                  <p className="mb-4">
                    Dans la mesure permise par la loi, Pharma Africa Connect ne sera pas responsable de :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Dommages directs, indirects, accessoires ou consécutifs</li>
                    <li>Perte de données ou d'informations</li>
                    <li>Interruptions de service</li>
                    <li>Erreurs ou omissions dans le contenu</li>
                    <li>Décisions médicales prises sur la base d'informations de la plateforme</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">8. Modifications du service</h2>
                  <p>
                    Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du service à tout moment, 
                    avec ou sans préavis. Nous ne serons pas responsables envers vous ou tout tiers de ces modifications.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">9. Résiliation</h2>
                  <p>
                    Nous nous réservons le droit de résilier ou suspendre votre accès au service immédiatement, sans préavis, 
                    pour toute violation de ces conditions d'utilisation.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">10. Modifications des conditions</h2>
                  <p>
                    Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur 
                    dès leur publication sur la plateforme. Il est de votre responsabilité de consulter régulièrement ces conditions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">11. Droit applicable</h2>
                  <p>
                    Ces conditions sont régies par les lois en vigueur dans les pays où Pharma Africa Connect opère. 
                    Tout litige sera soumis à la juridiction compétente.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">12. Contact</h2>
                  <p>
                    Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à :
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
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;

