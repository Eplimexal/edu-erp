import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{textAlign:'center', paddingTop:40}}>
      <div className="h1">Page not found</div>
      <p className="muted">We couldn't find the page you were looking for.</p>
      <div style={{marginTop:16}}>
        <Link to="/">← Back to dashboard</Link>
      </div>
    </div>
  );
}
