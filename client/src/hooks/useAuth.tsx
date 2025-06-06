import React, { createContext, useContext, useState } from 'react';
import { baseURL } from '../apiConfig';

interface AuthContextProps {
  user: any;
  signIn: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const baseOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  const signIn = async (email: string, password: string) => {
    const res = await fetch(`${baseURL}/auth/login`, {
      ...baseOptions,
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }
    setUser(data.data);
    return data.data;
  };

  return <AuthContext.Provider value={{ user, signIn }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
