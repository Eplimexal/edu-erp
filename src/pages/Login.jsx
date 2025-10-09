import React, { useState } from 'react';
import Card from '../components/Card';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password] = useState(''); // mock

  if (isAuthenticated) {
    navigate('/');
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ email });
    navigate('/');
  }

  return (
    <div className="login-wrapper">
      <Card title="Sign in to Edu ERP" className="duo-card">
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>
            <div className="kicker">Email</div>
            <input className="input" type="email" required placeholder="you@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label>
            <div className="kicker">Password</div>
            <input className="input" type="password" required placeholder="your password" />
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Link to="/register" className="small">Register</Link>
            </div>
            <button type="submit" className="btn">Sign in</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
