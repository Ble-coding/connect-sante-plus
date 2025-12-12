
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/lib/api/services';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: postData, isLoading } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => blogService.getById(Number(id)),
    enabled: !!id,
  });

  const { data: allPostsData } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => blogService.getAll(),
  });

  const post = postData?.data;
  const allPosts = allPostsData?.data?.results || allPostsData?.data || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatAuthorName = (author: any) => {
    if (!author) return 'Auteur';
    if (typeof author === 'string') return author;
    return `${author.first_name} ${author.last_name}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="text-center">
            <p>Chargement de l'article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                    {formatAuthorName(post.author)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.read_time || '5 min'} de lecture
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
                {post.image && (
                  <div className="mb-8">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="rounded-xl w-full h-96 object-cover"
                    />
                  </div>
                )}
                
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
                {allPosts
                  .filter((p: any) => p.id !== post.id && p.category === post.category)
                  .slice(0, 3)
                  .map((relatedPost: any) => (
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
                            src={relatedPost.image || '/placeholder.svg'}
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
                            <span>{relatedPost.published_at ? formatDate(relatedPost.published_at) : formatDate(relatedPost.created_at)}</span>
                            <span>•</span>
                            <span>{relatedPost.read_time || '5 min'}</span>
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

