import React from 'react';

export default function Topbar() {
  return (
    <div style={{display:'flex', gap:12, alignItems:'center', justifyContent:'space-between', width:'100%'}}>
      <div>
        <div className="h2">Welcome back</div>
        <div className="muted small">Here's a summary of the system</div>
      </div>

      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <input className="input search" placeholder="Search students, teachers, courses..." />
        <div style={{padding:8}} className="kicker">User</div>
      </div>
    </div>
  );
}
