import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user } = useAuth();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main>
        <div className="container">
          <header className="header">
            <Topbar />
          </header>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
