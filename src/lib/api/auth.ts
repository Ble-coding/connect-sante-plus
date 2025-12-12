import apiClient from './client';
import { STORAGE_KEYS } from './config';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  phone?: string;
  user_type: 'patient' | 'doctor' | 'pharmacist';
  specialization?: string;
  license_number?: string;
  captcha_token: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    user_type: string;
    phone?: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

// Service d'authentification
export const authService = {
  // Connexion
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/token/', credentials);
      const { access, refresh } = response.data;

      // Sauvegarder les tokens immédiatement
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);

      // Obtenir les informations de l'utilisateur avec le token
      const userResponse = await apiClient.get('/accounts/users/me/', {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      });
      const user = userResponse.data;

      // Sauvegarder la session utilisateur
      const session = {
        user: user,
        userType: user.user_type,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(session));

      return {
        user,
        tokens: { access, refresh },
      };
    } catch (error: any) {
      // Si l'erreur vient de l'obtention du token
      if (error.response?.status === 401) {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect.');
      }
      throw error;
    }
  },

  // Inscription
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post('/accounts/users/register/', data);
    const { user, tokens } = response.data;

    // Sauvegarder les tokens
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);

    // Sauvegarder la session utilisateur
    const session = {
      user: user,
      userType: user.user_type,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(session));

    return response.data;
  },

  // Déconnexion
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
    delete apiClient.defaults.headers.common['Authorization'];
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    const response = await apiClient.get('/accounts/users/me/');
    return response.data;
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Obtenir le token d'accès
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Vérifier l'email
  async verifyEmail(data: { email: string; code: string }): Promise<AuthResponse> {
    const response = await apiClient.post('/accounts/users/verify_email/', data);
    const { user, tokens } = response.data;

    // Sauvegarder les tokens
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh);

    // Sauvegarder la session utilisateur
    const session = {
      user: user,
      userType: user.user_type,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(session));

    return response.data;
  },
};

