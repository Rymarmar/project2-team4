import { useState } from "react";
import * as authService from "./authService.tsx";
import type { User } from "../models/models";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(username, password);
      const body = await response.body;
      if (!response.success) {
        setError(body.error ?? "Login failed");
        return false;
      }
      setUser(body.data);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password1: string, password2: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(email, password1, password2);
      const body = await response.body;
      if (!response.success) {
        setError(body.error ?? "Registration failed");
        return false;
      }
      setUser(body.data);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setLoading(false);
    setError(null);
  };


  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: user !== null,
  };
}