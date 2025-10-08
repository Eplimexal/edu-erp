import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('edu_erp_teachers') || '[]');
    setTeachers(list);
  }, []);

  return (
    <div>
      <div className="h2" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Teachers</span>
        <Link to="/register/teacher" className="input" style={{ padding: '8px 12px', textDecoration: 'none' }}>
          Add teacher
        </Link>
      </div>

      <Card>
        <table className="table" aria-describedby="teachers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="2" className="center muted">
                  No teachers yet. <br />
                  <Link to="/register/teacher">Register a teacher</Link>
                </td>
              </tr>
            ) : (
              teachers.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.dept}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
