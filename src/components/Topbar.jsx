import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Topbar() {
  const { theme, mode, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 700 }} className="h2">Welcome back</div>
        <div className="small kicker">Here's a summary of the system</div>
        {user && <div className="small kicker">Signed in as <strong>{user.name}</strong></div>}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input className="input search" placeholder="Search students, teachers, courses..." style={{ width: 360 }} />

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--muted-2)' }}>
            Theme: <div style={{ fontWeight: 600 }}>{mode} ({theme})</div>
          </div>

          {/* Toggle pill */}
          <div
            onClick={toggleTheme}
            role="button"
            aria-label="Toggle theme"
            title="Toggle theme"
            style={{
              width: 56,
              height: 28,
              borderRadius: 28,
              background: theme === 'dark' ? 'linear-gradient(90deg,#4b65ff,#8b6bff)' : 'linear-gradient(90deg,#fff,#eee)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                background: theme === 'dark' ? '#111827' : '#ffffff',
                transform: theme === 'dark' ? 'translateX(28px)' : 'translateX(0px)',
                transition: 'transform 180ms cubic-bezier(.2,.9,.2,1)'
              }}
            />
          </div>

          <div style={{ fontSize: 14 }}>{user ? user.name : 'Guest'}</div>
        </div>
      </div>
    </div>
  );
}
