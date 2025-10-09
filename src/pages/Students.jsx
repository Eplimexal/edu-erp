import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

function read(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(read('edu_erp_students'));
  }, []);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
        <div className="h2">Students</div>
      </div>

      <Card>
        {students.length === 0 ? <div className="small muted">No students</div> : (
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th></tr></thead>
            <tbody>
              {students.map(s => <tr key={s.id}><td>{s.name}</td><td>{s.email}</td></tr>)}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
