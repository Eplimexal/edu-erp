import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: 32 }}>
      <h2 className="h1">Page not found</h2>
      <p className="small">We couldn't find that page.</p>
      <Link to="/">Back home</Link>
    </div>
  );
}
