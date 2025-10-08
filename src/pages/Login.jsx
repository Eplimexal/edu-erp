import React from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // mock login — later, wire real auth
    navigate('/');
  }

  return (
    <div style={{maxWidth:420, margin:'0 auto'}}>
      <Card title="Login">
        <form onSubmit={handleSubmit} style={{display:'grid', gap:12}}>
          <label>
            <div className="kicker">Email</div>
            <input className="input" type="email" required placeholder="you@university.edu" />
          </label>

          <label>
            <div className="kicker">Password</div>
            <input className="input" type="password" required placeholder="••••••••" />
          </label>

          <div style={{display:'flex', justifyContent:'flex-end', marginTop:6}}>
            <button type="submit" className="input" style={{cursor:'pointer'}}>Sign in</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
