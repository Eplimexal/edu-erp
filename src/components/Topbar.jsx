import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const { theme, mode, setMode } = useTheme();
  const { user } = useAuth();

  function toggle() {
    if (mode === 'system') setMode('dark');
    else if (mode === 'dark') setMode('light');
    else setMode('system');
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div>
        <div className="h2">Welcome back</div>
        <div className="muted small">Here's a summary of the system</div>
        {user && <div className="small kicker">Signed in as <strong>{user.name}</strong></div>}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input className="input search" placeholder="Search students, teachers, courses..." />
        <div className="kicker small">Theme: {mode} ({theme})</div>
        <button onClick={toggle} className="btn" style={{ background: 'transparent', color: 'var(--text)', border: '1px solid rgba(0,0,0,0.06)' }}>
          Toggle
        </button>
        <div className="kicker">{user ? user.name : 'Guest'}</div>
      </div>
    </div>
  );
}
