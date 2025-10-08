import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
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
