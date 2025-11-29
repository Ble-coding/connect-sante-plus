
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Déterminer le type d'utilisateur pour la redirection
    let userTypeValue = 'patient';
    let dashboardPath = '/dashboard';
    
    if (userType === 'doctor' || userType === 'médecin') {
      userTypeValue = 'doctor';
      dashboardPath = '/doctor-dashboard';
    } else if (userType === 'pharmacist' || userType === 'pharmacien') {
      userTypeValue = 'pharmacy';
      dashboardPath = '/pharmacy-dashboard';
    }
    
    // Créer la session utilisateur avec le nom
    const session = {
      email,
      firstName: firstName || 'Utilisateur',
      lastName,
      userType: userTypeValue,
      loginTime: new Date().toISOString(),
      rememberMe: false
    };
    
    // Sauvegarder dans localStorage
    localStorage.setItem('pharmaconnect_user_session', JSON.stringify(session));
    
    // Sauvegarder dans localStorage
    localStorage.setItem('pharmaconnect_user_session', JSON.stringify(session));
    
    // In a real app, this would be an API call to register the user
    // For demo purposes, we'll just simulate a successful registration
    setTimeout(() => {
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-muted-foreground mt-2">
          Rejoignez PharmaConnect pour accéder à nos services
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        
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
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="userType">Je suis</Label>
          <Select
            value={userType}
            onValueChange={setUserType}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre profil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="doctor">Médecin</SelectItem>
              <SelectItem value="pharmacist">Pharmacien</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptTerms} 
            onCheckedChange={(checked) => setAcceptTerms(!!checked)} 
          />
          <Label htmlFor="terms" className="text-sm font-normal">
            J'accepte les{" "}
            <Link to="/terms" className="text-pharma-primary hover:underline">
              conditions d'utilisation
            </Link>{" "}
            et la{" "}
            <Link to="/privacy" className="text-pharma-primary hover:underline">
              politique de confidentialité
            </Link>
          </Label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-pharma-primary hover:bg-pharma-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Inscription en cours..." : "Créer un compte"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        Vous avez déjà un compte?{" "}
        <Link to="/login" className="text-pharma-primary hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
