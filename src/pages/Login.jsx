import React, { useState } from 'react';
import Card from '../components/Card';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  if (isAuthenticated) {
    // already logged in -> dashboard
    navigate('/');
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ email });
    navigate('/');
  }

  return (
    <div className="app-bg">
      <div className="login-wrapper">
        <div className="card-halo" aria-hidden="true" />

        <Card className="duo-card" title="Sign in to Edu ERP">
          {/* --- form content --- */}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
            <label>
              <div className="kicker">Email</div>
              <input
                className="input"
                type="email"
                required
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <div className="kicker">Password</div>
              <input
                className="input"
                type="password"
                required
                placeholder="mock password (any value)"
              />
            </label>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to="/register/student" className="small link">
                  Register student
                </Link>
                <Link to="/register/teacher" className="small link">
                  Register teacher
                </Link>
              </div>

              <button type="submit" className="btn-sign">
                Sign in
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
