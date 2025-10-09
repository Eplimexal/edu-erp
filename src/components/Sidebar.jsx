import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function signOut() {
    logout();
    nav('/login');
  }

  return (
    <div>
      <div className="logo">
        <div style={{ width: 42, height: 42, borderRadius: 8, background: 'linear-gradient(90deg,var(--accent-1),var(--accent-2))' }} />
        <div>
          <div className="h1">Edu ERP</div>
          <div className="kicker">University - Desktop</div>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        {user?.role === 'student' && <NavLink to="/student-dashboard">My Dashboard</NavLink>}
        {user?.role === 'teacher' && <NavLink to="/teacher-dashboard">My Dashboard</NavLink>}
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>

        <div style={{ marginTop: 12 }}>
          <button onClick={signOut} className="btn" style={{ background: 'transparent', color: 'var(--text)', border: '1px solid rgba(0,0,0,0.06)' }}>
            Sign out
          </button>
        </div>
      </nav>
    </div>
  );
}
