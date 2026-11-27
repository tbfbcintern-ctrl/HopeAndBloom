export function EmptyState({ icon, title, children }) {
  return (
    <div className="admin-empty-state">
      <span className="admin-empty-icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
