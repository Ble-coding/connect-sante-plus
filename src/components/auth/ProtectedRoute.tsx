
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes: string[];
  redirectPath?: string;
}

export function ProtectedRoute({ children, allowedUserTypes, redirectPath }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Attendre un peu pour s'assurer que localStorage est synchronisé
    const checkSession = () => {
      const session = localStorage.getItem('pharmaconnect_user_session');
      
      if (!session) {
        // Pas de session, rediriger vers login
        console.log('ProtectedRoute - Pas de session trouvée, redirection vers /login');
        navigate('/login', { state: { from: location.pathname }, replace: true });
        return;
      }

      try {
        const sessionData = JSON.parse(session);
        const userType = sessionData.userType || 'patient';

        console.log('=== ProtectedRoute ===');
        console.log('UserType dans session:', userType);
        console.log('Types autorisés:', allowedUserTypes);
        console.log('Chemin actuel:', location.pathname);
        console.log('=====================');

        // Vérifier si le type d'utilisateur est autorisé
        if (!allowedUserTypes.includes(userType)) {
          console.warn('❌ Accès refusé - Type utilisateur:', userType, 'Autorisé:', allowedUserTypes);
          
          // Rediriger vers le bon dashboard selon le type d'utilisateur
          let correctPath = '/dashboard';
          
          switch (userType) {
            case 'admin':
              correctPath = '/admin-dashboard';
              break;
            case 'doctor':
              correctPath = '/doctor-dashboard';
              break;
            case 'pharmacy':
              correctPath = '/pharmacy-dashboard';
              break;
            default:
              correctPath = '/dashboard';
          }

          console.log('🔄 Redirection automatique vers:', correctPath);
          
          // Utiliser setTimeout pour éviter les conflits avec la navigation initiale
          setTimeout(() => {
            if (redirectPath) {
              window.location.href = redirectPath;
            } else {
              window.location.href = correctPath;
            }
          }, 200);
        } else {
          console.log('✅ Accès autorisé - Type utilisateur:', userType);
        }
      } catch (e) {
        console.error('❌ Erreur lors de la vérification de la session:', e);
        navigate('/login', { replace: true });
      }
    };

    // Petit délai pour s'assurer que localStorage est synchronisé après window.location.href
    const timeoutId = setTimeout(checkSession, 50);
    
    return () => clearTimeout(timeoutId);
  }, [navigate, location, allowedUserTypes, redirectPath]);

  return <>{children}</>;
}

