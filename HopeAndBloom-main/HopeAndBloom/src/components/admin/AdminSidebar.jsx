import logo from '../../../../images/hope-and-bloom-full-logo.png';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'inquiries', label: 'Inquiries', icon: '✉' },
  { id: 'add-inquiry', label: 'Add Inquiry', icon: '+' },
  { id: 'appointments', label: 'Appointments', icon: '▦' },
  { id: 'promo-alerts', label: 'Promo alerts', icon: '!' },
  { id: 'programs', label: 'Programs', icon: '✿' },
  { id: 'settings', label: 'Settings', icon: '⚙' }
];

export function AdminSidebar({ activeSection, inquiryCount, promoNotificationCount, onNavigate }) {
  return (
    <aside className="admin-sidebar">
      <a className="admin-brand" href="/" aria-label="Hope and Bloom home">
        <img src={logo} alt="Hope and Bloom" />
        <span>ADMIN PREVIEW</span>
      </a>

      <nav className="admin-nav" aria-label="Admin navigation">
        {navigation.map(({ id, label, icon }) => (
          <button
            className={`admin-nav-item${activeSection === id ? ' is-active' : ''}`}
            type="button"
            key={id}
            aria-current={activeSection === id ? 'page' : undefined}
            onClick={() => onNavigate(id)}
          >
            <span className="admin-nav-icon" aria-hidden="true">{icon}</span>
            <span>{label}</span>
            {id === 'inquiries' && <span className="admin-nav-count">{inquiryCount}</span>}
            {id === 'promo-alerts' && promoNotificationCount > 0 && (
              <span className="admin-nav-count">{promoNotificationCount}</span>
            )}
          </button>
        ))}
      </nav>

      <a className="admin-back-link" href="/">
        <span aria-hidden="true">↗</span>
        <span>View website</span>
      </a>
    </aside>
  );
}
