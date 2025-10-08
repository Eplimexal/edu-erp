import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('edu_erp_students') || '[]');
    setStudents(list);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="h2">Students</div>
        <Link to="/register/student" className="input" style={{ padding: '8px 12px', textDecoration: 'none' }}>
          Add student
        </Link>
      </div>

      <Card>
        <table className="table" aria-describedby="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Batch</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" className="center muted">
                  No students yet. <br />
                  <Link to="/register/student">Register a student</Link>
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>
                  <td>{s.batch}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
