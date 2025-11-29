
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Comment accéder aux soins de santé en zone rurale',
    excerpt: 'Découvrez comment Pharma Africa Connect facilite l\'accès aux soins de santé dans les zones rurales grâce à la télémédecine.',
    author: 'Dr. Sophia Martin',
    date: '15 Janvier 2024',
    category: 'Santé',
    image: '/OIP15.webp'
  },
  {
    id: 2,
    title: 'La digitalisation de la santé en Afrique de l\'Ouest',
    excerpt: 'Un aperçu de l\'évolution de la santé digitale en Afrique de l\'Ouest et de son impact sur l\'accès aux soins.',
    author: 'Thomas Diallo',
    date: '10 Janvier 2024',
    category: 'Technologie',
    image: '/sante.webp'
  },
  {
    id: 3,
    title: 'Gérer vos ordonnances électroniques facilement',
    excerpt: 'Apprenez à utiliser les ordonnances électroniques pour simplifier vos prescriptions et améliorer le suivi des traitements.',
    author: 'Dr. Robert Chen',
    date: '5 Janvier 2024',
    category: 'Guide',
    image: '/image.png'
  },
  {
    id: 4,
    title: 'Les avantages de la téléconsultation médicale',
    excerpt: 'Explorez les nombreux avantages de la consultation médicale à distance et comment elle transforme l\'accès aux soins.',
    author: 'Aminata Koné',
    date: '28 Décembre 2023',
    category: 'Santé',
    image: '/th1.webp'
  },
  {
    id: 5,
    title: 'Sécurité et confidentialité des données médicales',
    excerpt: 'Comprendre les mesures de sécurité mises en place pour protéger vos données de santé personnelles.',
    author: 'Thomas Diallo',
    date: '20 Décembre 2023',
    category: 'Sécurité',
    image: '/OIP15.webp'
  },
  {
    id: 6,
    title: 'Trouver une pharmacie ouverte 24/7 près de chez vous',
    excerpt: 'Guide pratique pour localiser rapidement une pharmacie ouverte et vérifier la disponibilité des médicaments.',
    author: 'Dr. Sophia Martin',
    date: '15 Décembre 2023',
    category: 'Guide',
    image: '/sante.webp'
  }
];

const categories = ['Tous', 'Santé', 'Technologie', 'Guide', 'Sécurité'];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('Tous');

  const filteredPosts = selectedCategory === 'Tous' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-primary">
                Blog Pharma Africa Connect
              </h1>
              <p className="text-xl text-gray-600">
                Découvrez les dernières actualités, guides et conseils sur la santé digitale en Afrique de l'Ouest
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category 
                    ? "bg-pharma-primary text-white" 
                    : "border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-pharma-primary text-white text-xs font-medium rounded-full flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                      </div>
                      <Link to={`/blog/${post.id}`}>
                        <Button variant="outline" className="w-full border-pharma-primary text-pharma-primary hover:bg-pharma-primary/10">
                          Lire la suite
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
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;

