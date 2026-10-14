import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Customer, Guide } from '../types';
import * as authApi from '../api/auth';

interface AuthContextType {
  user: { id: number; email: string; role: string; isVerified: boolean; createdAt: string } | null;
  customer: Customer | null;
  guide: Guide | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any, role: 'customer' | 'guide') => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      authApi.getMe()
        .then((response) => {
          setUser(response.user);
          if (response.user.role === 'customer' && response.profile) {
            setCustomer(response.profile as Customer);
          } else if (response.user.role === 'guide' && response.profile) {
            setGuide(response.profile as Guide);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    setToken(response.token);
    localStorage.setItem('token', response.token);
    
    // Fetch full user profile after login
    const userProfile = await authApi.getMe();
    setUser(userProfile.user);
    if (userProfile.user.role === 'customer' && userProfile.profile) {
      setCustomer(userProfile.profile as Customer);
    } else if (userProfile.user.role === 'guide' && userProfile.profile) {
      setGuide(userProfile.profile as Guide);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setCustomer(null);
    setGuide(null);
    localStorage.removeItem('token');
  };

  const register = async (data: any, role: 'customer' | 'guide') => {
    const response = role === 'customer' 
      ? await authApi.registerCustomer(data)
      : await authApi.registerGuide(data);
    setToken(response.token);
    localStorage.setItem('token', response.token);
    
    // Fetch full user profile after registration
    const userProfile = await authApi.getMe();
    setUser(userProfile.user);
    if (userProfile.user.role === 'customer' && userProfile.profile) {
      setCustomer(userProfile.profile as Customer);
    } else if (userProfile.user.role === 'guide' && userProfile.profile) {
      setGuide(userProfile.profile as Guide);
    }
  };

  return (
    <AuthContext.Provider value={{ user, customer, guide, token, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
