import React, { useState } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterTeacher() {
  const [form, setForm] = useState({ name: '', dept: '' });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // mock store
    const key = 'edu_erp_teachers';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({ ...form, id: Date.now() });
    localStorage.setItem(key, JSON.stringify(existing));
    if (!isAuthenticated) navigate('/login');
    else navigate('/teachers');
  }

  return (
    <div style={{ maxWidth: 700, margin: '24px auto' }}>
      <Card title="Register Teacher">
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>
            <div className="kicker">Full name</div>
            <input name="name" className="input" required value={form.name} onChange={handleChange} />
          </label>

          <label>
            <div className="kicker">Department</div>
            <input name="dept" className="input" required value={form.dept} onChange={handleChange} />
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
