import React, { createContext, useContext, useEffect, useState } from 'react';

// Simple auth context with role support: 'student' | 'teacher' | 'admin'
// Persists to localStorage under 'edu_erp_user'

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

  function login({ email }) {
    // mock: if email contains 'student' choose student, 'teacher' choose teacher, else student
    const role = email.includes('teacher') ? 'teacher' : email.includes('student') ? 'student' : 'student';
    const name = email.split('@')[0];
    setUser({ email, name, role });
  }

  function register({ name, email, role }) {
    // store in local lists
    const key = role === 'teacher' ? 'edu_erp_teachers' : 'edu_erp_students';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({ id: Date.now(), name, email, role });
    localStorage.setItem(key, JSON.stringify(existing));
    // auto-login
    setUser({ email, name, role });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
