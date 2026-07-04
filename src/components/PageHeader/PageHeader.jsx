import './PageHeader.css';

export function PageHeader({ label, title, subtitle }) {
  return (
    <section className="page-header">
      <span className="section-label">{label}</span>
      <h1 className="section-title page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </section>
  );
}
