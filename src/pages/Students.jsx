import React from 'react';
import Card from '../components/Card';

const MOCK = [
  { name: 'Amit Kumar', roll: 'CS-001', batch: '2024' },
  { name: 'Priya Singh', roll: 'CS-002', batch: '2024' },
  { name: 'Maya Rao', roll: 'CS-003', batch: '2023' }
];

export default function Students() {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <div className="h2">Students</div>
        <button className="input" style={{cursor:'pointer'}}>Add student</button>
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
            {MOCK.map((s) => (
              <tr key={s.roll}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.batch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
