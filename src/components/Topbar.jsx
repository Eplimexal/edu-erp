import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function ThemeToggle() {
  const { mode, setMode, theme } = useTheme();

  function cycle() {
    // cycle mode: system -> dark -> light -> system
    const order = ['system', 'dark', 'light'];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
  }

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <div className="kicker small" style={{ minWidth: 80 }}>
        Theme: <strong style={{ marginLeft: 6 }}>{mode === 'system' ? `auto (${theme})` : mode}</strong>
      </div>

      <button
        onClick={cycle}
        aria-label="Toggle theme"
        title="Cycle theme (system → dark → light)"
        style={{
          borderRadius: 999,
          padding: 8,
          cursor: 'pointer',
          border: 'none',
          background: 'transparent'
        }}
      >
        {/* simple decorative pill using CSS variables */}
        <div
          style={{
            width: 46,
            height: 28,
            borderRadius: 999,
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: mode === 'dark' ? 'flex-end' : 'flex-start',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(0,0,0,0.03))',
            boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.06), inset -4px -4px 12px rgba(255,255,255,0.6)'
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: 'linear-gradient(180deg,var(--accent-1),var(--accent-2))',
              boxShadow: '0 4px 12px rgba(0,0,0,0.18)'
            }}
          />
        </div>
      </button>
    </div>
  );
}

export default function Topbar() {
  const { user } = useAuth();
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div>
        <div className="h2">Welcome back</div>
        <div className="muted small">Here's a summary of the system</div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input className="input search" placeholder="Search students, teachers, courses..." />
        <ThemeToggle />
        <div style={{ padding: 8 }} className="kicker">
          {user ? user.name : 'User'}
        </div>
      </div>
    </div>
  );
}
