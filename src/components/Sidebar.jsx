import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function signOut() {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="logo">
        <div style={{ width: 42, height: 42, borderRadius: 8, background: 'linear-gradient(90deg,var(--accent-1),var(--accent-2))' }} />
        <div>
          <div className="h1">Edu ERP</div>
          <div className="kicker">University - Desktop</div>
        </div>
      </div>

      <nav className="nav" style={{ flex: 1 }}>
        <NavLink to="/" end style={({ isActive }) => ({ display: 'block', padding: 10, borderRadius: 8, color: 'var(--text)', textDecoration: 'none', marginBottom: 8, background: isActive ? 'rgba(91,124,255,0.08)' : 'transparent' })}>Home</NavLink>

        <NavLink to="/student-dashboard" style={({ isActive }) => ({ display: 'block', padding: 10, borderRadius: 8, color: 'var(--text)', textDecoration: 'none', marginBottom: 8, background: isActive ? 'rgba(91,124,255,0.08)' : 'transparent' })}>
          My Dashboard
        </NavLink>

        <NavLink to="/students" style={({ isActive }) => ({ display: 'block', padding: 10, borderRadius: 8, color: 'var(--text)', textDecoration: 'none', marginBottom: 8, background: isActive ? 'rgba(91,124,255,0.08)' : 'transparent' })}>
          Students
        </NavLink>

        <NavLink to="/teachers" style={({ isActive }) => ({ display: 'block', padding: 10, borderRadius: 8, color: 'var(--text)', textDecoration: 'none', marginBottom: 8, background: isActive ? 'rgba(91,124,255,0.08)' : 'transparent' })}>
          Teachers
        </NavLink>
      </nav>

      <div style={{ padding: 18 }}>
        <button onClick={signOut} className="btn" style={{ width: '100%' }}>Sign out</button>
      </div>
    </div>
  );
}
