export default function Card({ title, children, footer, className='' }) {
  return (
    <div className={`duo-card ${className}`}>
      {title && <div style={{marginBottom:10}} className="h2">{title}</div>}
      <div>{children}</div>
      {footer && <div style={{marginTop:12}} className="muted small">{footer}</div>}
    </div>
  );
}
