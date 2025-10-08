import React, { useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterStudent() {
  const [form, setForm] = useState({ name: '', roll: '', batch: '' });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // if already signed in, move to students page after register
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // mock: store in localStorage list
    const key = 'edu_erp_students';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({ ...form, id: Date.now() });
    localStorage.setItem(key, JSON.stringify(existing));
    // if not signed in, go to login; else show list
    if (!isAuthenticated) navigate('/login');
    else navigate('/students');
  }

  return (
    <div style={{ maxWidth: 700, margin: '24px auto' }}>
      <Card title="Register Student">
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>
            <div className="kicker">Full name</div>
            <input name="name" className="input" required value={form.name} onChange={handleChange} />
          </label>

          <label>
            <div className="kicker">Roll no</div>
            <input name="roll" className="input" required value={form.roll} onChange={handleChange} />
          </label>

          <label>
            <div className="kicker">Batch</div>
            <input name="batch" className="input" required value={form.batch} onChange={handleChange} />
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="input" type="submit" style={{ cursor: 'pointer' }}>
              Register
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
