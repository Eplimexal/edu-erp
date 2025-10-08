import React from 'react';
import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div>
      <div style={{display:'flex', gap:16, marginBottom: 16, flexWrap:'wrap'}}>
        <Card title="Quick Stats">
          <div style={{display:'flex', gap:16}}>
            <div>
              <div className="h2">1,254</div>
              <div className="kicker">Students</div>
            </div>
            <div>
              <div className="h2">72</div>
              <div className="kicker">Teachers</div>
            </div>
            <div>
              <div className="h2">14</div>
              <div className="kicker">Active Courses</div>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity" footer="Values are mock data for UI preview">
          <ul style={{margin:0, paddingLeft: '1rem'}}>
            <li className="small">Attendance updated for Batch A</li>
            <li className="small">New teacher onboarded: Ms. Sharma</li>
            <li className="small">Course "Data Structures" archived</li>
          </ul>
        </Card>
      </div>

      <Card title="Announcements">
        <p className="small">No announcements. Use this area to display important notices for admins.</p>
      </Card>
    </div>
  );
}
