
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuler l'authentification
    setTimeout(() => {
      // Déterminer le type d'utilisateur (insensible à la casse)
      const emailLower = email.toLowerCase().trim();
      let userType = 'patient';
      let dashboardPath = '/dashboard';
      
      // Vérifier dans l'ordre de priorité (admin > doctor > pharmacy > patient)
      if (emailLower.includes('admin')) {
        userType = 'admin';
        dashboardPath = '/admin-dashboard';
      } else if (emailLower.includes('doctor') || emailLower.includes('dr') || emailLower.includes('medecin') || emailLower.includes('médecin')) {
        userType = 'doctor';
        dashboardPath = '/doctor-dashboard';
      } else if (emailLower.includes('pharmacy') || emailLower.includes('pharmacie') || emailLower.includes('pharmacien')) {
        userType = 'pharmacy';
        dashboardPath = '/pharmacy-dashboard';
      }
      
      // Debug: afficher dans la console pour vérifier
      console.log('=== CONNEXION ===');
      console.log('Email saisi:', email);
      console.log('Email en minuscules:', emailLower);
      console.log('UserType détecté:', userType);
      console.log('Dashboard path:', dashboardPath);
      console.log('================');
      
      // Extraire le prénom depuis l'email si pas fourni, ou utiliser le prénom saisi
      let userName = firstName.trim();
      if (!userName && email) {
        // Essayer d'extraire un nom depuis l'email (avant le @)
        const emailName = email.split('@')[0];
        // Capitaliser la première lettre
        userName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      }
      if (!userName) {
        userName = 'Utilisateur'; // Nom par défaut
      }
      
      // Créer la session utilisateur
      const session = {
        email,
        firstName: userName,
        userType,
        loginTime: new Date().toISOString(),
        rememberMe
      };
      
      // Sauvegarder la session AVANT la navigation
      localStorage.setItem('pharmafriconnect_user_session', JSON.stringify(session));
      
      // Si "Se souvenir de moi", sauvegarder aussi l'email
      if (rememberMe) {
        localStorage.setItem('pharmafriconnect_remembered_email', email);
      } else {
        localStorage.removeItem('pharmafriconnect_remembered_email');
      }
      
      toast({
        title: "Connexion réussie",
        description: `Vous êtes maintenant connecté en tant que ${userType}.`,
      });
      
      setIsLoading(false);
      
      // Utiliser window.location.href directement pour garantir la navigation
      console.log('Redirection vers:', dashboardPath);
      window.location.href = dashboardPath;
    }, 1500);
  };
  
  // Charger l'email sauvegardé si "Se souvenir de moi" était coché
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('pharmafriconnect_remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Demo: utilisez "admin@", "doctor@", "pharmacy@" ou "patient@" pour tester les différents tableaux de bord
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom (optionnel)</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Votre prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Si non renseigné, un nom sera généré depuis votre email
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
