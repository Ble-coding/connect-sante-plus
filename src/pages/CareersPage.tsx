
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, Users, Heart, Code, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const jobOpenings = [
  {
    id: 1,
    title: 'Développeur Full Stack',
    department: 'Technologie',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'Temps plein',
    salary: 'Compétitif',
    description: 'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe technique et contribuer au développement de notre plateforme de santé digitale.',
    requirements: [
      'Minimum 3 ans d\'expérience en développement web',
      'Maîtrise de React, Node.js et TypeScript',
      'Expérience avec les bases de données (PostgreSQL, MongoDB)',
      'Connaissance des bonnes pratiques de sécurité'
    ],
    icon: Code
  },
  {
    id: 2,
    title: 'Responsable Support Client',
    department: 'Support',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'Temps plein',
    salary: 'Compétitif',
    description: 'Rejoignez notre équipe support pour aider nos utilisateurs et garantir leur satisfaction.',
    requirements: [
      'Expérience en support client',
      'Excellentes compétences en communication',
      'Maîtrise du français et de l\'anglais',
      'Sens du service client'
    ],
    icon: Users
  },
  {
    id: 3,
    title: 'Spécialiste Sécurité des Données',
    department: 'Sécurité',
    location: 'Remote / Abidjan',
    type: 'Temps plein',
    salary: 'Compétitif',
    description: 'Assurez la sécurité et la conformité de nos systèmes de données de santé.',
    requirements: [
      'Expérience en cybersécurité',
      'Connaissance des normes de protection des données de santé',
      'Certifications en sécurité (un plus)',
      'Expérience avec les audits de sécurité'
    ],
    icon: Shield
  },
  {
    id: 4,
    title: 'Médecin Conseiller',
    department: 'Médical',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'Temps partiel',
    salary: 'Compétitif',
    description: 'Apportez votre expertise médicale pour améliorer nos services de téléconsultation.',
    requirements: [
      'Diplôme de médecine reconnu',
      'Expérience en télémédecine (un plus)',
      'Bonne compréhension des technologies de santé',
      'Disponibilité flexible'
    ],
    icon: Heart
  }
];

const benefits = [
  {
    title: 'Salaire compétitif',
    description: 'Rémunération attractive avec primes de performance'
  },
  {
    title: 'Télétravail flexible',
    description: 'Possibilité de travailler à distance selon le poste'
  },
  {
    title: 'Formation continue',
    description: 'Accès à des formations et certifications professionnelles'
  },
  {
    title: 'Assurance santé',
    description: 'Couverture santé complète pour vous et votre famille'
  },
  {
    title: 'Équipe dynamique',
    description: 'Rejoignez une équipe passionnée et innovante'
  },
  {
    title: 'Impact social',
    description: 'Contribuez à améliorer l\'accès aux soins en Afrique'
  }
];

const CareersPage = () => {
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
                <Briefcase className="h-8 w-8 text-pharma-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-primary">
                Rejoignez Notre Équipe
              </h1>
              <p className="text-xl text-gray-600">
                Nous sommes toujours à la recherche de talents passionnés pour nous aider à transformer 
                l'accès aux soins de santé en Afrique de l'Ouest.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Pourquoi nous rejoindre ?</h2>
              <p className="text-xl text-gray-600">
                Découvrez les avantages de faire partie de l'équipe Pharma Africa Connect
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-pharma-primary">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Postes ouverts</h2>
              <p className="text-xl text-gray-600">
                Consultez nos offres d'emploi actuelles et postulez dès aujourd'hui
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-pharma-light flex items-center justify-center flex-shrink-0">
                            <job.icon className="h-6 w-6 text-pharma-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-2 text-pharma-primary">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.department}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {job.salary}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {job.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-gray-900">Exigences :</h4>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link to="/contact">
                        <Button className="bg-pharma-primary hover:bg-pharma-primary/90 text-white">
                          Postuler maintenant
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-pharma-primary text-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Vous ne trouvez pas le poste idéal ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Envoyez-nous votre candidature spontanée. Nous gardons votre profil pour de futures opportunités.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-pharma-primary hover:bg-white/90">
                  Candidature spontanée
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;

