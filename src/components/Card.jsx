import React from 'react';

export default function Card({ title, children, className = '' }) {
  return (
    <div className={`duo-card ${className}`}>
      {title && <div style={{ marginBottom: 10 }} className="h2">{title}</div>}
      <div>{children}</div>
    </div>
  );
}
