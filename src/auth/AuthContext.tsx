import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  register: (name: string, email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Admin User',
  email: 'admin@socialpulse.ai',
  role: 'Principal Intelligence Director',
  avatar: 'AU'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('socialpulse_auth') === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('socialpulse_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return DEFAULT_ADMIN;
      }
    }
    return localStorage.getItem('socialpulse_auth') === 'true' ? DEFAULT_ADMIN : null;
  });

  useEffect(() => {
    // Initial sync
    if (isAuthenticated && !user) {
      setUser(DEFAULT_ADMIN);
      localStorage.setItem('socialpulse_user', JSON.stringify(DEFAULT_ADMIN));
    }
  }, [isAuthenticated, user]);

  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    // Check default admin
    if (trimmedEmail === 'admin@socialpulse.ai' && trimmedPass === 'admin123') {
      localStorage.setItem('socialpulse_auth', 'true');
      localStorage.setItem('socialpulse_user', JSON.stringify(DEFAULT_ADMIN));
      setIsAuthenticated(true);
      setUser(DEFAULT_ADMIN);
      return { success: true };
    }

    // Check custom registered users in localStorage
    try {
      const storedUsersRaw = localStorage.getItem('socialpulse_registered_users');
      if (storedUsersRaw) {
        const users: { name: string; email: string; pass: string }[] = JSON.parse(storedUsersRaw);
        const match = users.find(u => u.email.toLowerCase() === trimmedEmail && u.pass === trimmedPass);
        if (match) {
          const registeredUser: User = {
            id: 'usr-' + Date.now(),
            name: match.name,
            email: match.email,
            role: 'Intelligence Analyst',
            avatar: match.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'SP'
          };
          localStorage.setItem('socialpulse_auth', 'true');
          localStorage.setItem('socialpulse_user', JSON.stringify(registeredUser));
          setIsAuthenticated(true);
          setUser(registeredUser);
          return { success: true };
        }
      }
    } catch {
      // ignore
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name: string, email: string, pass: string): { success: boolean; error?: string } => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPass) {
      return { success: false, error: 'All fields are required.' };
    }

    try {
      const storedUsersRaw = localStorage.getItem('socialpulse_registered_users');
      const users: { name: string; email: string; pass: string }[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      if (users.some(u => u.email.toLowerCase() === trimmedEmail) || trimmedEmail === 'admin@socialpulse.ai') {
        return { success: false, error: 'An account with this email already exists.' };
      }

      users.push({ name: trimmedName, email: trimmedEmail, pass: trimmedPass });
      localStorage.setItem('socialpulse_registered_users', JSON.stringify(users));

      // Log in immediately
      const newUser: User = {
        id: 'usr-' + Date.now(),
        name: trimmedName,
        email: trimmedEmail,
        role: 'Intelligence Analyst',
        avatar: trimmedName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'SP'
      };

      localStorage.setItem('socialpulse_auth', 'true');
      localStorage.setItem('socialpulse_user', JSON.stringify(newUser));
      setIsAuthenticated(true);
      setUser(newUser);

      return { success: true };
    } catch {
      return { success: false, error: 'Failed to create account. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('socialpulse_auth');
    localStorage.removeItem('socialpulse_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
