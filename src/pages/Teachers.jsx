import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

function read(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    setTeachers(read('edu_erp_teachers'));
  }, []);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
        <div className="h2">Teachers</div>
      </div>

      <Card>
        {teachers.length === 0 ? <div className="small muted">No teachers</div> : (
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th></tr></thead>
            <tbody>
              {teachers.map(t => <tr key={t.id}><td>{t.name}</td><td>{t.email}</td></tr>)}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
