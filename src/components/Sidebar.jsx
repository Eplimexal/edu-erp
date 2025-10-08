import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg?url';

export default function Sidebar() {
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
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/students" className={({isActive}) => isActive ? 'active' : ''}>Students</NavLink>
        <NavLink to="/teachers" className={({isActive}) => isActive ? 'active' : ''}>Teachers</NavLink>
        <NavLink to="/login" className={({isActive}) => isActive ? 'active' : ''}>Login</NavLink>
      </nav>
    </div>
  );
}
