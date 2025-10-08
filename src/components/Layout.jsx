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
            {/* show a small welcome when available */}
            {user && (
              <div style={{ marginBottom: 12 }}>
                <div className="kicker">Signed in as</div>
                <div className="h2">{user.name}</div>
              </div>
            )}

            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
