import React from 'react';
import Card from '../components/Card';

const MOCK = [
  { name: 'Dr. R. Verma', dept: 'Computer Science' },
  { name: 'Ms. Sharma', dept: 'Mathematics' }
];

export default function Teachers() {
  return (
    <div>
      <div className="h2" style={{marginBottom:12}}>Teachers</div>

      <Card>
        <table className="table" aria-describedby="teachers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map((t, i) => (
              <tr key={i}>
                <td>{t.name}</td>
                <td>{t.dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
