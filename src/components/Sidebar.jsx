import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.svg?url';

export default function Sidebar() {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav('/login');
  }

  return (
    <div>
      <div className="logo">
        <img src={Logo} alt="Edu ERP Logo" />
        <div>
          <div className="h1">Edu ERP</div>
          <div className="kicker">University - Desktop</div>
        </div>
      </div>

      <nav className="nav">
        {isAuthenticated ? (
          <>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/students" className={({ isActive }) => (isActive ? 'active' : '')}>
              Students
            </NavLink>
            <NavLink to="/teachers" className={({ isActive }) => (isActive ? 'active' : '')}>
              Teachers
            </NavLink>

            <button
              onClick={handleLogout}
              style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, cursor: 'pointer', background: 'transparent', border: '1px solid rgba(12,20,31,0.06)' }}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Login
            </NavLink>
            <NavLink to="/register/student" className={({ isActive }) => (isActive ? 'active' : '')}>
              Register Student
            </NavLink>
            <NavLink to="/register/teacher" className={({ isActive }) => (isActive ? 'active' : '')}>
              Register Teacher
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}
