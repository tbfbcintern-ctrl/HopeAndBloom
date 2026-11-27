const paymentMethodLabels = {
  gcash: 'GCash (preview)',
  maya: 'Maya (preview)',
  card: 'Card (preview)'
};

export function PromoNotificationsSection({ notifications, error, onMarkAllRead }) {
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <section className="admin-panel" aria-label="Promo alerts">
      <div className="admin-panel-heading">
        <div>
          <h2>Promo selections</h2>
          <p>Local demo checkout activity, not verified payments.</p>
        </div>
        {unreadCount > 0 && (
          <button className="admin-text-button" type="button" onClick={onMarkAllRead}>
            Mark all as seen
          </button>
        )}
      </div>

      {error && <p className="admin-promo-alert-error" role="alert">{error}</p>}

      {notifications.length === 0 ? (
        <p className="admin-promo-alert-empty">
          No promo selections yet. Demo checkout activity from this browser will appear here.
        </p>
      ) : (
        <ul className="admin-promo-alert-list">
          {notifications.map((notification) => (
            <li className="admin-promo-alert" key={notification.id}>
              <div>
                <div className="admin-promo-alert-heading">
                  <strong>{notification.parentGuardianName}</strong>
                  <span className="admin-promo-alert-customer-label">Parent/guardian</span>
                  {!notification.isRead && <span className="admin-promo-alert-unread">NEW</span>}
                </div>
                <p>
                  {notification.promoName} · {notification.sessions} · {notification.price}
                  {' · '}{paymentMethodLabels[notification.paymentMethod]}
                </p>
                <time dateTime={notification.createdAt}>
                  {new Date(notification.createdAt).toLocaleString()}
                </time>
              </div>
              <span className="admin-promo-alert-demo">DEMO · NOT PAID</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
