import React, { createContext, useContext, useEffect, useState } from 'react';

// Simple mock auth context (frontend-only).
// Stores a small user object in localStorage so page refresh keeps the session.

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('edu_erp_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('edu_erp_user', JSON.stringify(user));
    else localStorage.removeItem('edu_erp_user');
  }, [user]);

  const login = ({ email }) => {
    // Mock login: accept any email, set name from email prefix
    const name = email.split('@')[0] || email;
    setUser({ name, email, role: 'admin' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
