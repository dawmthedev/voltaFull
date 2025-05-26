import React, { createContext, useContext, useState } from 'react';
import { login as apiLogin } from '../api/auth';

interface AuthState {
  user: any | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));

  const signIn = async (email: string, password: string) => {
    const data = await apiLogin({ email, password });
    const authToken = data?.data?.token;
    setUser(data?.data || null);
    setToken(authToken);
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
