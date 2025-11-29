
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuler l'envoi de l'email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 bg-gradient-to-b from-pharma-light to-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-xl">
                <CardHeader className="space-y-1 text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-pharma-light flex items-center justify-center">
                    <Lock className="h-8 w-8 text-pharma-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Mot de passe oublié ?</CardTitle>
                  <CardDescription>
                    {isSubmitted 
                      ? 'Vérifiez votre boîte mail pour réinitialiser votre mot de passe'
                      : 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        Email envoyé !
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
                      </p>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                          Vous n'avez pas reçu l'email ? Vérifiez votre dossier spam ou
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setIsSubmitted(false);
                            setEmail('');
                          }}
                        >
                          Réessayer
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Adresse email</Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-pharma-primary hover:bg-pharma-primary/90 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                      </Button>
                    </form>
                  )}

                  <div className="mt-6 text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center text-sm text-pharma-primary hover:underline"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour à la connexion
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Besoin d'aide ?{' '}
                  <Link to="/support" className="text-pharma-primary hover:underline">
                    Contactez le support
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;

