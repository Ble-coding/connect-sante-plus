
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPage = () => {
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
                <Shield className="h-8 w-8 text-pharma-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-primary">
                Politique de confidentialité
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
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">1. Introduction</h2>
                  <p>
                    Pharma Africa Connect ("nous", "notre", "nos") s'engage à protéger votre vie privée. Cette politique de confidentialité 
                    explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque vous utilisez 
                    notre plateforme.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">2. Informations que nous collectons</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Informations personnelles</h3>
                  <p className="mb-4">Nous collectons les informations suivantes :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nom, prénom, date de naissance</li>
                    <li>Adresse email et numéro de téléphone</li>
                    <li>Adresse postale</li>
                    <li>Informations de paiement (cryptées)</li>
                    <li>Informations médicales nécessaires aux services</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Informations techniques</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Adresse IP</li>
                    <li>Type de navigateur et système d'exploitation</li>
                    <li>Pages visitées et temps passé</li>
                    <li>Données de géolocalisation (avec votre consentement)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">3. Comment nous utilisons vos informations</h2>
                  <p className="mb-4">Nous utilisons vos informations pour :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fournir et améliorer nos services</li>
                    <li>Faciliter les consultations médicales et les prescriptions</li>
                    <li>Communiquer avec vous concernant votre compte et nos services</li>
                    <li>Envoyer des notifications importantes</li>
                    <li>Personnaliser votre expérience utilisateur</li>
                    <li>Assurer la sécurité de la plateforme</li>
                    <li>Respecter nos obligations légales</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">4. Partage de vos informations</h2>
                  <p className="mb-4">Nous ne vendons jamais vos informations personnelles. Nous pouvons partager vos informations avec :</p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Professionnels de santé</h3>
                  <p>
                    Les informations médicales nécessaires sont partagées avec les professionnels de santé que vous consultez, 
                    uniquement avec votre consentement explicite.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Pharmacies partenaires</h3>
                  <p>
                    Les informations nécessaires pour traiter vos ordonnances sont partagées avec les pharmacies que vous choisissez.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Prestataires de services</h3>
                  <p>
                    Nous pouvons partager certaines informations avec des prestataires tiers qui nous aident à exploiter la plateforme 
                    (hébergement, paiement, analyse), sous contrat de confidentialité strict.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Obligations légales</h3>
                  <p>
                    Nous pouvons divulguer vos informations si la loi l'exige ou pour protéger nos droits et notre sécurité.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">5. Sécurité des données</h2>
                  <p className="mb-4">
                    Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles strictes pour protéger vos données :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chiffrement SSL/TLS pour toutes les transmissions</li>
                    <li>Chiffrement des données sensibles au repos</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Surveillance continue des systèmes</li>
                    <li>Sauvegardes régulières et sécurisées</li>
                    <li>Formation du personnel sur la confidentialité</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">6. Conservation des données</h2>
                  <p>
                    Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter 
                    nos obligations légales. Les données médicales sont conservées conformément aux exigences légales en matière de 
                    dossiers médicaux.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">7. Vos droits</h2>
                  <p className="mb-4">Vous avez le droit de :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Accéder à vos données personnelles</li>
                    <li>Corriger des données inexactes</li>
                    <li>Demander la suppression de vos données</li>
                    <li>Vous opposer au traitement de vos données</li>
                    <li>Demander la portabilité de vos données</li>
                    <li>Retirer votre consentement à tout moment</li>
                    <li>Déposer une plainte auprès de l'autorité de protection des données</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer ces droits, contactez-nous à Info@pharmafriconnect.africa
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">8. Cookies et technologies similaires</h2>
                  <p>
                    Nous utilisons des cookies et technologies similaires pour améliorer votre expérience. 
                    Consultez notre <a href="/cookies" className="text-pharma-primary hover:underline">Politique des cookies</a> pour plus d'informations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">9. Modifications de cette politique</h2>
                  <p>
                    Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page 
                    avec une date de mise à jour révisée. Nous vous encourageons à consulter régulièrement cette page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-pharma-primary">10. Contact</h2>
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou le traitement de vos données, contactez-nous :
                  </p>
                  <p className="mt-4">
                    <strong>Email :</strong> Info@pharmafriconnect.africa<br />
                    <strong>Téléphone :</strong> +225 12 345 678<br />
                    <strong>Adresse :</strong> [Votre adresse]
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

export default PrivacyPage;

