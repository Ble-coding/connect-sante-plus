
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Données des articles (en production, cela viendrait d'une API)
const blogPosts: Record<number, {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}> = {
  1: {
    id: 1,
    title: 'Comment accéder aux soins de santé en zone rurale',
    content: `
      <p class="mb-4">L'accès aux soins de santé dans les zones rurales reste un défi majeur en Afrique de l'Ouest. 
      Pharma Africa Connect s'engage à combler ce fossé grâce à la technologie.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Les défis de l'accès aux soins en zone rurale</h2>
      <p class="mb-4">Les populations rurales font face à de nombreux obstacles : distances importantes, 
      manque de professionnels de santé, coûts de transport élevés, et manque d'information sur les services disponibles.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">La solution : la télémédecine</h2>
      <p class="mb-4">Grâce à Pharma Africa Connect, les patients en zone rurale peuvent désormais :</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Consulter un médecin à distance via vidéo ou téléphone</li>
        <li>Recevoir des ordonnances électroniques directement sur leur téléphone</li>
        <li>Trouver les pharmacies les plus proches avec géolocalisation</li>
        <li>Bénéficier de rappels de traitement personnalisés</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Impact et résultats</h2>
      <p class="mb-4">Depuis le lancement de notre plateforme, nous avons constaté une augmentation de 68% 
      de l'accès aux soins dans les zones rurales. Les patients économisent en moyenne 3 heures de trajet 
      par consultation et réduisent leurs dépenses de transport de 40%.</p>
      
      <p class="mb-4">La santé digitale n'est plus un luxe, c'est une nécessité pour garantir l'accès équitable 
      aux soins pour tous, partout en Afrique de l'Ouest.</p>
    `,
    author: 'Dr. Sophia Martin',
    date: '15 Janvier 2024',
    category: 'Santé',
    image: '/OIP15.webp',
    readTime: '5 min'
  },
  2: {
    id: 2,
    title: 'La digitalisation de la santé en Afrique de l\'Ouest',
    content: `
      <p class="mb-4">La transformation digitale du secteur de la santé en Afrique de l'Ouest connaît une 
      accélération sans précédent. Pharma Africa Connect est au cœur de cette révolution.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">L'évolution du paysage sanitaire</h2>
      <p class="mb-4">Avec l'augmentation de la pénétration mobile et internet, de nouvelles opportunités 
      émergent pour améliorer l'accès aux soins. Les plateformes digitales permettent de connecter 
      patients, médecins et pharmacies comme jamais auparavant.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Les technologies clés</h2>
      <p class="mb-4">Notre plateforme utilise les dernières technologies pour offrir une expérience optimale :</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Géolocalisation en temps réel pour trouver les services de santé</li>
        <li>Visioconférence sécurisée pour les consultations</li>
        <li>Blockchain pour la sécurité des données médicales</li>
        <li>IA pour l'analyse prédictive et les recommandations</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">L'avenir de la santé digitale</h2>
      <p class="mb-4">Nous prévoyons une adoption encore plus large dans les années à venir, avec l'intégration 
      de nouvelles fonctionnalités comme la télésurveillance, les objets connectés médicaux, et l'intelligence 
      artificielle pour le diagnostic assisté.</p>
    `,
    author: 'Thomas Diallo',
    date: '10 Janvier 2024',
    category: 'Technologie',
    image: '/sante.webp',
    readTime: '6 min'
  },
  3: {
    id: 3,
    title: 'Gérer vos ordonnances électroniques facilement',
    content: `
      <p class="mb-4">Les ordonnances électroniques révolutionnent la façon dont nous gérons nos prescriptions 
      médicales. Découvrez comment les utiliser efficacement.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Avantages des ordonnances électroniques</h2>
      <p class="mb-4">Les ordonnances numériques offrent de nombreux avantages :</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Accessibilité 24/7 depuis votre téléphone</li>
        <li>Pas de risque de perte ou d'oubli</li>
        <li>Transmission instantanée aux pharmacies</li>
        <li>Historique complet de vos prescriptions</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Comment utiliser les ordonnances électroniques</h2>
      <p class="mb-4">Après une consultation, votre médecin peut vous envoyer une ordonnance électronique 
      directement sur votre compte. Vous pouvez ensuite la présenter dans n'importe quelle pharmacie 
      partenaire ou la télécharger en format PDF.</p>
    `,
    author: 'Dr. Robert Chen',
    date: '5 Janvier 2024',
    category: 'Guide',
    image: '/image.png',
    readTime: '4 min'
  },
  4: {
    id: 4,
    title: 'Les avantages de la téléconsultation médicale',
    content: `
      <p class="mb-4">La téléconsultation médicale transforme l'accès aux soins en permettant des consultations 
      à distance de qualité.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Pourquoi choisir la téléconsultation ?</h2>
      <p class="mb-4">La consultation à distance offre de nombreux avantages : gain de temps, réduction des 
      coûts de transport, accès à des spécialistes, et flexibilité horaire.</p>
    `,
    author: 'Aminata Koné',
    date: '28 Décembre 2023',
    category: 'Santé',
    image: '/th1.webp',
    readTime: '5 min'
  },
  5: {
    id: 5,
    title: 'Sécurité et confidentialité des données médicales',
    content: `
      <p class="mb-4">La protection des données médicales est une priorité absolue pour Pharma Africa Connect.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Nos mesures de sécurité</h2>
      <p class="mb-4">Nous utilisons un chiffrement de niveau bancaire et respectons toutes les normes 
      internationales de protection des données de santé.</p>
    `,
    author: 'Thomas Diallo',
    date: '20 Décembre 2023',
    category: 'Sécurité',
    image: '/OIP15.webp',
    readTime: '6 min'
  },
  6: {
    id: 6,
    title: 'Trouver une pharmacie ouverte 24/7 près de chez vous',
    content: `
      <p class="mb-4">Notre système de géolocalisation vous permet de trouver rapidement une pharmacie 
      ouverte, même en cas d'urgence.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Comment ça marche ?</h2>
      <p class="mb-4">Utilisez notre fonction de recherche pour localiser les pharmacies à proximité, 
      vérifier leurs horaires d'ouverture et la disponibilité des médicaments en temps réel.</p>
    `,
    author: 'Dr. Sophia Martin',
    date: '15 Décembre 2023',
    category: 'Guide',
    image: '/sante.webp',
    readTime: '3 min'
  }
};

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? blogPosts[parseInt(id)] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas.</p>
            <Link to="/blog">
              <Button>Retour au blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-pharma-light to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/blog">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour au blog
                </Button>
              </Link>
              
              <div className="max-w-4xl mx-auto">
                <motion.span 
                  className="px-4 py-1.5 text-sm font-medium bg-white text-pharma-primary rounded-full inline-block mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Tag className="h-3 w-3 inline mr-2" />
                  {post.category}
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold mb-6 text-pharma-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {post.title}
                </motion.h1>
                
                <motion.div 
                  className="flex flex-wrap items-center gap-6 text-gray-600 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime} de lecture
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-xl w-full h-96 object-cover"
                  />
                </div>
                
                <Card className="p-8 md:p-12">
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Partager :</span>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Partager
                        </Button>
                      </div>
                      <Link to="/blog">
                        <Button variant="outline">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Retour au blog
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Articles similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {Object.values(blogPosts)
                  .filter(p => p.id !== post.id && p.category === post.category)
                  .slice(0, 3)
                  .map((relatedPost) => (
                    <motion.div
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6">
                          <span className="text-xs text-pharma-primary font-medium mb-2 block">
                            {relatedPost.category}
                          </span>
                          <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span>{relatedPost.date}</span>
                            <span>•</span>
                            <span>{relatedPost.readTime}</span>
                          </div>
                          <Link to={`/blog/${relatedPost.id}`}>
                            <Button variant="outline" className="w-full">
                              Lire la suite
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;

