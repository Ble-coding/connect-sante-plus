import { useState, useEffect } from 'react';
import { authService, AuthResponse } from '@/lib/api/auth';
import { STORAGE_KEYS } from '@/lib/api/config';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  phone?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await authService.login({ username, password });
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const register = async (data: any): Promise<AuthResponse> => {
    const response = await authService.register(data);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (data: any) => {
    const updatedUser = await authService.getCurrentUser();
    setUser(updatedUser);
    return updatedUser;
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };
};








