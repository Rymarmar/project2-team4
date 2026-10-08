import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../models/models';
// import { MOCK_USER } from '../services';

// to be replaced with the acutal implementation of authUser

// to be replaced with mock user data from userServices.
const FAKE_USER: User = {
  FirstName: 'John',
  LastName: 'Smith',
  Email: 'john.smith@example.com',
  PhoneNumber: '201-123-4567',
  Username: 'johnsmith',
};

export interface AuthResult {
  ok: boolean;
  error: string | null;
}

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextValue = {
    user,
    login: async () => {
      setUser(FAKE_USER)
      return { ok: true, error: null }
    },
    logout: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}