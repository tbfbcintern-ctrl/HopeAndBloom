export function SectionHeading({ badge, title, children, id }) {
  return (
    <div className="section-head">
      <div className="badge-pill">{badge}</div>
      <h2 id={id}>{title}</h2>
      {children && <p className="intro">{children}</p>}
    </div>
  );
}
