import React, { useState } from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    register({ name, email, role });
    nav('/');
  }

  return (
    <div className="login-wrapper">
      <Card title="Register for Edu ERP">
        <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
          <label>
            <div className="kicker">Full name</div>
            <input className="input" required value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            <div className="kicker">Email</div>
            <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label>
            <div className="kicker">Register as</div>
            <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn" type="submit">Register</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
