
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/lib/api/auth';
import { STORAGE_KEYS } from '@/lib/api/config';

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authService.login({ username, password });
      const userType = response.user.user_type;
      
      // Déterminer le chemin du dashboard selon le type d'utilisateur
      let dashboardPath = '/dashboard';
      if (userType === 'admin') {
        dashboardPath = '/admin-dashboard';
      } else if (userType === 'doctor') {
        dashboardPath = '/doctor-dashboard';
      } else if (userType === 'pharmacist') {
        dashboardPath = '/pharmacy-dashboard';
      }
      
      // Si "Se souvenir de moi", sauvegarder aussi l'username
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, username);
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
      }
      
      toast({
        title: "Connexion réussie",
        description: `Vous êtes maintenant connecté en tant que ${userType}.`,
      });
      
      // Rediriger vers le dashboard approprié
      window.location.href = dashboardPath;
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Erreur de connexion. Vérifiez vos identifiants.';
      
      if (error.response) {
        // Erreur de l'API
        if (error.response.data) {
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else if (error.response.data.non_field_errors) {
            errorMessage = error.response.data.non_field_errors[0];
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.request) {
        errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion.';
      }
      
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  // Charger l'username sauvegardé si "Se souvenir de moi" était coché
  React.useEffect(() => {
    const rememberedUsername = localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL);
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-muted-foreground mt-2">
          Connectez-vous à votre compte Pharma Africa Connect
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            type="text"
            placeholder="Votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Utilisez votre nom d'utilisateur pour vous connecter
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-pharma-primary hover:underline"
            >
              Mot de passe oublié?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(!!checked)} 
          />
          <Label htmlFor="remember" className="text-sm font-normal">Se souvenir de moi</Label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-pharma-primary hover:bg-pharma-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou
          </span>
        </div>
      </div>
      
      <div className="text-center text-sm">
        Vous n'avez pas de compte?{" "}
        <Link to="/register" className="text-pharma-primary hover:underline">
          Créer un compte
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
