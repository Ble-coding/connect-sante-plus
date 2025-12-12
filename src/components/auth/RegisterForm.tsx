
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/lib/api/auth';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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

    if (!captchaValue) {
      toast({
        title: "Erreur",
        description: "Veuillez compléter le captcha.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const registerData: any = {
        username,
        email,
        password,
        password2: confirmPassword,
        first_name: firstName,
        last_name: lastName,
        phone: phone || undefined,
        user_type: userType,
        captcha_token: captchaValue,
      };

      // Ajouter les champs spécifiques selon le type d'utilisateur
      if (userType === 'doctor') {
        if (specialization) registerData.specialization = specialization;
        if (licenseNumber) registerData.license_number = licenseNumber;
      } else if (userType === 'pharmacist') {
        if (licenseNumber) registerData.license_number = licenseNumber;
      }

      const response = await authService.register(registerData);
      
      if (response.requires_verification) {
        setEmailVerificationSent(true);
        toast({
          title: "Email de vérification envoyé",
          description: "Veuillez vérifier votre boîte email et entrer le code de vérification.",
        });
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Vous êtes maintenant connecté.",
      });
      
      // Rediriger vers le dashboard approprié
      let dashboardPath = '/dashboard';
      if (userType === 'doctor') {
        dashboardPath = '/doctor-dashboard';
      } else if (userType === 'pharmacist') {
        dashboardPath = '/pharmacy-dashboard';
      }
      
      navigate(dashboardPath);
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
      
      if (error.response) {
        // Erreur de l'API
        if (error.response.data) {
          // Erreur générale
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } 
          // Erreurs de champ spécifiques
          else if (error.response.data.username) {
            errorMessage = `Nom d'utilisateur: ${Array.isArray(error.response.data.username) ? error.response.data.username[0] : error.response.data.username}`;
          } else if (error.response.data.email) {
            errorMessage = `Email: ${Array.isArray(error.response.data.email) ? error.response.data.email[0] : error.response.data.email}`;
          } else if (error.response.data.password) {
            errorMessage = `Mot de passe: ${Array.isArray(error.response.data.password) ? error.response.data.password[0] : error.response.data.password}`;
          } else if (error.response.data.specialization) {
            errorMessage = `Spécialité: ${Array.isArray(error.response.data.specialization) ? error.response.data.specialization[0] : error.response.data.specialization}`;
          } else if (error.response.data.license_number) {
            errorMessage = `Numéro de licence: ${Array.isArray(error.response.data.license_number) ? error.response.data.license_number[0] : error.response.data.license_number}`;
          } else if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          }
          // Erreurs non_field_errors
          else if (error.response.data.non_field_errors) {
            errorMessage = Array.isArray(error.response.data.non_field_errors) 
              ? error.response.data.non_field_errors[0] 
              : error.response.data.non_field_errors;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.request) {
        errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion.';
      }
      
      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setCaptchaValue(null);
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer le code de vérification.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.verifyEmail({ email, code: verificationCode });
      
      toast({
        title: "Email vérifié",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Code de vérification invalide.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (emailVerificationSent) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Vérification de l'email</h1>
          <p className="text-muted-foreground mt-2">
            Un code de vérification a été envoyé à {email}
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Code de vérification</Label>
            <Input
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Entrez le code à 6 chiffres"
              maxLength={6}
            />
          </div>
          
          <Button
            onClick={handleVerifyEmail}
            className="w-full bg-pharma-primary hover:bg-pharma-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Vérification..." : "Vérifier l'email"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              setEmailVerificationSent(false);
              setVerificationCode('');
            }}
            className="w-full"
          >
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-muted-foreground mt-2">
          Rejoignez PharmaConnect pour accéder à nos services
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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
          <Label htmlFor="phone">Téléphone (optionnel)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+225 12 34 56 78"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        {userType === 'doctor' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="specialization">Spécialisation</Label>
              <Input
                id="specialization"
                placeholder="Ex: Cardiologie, Pédiatrie..."
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Numéro de licence</Label>
              <Input
                id="licenseNumber"
                placeholder="Numéro de licence professionnelle"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>
          </>
        )}

        {userType === 'pharmacist' && (
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">Numéro de licence</Label>
            <Input
              id="licenseNumber"
              placeholder="Numéro de licence professionnelle"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
          </div>
        )}
        
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

        {/* Ajout du Captcha */}
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
            onChange={(value) => setCaptchaValue(value)}
          />
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
