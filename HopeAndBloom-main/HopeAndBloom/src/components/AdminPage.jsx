import { useEffect, useState } from 'react';
import logo from '../../../images/hope-and-bloom-full-logo.png';
import {
  deleteDemoInquiry,
  getDemoInquiries,
  INQUIRIES_UPDATED_EVENT,
  saveDemoInquiry,
  updateDemoInquiry
} from '../inquiries.js';
import {
  APPOINTMENTS_UPDATED_EVENT,
  deleteDemoAppointment,
  getDemoAppointments,
  saveDemoAppointment
} from '../appointments.js';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'inquiries', label: 'Inquiries', icon: '✉' },
  { id: 'appointments', label: 'Appointments', icon: '▦' },
  { id: 'programs', label: 'Programs', icon: '✿' },
  { id: 'settings', label: 'Settings', icon: '⚙' }
];

const programs = [
  'Early Intervention',
  'Communication Skills',
  'Social Skills & Play',
  'Daily Living Routines',
  'Parent Training & Coaching',
  'School Transition Support'
];

const inquiryStatusLabels = {
  new: 'New',
  contacted: 'Contacted',
  scheduled: 'Scheduled',
  closed: 'Closed'
};

const preferredContactLabels = {
  email: 'Email',
  phone: 'Phone',
  either: 'Email or phone'
};

const ageRangeLabels = {
  'under-3': 'Under 3 years old',
  '3-5': '3 to 5 years old',
  '6-12': '6 to 12 years old',
  '13-plus': '13+ years old'
};

const sectionCopy = {
  dashboard: {
    eyebrow: 'OVERVIEW',
    title: 'Welcome to your dashboard',
    description: 'A quick look at Hope and Bloom activity.'
  },
  inquiries: {
    eyebrow: 'FAMILY ENQUIRIES',
    title: 'Inquiries',
    description: 'Messages from families who want to learn about your services.'
  },
  appointments: {
    eyebrow: 'SCHEDULE',
    title: 'Appointments',
    description: 'Create and manage local demo appointments on the calendar.'
  },
  programs: {
    eyebrow: 'CENTER SERVICES',
    title: 'Programs',
    description: 'The programs currently shown on the Hope and Bloom website.'
  },
  settings: {
    eyebrow: 'ADMINISTRATION',
    title: 'Settings',
    description: 'Admin access and data storage are not configured in this preview.'
  }
};

function EmptyState({ icon, title, children }) {
  return (
    <div className="admin-empty-state">
      <span className="admin-empty-icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function fromDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function InquiryCard({ inquiry, onDelete, onUpdate }) {
  const [comment, setComment] = useState(inquiry.comment);
  const [commentSaved, setCommentSaved] = useState(false);

  useEffect(() => {
    setComment(inquiry.comment);
  }, [inquiry.comment]);

  const saveComment = () => {
    if (onUpdate(inquiry.id, { comment })) {
      setCommentSaved(true);
    }
  };

  return (
    <article className={`admin-inquiry-card${inquiry.status === 'closed' ? ' is-closed' : ''}`}>
      <div className="admin-inquiry-heading">
        <div>
          <div className="admin-inquiry-title-row">
            <h3>{inquiry.name}</h3>
            <span className={`admin-inquiry-status${inquiry.status === 'closed' ? ' is-closed' : ''}`}>
              {inquiryStatusLabels[inquiry.status]}
            </span>
          </div>
          <div className="admin-inquiry-contact">
            {inquiry.email && <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>}
            {inquiry.phone && <a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a>}
          </div>
        </div>
        <div className="admin-inquiry-actions">
          <button
            className="admin-done-button"
            type="button"
            onClick={() => onUpdate(inquiry.id, { status: inquiry.status === 'closed' ? 'new' : 'closed' })}
          >
            {inquiry.status === 'closed' ? 'Reopen' : 'Close'}
          </button>
          <select
            className="admin-inquiry-status-select"
            aria-label={`Follow-up status for ${inquiry.name}`}
            value={inquiry.status}
            onChange={(event) => onUpdate(inquiry.id, { status: event.target.value })}
          >
            {Object.entries(inquiryStatusLabels).map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
          <button
            className="admin-delete-button"
            type="button"
            onClick={() => onDelete(inquiry.id)}
            aria-label={`Delete inquiry from ${inquiry.name}`}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="admin-inquiry-meta">
        {inquiry.program && <span>Program: {inquiry.program}</span>}
        {inquiry.age && <span>Child age: {ageRangeLabels[inquiry.age] || inquiry.age}</span>}
        {inquiry.preferredContact && <span>Prefers: {preferredContactLabels[inquiry.preferredContact] || inquiry.preferredContact}</span>}
        <time dateTime={inquiry.createdAt}>{new Date(inquiry.createdAt).toLocaleString()}</time>
      </div>
      {inquiry.message && <p className="admin-inquiry-message">{inquiry.message}</p>}
      <div className="admin-inquiry-follow-up">
        <label htmlFor={`inquiry-follow-up-${inquiry.id}`}>Follow-up date</label>
        <input
          id={`inquiry-follow-up-${inquiry.id}`}
          type="date"
          value={inquiry.followUpDate}
          onChange={(event) => onUpdate(inquiry.id, { followUpDate: event.target.value })}
        />
      </div>
      <div className="admin-inquiry-comment">
        <label htmlFor={`inquiry-comment-${inquiry.id}`}>Internal comment</label>
        <textarea
          id={`inquiry-comment-${inquiry.id}`}
          rows="3"
          maxLength="1000"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            setCommentSaved(false);
          }}
          placeholder="Add a note about the follow-up..."
        />
        <div className="admin-inquiry-comment-actions">
          <button className="admin-done-button" type="button" onClick={saveComment}>
            Save comment
          </button>
          {commentSaved && <span role="status">Saved in this browser</span>}
        </div>
      </div>
    </article>
  );
}

export function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [inquiries, setInquiries] = useState([]);
  const [inquiryError, setInquiryError] = useState('');
  const [inquiryNotice, setInquiryNotice] = useState('');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentError, setAppointmentError] = useState('');
  const [appointmentNotice, setAppointmentNotice] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const section = sectionCopy[activeSection];

  useEffect(() => {
    const refreshInquiries = () => {
      try {
        setInquiries(getDemoInquiries());
        setInquiryError('');
      } catch (error) {
        setInquiryError(error.message);
      }
    };

    const refreshAppointments = () => {
      try {
        setAppointments(getDemoAppointments());
        setAppointmentError('');
      } catch (error) {
        setAppointmentError(error.message);
      }
    };

    refreshInquiries();
    refreshAppointments();
    window.addEventListener(INQUIRIES_UPDATED_EVENT, refreshInquiries);
    window.addEventListener('storage', refreshInquiries);
    window.addEventListener(APPOINTMENTS_UPDATED_EVENT, refreshAppointments);
    window.addEventListener('storage', refreshAppointments);
    return () => {
      window.removeEventListener(INQUIRIES_UPDATED_EVENT, refreshInquiries);
      window.removeEventListener('storage', refreshInquiries);
      window.removeEventListener(APPOINTMENTS_UPDATED_EVENT, refreshAppointments);
      window.removeEventListener('storage', refreshAppointments);
    };
  }, []);

  const removeInquiry = (id) => {
    if (!window.confirm('Delete this demo inquiry from this browser?')) {
      return;
    }

    try {
      deleteDemoInquiry(id);
      setInquiryError('');
    } catch (error) {
      setInquiryError(error.message);
    }
  };

  const updateInquiry = (id, updates) => {
    try {
      updateDemoInquiry(id, updates);
      setInquiryError('');
      return true;
    } catch (error) {
      setInquiryError(error.message);
      return false;
    }
  };

  const addInquiry = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      saveDemoInquiry({
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        age: String(formData.get('age') || ''),
        message: String(formData.get('message') || '')
      });
      form.reset();
      setInquiryError('');
      setInquiryNotice('Inquiry added in this browser.');
      setShowInquiryForm(false);
    } catch (error) {
      setInquiryNotice('');
      setInquiryError(error.message);
    }
  };

  const addAppointment = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      saveDemoAppointment({
        name: String(formData.get('clientName') || ''),
        date: selectedDate,
        time: String(formData.get('time') || ''),
        type: String(formData.get('type') || ''),
        notes: String(formData.get('notes') || '')
      });
      form.reset();
      setAppointmentError('');
      setAppointmentNotice('Demo appointment saved in this browser. No booking was sent to the center.');
    } catch (error) {
      setAppointmentNotice('');
      setAppointmentError(error.message);
    }
  };

  const removeAppointment = (id) => {
    if (!window.confirm('Delete this demo appointment from this browser?')) {
      return;
    }

    try {
      deleteDemoAppointment(id);
      setAppointmentError('');
      setAppointmentNotice('Demo appointment deleted.');
    } catch (error) {
      setAppointmentNotice('');
      setAppointmentError(error.message);
    }
  };

  const selectedDateValue = fromDateKey(selectedDate);
  const firstDayOfMonth = new Date(selectedDateValue.getFullYear(), selectedDateValue.getMonth(), 1);
  const daysInMonth = new Date(selectedDateValue.getFullYear(), selectedDateValue.getMonth() + 1, 0).getDate();
  const calendarCells = Array.from(
    { length: firstDayOfMonth.getDay() + daysInMonth },
    (_, index) => index < firstDayOfMonth.getDay() ? null : index - firstDayOfMonth.getDay() + 1
  );
  const appointmentCounts = appointments.reduce((counts, appointment) => {
    counts[appointment.date] = (counts[appointment.date] || 0) + 1;
    return counts;
  }, {});
  const selectedDayAppointments = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .sort((first, second) => first.time.localeCompare(second.time));

  const moveCalendarMonth = (offset) => {
    const nextMonth = new Date(
      selectedDateValue.getFullYear(),
      selectedDateValue.getMonth() + offset,
      1
    );
    const lastDayInMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
    nextMonth.setDate(Math.min(selectedDateValue.getDate(), lastDayInMonth));
    setSelectedDate(toDateKey(nextMonth));
    setAppointmentNotice('');
  };

  const renderInquiryList = (items) => {
    if (inquiryError) {
      return <p className="admin-inquiry-error" role="alert">{inquiryError}</p>;
    }

    if (!items.length) {
      return (
        <EmptyState icon="✉" title="No inquiries to show">
            Submit the website contact form or add a demo inquiry. No message is sent to the center.
        </EmptyState>
      );
    }

    return (
      <div className="admin-inquiry-list">
        {items.map((inquiry) => (
          <InquiryCard
            key={inquiry.id}
            inquiry={inquiry}
            onDelete={removeInquiry}
            onUpdate={updateInquiry}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="admin-shell">
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
              onClick={() => setActiveSection(id)}
            >
              <span className="admin-nav-icon" aria-hidden="true">{icon}</span>
              <span>{label}</span>
              {id === 'inquiries' && <span className="admin-nav-count">{inquiries.length}</span>}
            </button>
          ))}
        </nav>

        <a className="admin-back-link" href="/">
          <span aria-hidden="true">↗</span>
          <span>View website</span>
        </a>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">Hope &amp; Bloom <span>/</span> Admin</div>
          <div className="admin-profile">
            <span className="admin-avatar" aria-hidden="true">H</span>
            <span>Admin preview</span>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <p className="admin-eyebrow">{section.eyebrow}</p>
              <h1>{section.title}</h1>
              <p className="admin-page-description">{section.description}</p>
            </div>
            {activeSection === 'dashboard' && (
              <a className="admin-primary-link" href="/#contact">View contact form <span aria-hidden="true">↗</span></a>
            )}
          </div>

          <div className="admin-preview-notice" role="note">
            <span className="admin-notice-icon" aria-hidden="true">i</span>
            <p><strong>Local demo only.</strong> Inquiries are stored in this browser, without login or encryption. Use fake test details only; do not enter real family or child information.</p>
          </div>

          {activeSection === 'dashboard' && (
            <>
              <section className="admin-stats" aria-label="Website overview">
                <article className="admin-stat-card">
                  <span className="admin-stat-icon admin-stat-teal" aria-hidden="true">✉</span>
                  <span className="admin-stat-label">Demo inquiries</span>
                  <strong>{inquiries.length}</strong>
                  <span className="admin-stat-caption">Stored in this browser only</span>
                </article>
                <article className="admin-stat-card">
                  <span className="admin-stat-icon admin-stat-gold" aria-hidden="true">▦</span>
                  <span className="admin-stat-label">Upcoming consultations</span>
                  <strong>0</strong>
                  <span className="admin-stat-caption">Online booking is not connected</span>
                </article>
                <article className="admin-stat-card">
                  <span className="admin-stat-icon admin-stat-coral" aria-hidden="true">✿</span>
                  <span className="admin-stat-label">Website programs</span>
                  <strong>{programs.length}</strong>
                  <span className="admin-stat-caption">Currently listed on the website</span>
                </article>
              </section>

              <section className="admin-panel" aria-labelledby="admin-recent-title">
                <div className="admin-panel-heading">
                  <div>
                    <h2 id="admin-recent-title">Recent inquiries</h2>
                    <p>New messages from families</p>
                  </div>
                  <div className="admin-panel-heading-actions">
                    <button
                      className="admin-add-inquiry-button"
                      type="button"
                      onClick={() => {
                        setActiveSection('inquiries');
                        setShowInquiryForm(true);
                        setInquiryNotice('');
                      }}
                    >
                      Add inquiry
                    </button>
                    <button className="admin-text-button" type="button" onClick={() => setActiveSection('inquiries')}>
                      View inquiries <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
                {renderInquiryList(inquiries.slice(0, 3))}
              </section>
            </>
          )}

          {activeSection === 'inquiries' && (
            <section className="admin-panel" aria-label="Inquiries">
              <div className="admin-panel-heading">
                <div>
                  <h2>Website contact form</h2>
                  <p>{inquiries.length} demo {inquiries.length === 1 ? 'inquiry' : 'inquiries'} stored in this browser</p>
                </div>
                <button
                  className="admin-add-inquiry-button"
                  type="button"
                  aria-expanded={showInquiryForm}
                  onClick={() => {
                    setShowInquiryForm((isOpen) => !isOpen);
                    setInquiryNotice('');
                  }}
                >
                  {showInquiryForm ? 'Cancel' : 'Add inquiry'}
                </button>
              </div>
              {showInquiryForm && (
                <form
                  className="admin-inquiry-form"
                  id="admin-add-inquiry-form"
                  onSubmit={addInquiry}
                >
                  <div className="admin-inquiry-form-fields">
                    <div className="form-group">
                      <label htmlFor="admin-inquiry-name">Parent or guardian name</label>
                      <input id="admin-inquiry-name" name="name" required maxLength="120" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-inquiry-email">Email (optional)</label>
                      <input id="admin-inquiry-email" name="email" type="email" maxLength="254" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-inquiry-phone">Phone (optional)</label>
                      <input id="admin-inquiry-phone" name="phone" type="tel" maxLength="40" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-inquiry-preferred-contact">Preferred contact method</label>
                      <select id="admin-inquiry-preferred-contact" name="preferredContact" defaultValue="either" required>
                        <option value="either">Either email or phone</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-inquiry-program">Program of interest</label>
                      <select id="admin-inquiry-program" name="program" defaultValue="Not sure yet">
                        <option>Not sure yet</option>
                        {programs.map((program) => <option key={program}>{program}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-inquiry-age">Child's age range (optional)</label>
                      <select id="admin-inquiry-age" name="age" defaultValue="">
                        <option value="">Prefer not to say</option>
                        <option>Under 3 years old</option>
                        <option>3 to 5 years old</option>
                        <option>6 to 12 years old</option>
                        <option>13+ years old</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-inquiry-message">Message (optional)</label>
                      <textarea id="admin-inquiry-message" name="message" rows="3" maxLength="2000" placeholder="Do not include sensitive medical details." />
                    </div>
                  </div>
                  <div className="admin-inquiry-form-actions">
                    <button className="admin-done-button" type="submit">Save inquiry</button>
                  </div>
                </form>
              )}
              {inquiryNotice && <p className="admin-inquiry-notice" role="status">{inquiryNotice}</p>}
              {renderInquiryList(inquiries)}
            </section>
          )}

          {activeSection === 'appointments' && (
            <div className="admin-appointment-layout">
              <section className="admin-panel admin-calendar-panel" aria-label="Appointment calendar">
                <div className="admin-calendar-heading">
                  <div>
                    <h2>Appointment calendar</h2>
                    <p>Appointments are stored in this browser only.</p>
                  </div>
                  <div className="admin-calendar-month-controls">
                    <button type="button" aria-label="Previous month" onClick={() => moveCalendarMonth(-1)}>‹</button>
                    <button type="button" aria-label="Next month" onClick={() => moveCalendarMonth(1)}>›</button>
                  </div>
                </div>
                <h3 className="admin-calendar-month">
                  {selectedDateValue.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                </h3>
                <div className="admin-calendar-grid" aria-label="Calendar days">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <span className="admin-calendar-weekday" key={day}>{day}</span>
                  ))}
                  {calendarCells.map((day, index) => {
                    if (day === null) {
                      return <span className="admin-calendar-blank" key={`blank-${index}`} aria-hidden="true" />;
                    }

                    const date = new Date(
                      selectedDateValue.getFullYear(),
                      selectedDateValue.getMonth(),
                      day
                    );
                    const dateKey = toDateKey(date);
                    const count = appointmentCounts[dateKey] || 0;
                    return (
                      <button
                        className={`admin-calendar-day${dateKey === selectedDate ? ' is-selected' : ''}${dateKey === toDateKey(new Date()) ? ' is-today' : ''}`}
                        type="button"
                        key={dateKey}
                        aria-pressed={dateKey === selectedDate}
                        aria-label={`${date.toLocaleDateString()}${count ? `, ${count} ${count === 1 ? 'appointment' : 'appointments'}` : ''}`}
                        onClick={() => {
                          setSelectedDate(dateKey);
                          setAppointmentNotice('');
                        }}
                      >
                        <span>{day}</span>
                        {count > 0 && <span className="admin-calendar-count">{count}</span>}
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="admin-appointment-details">
                <section className="admin-panel admin-selected-day" aria-label="Selected day appointments">
                  <div className="admin-panel-heading">
                    <div>
                      <h2>{selectedDateValue.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
                      <p>{selectedDayAppointments.length} {selectedDayAppointments.length === 1 ? 'appointment' : 'appointments'}</p>
                    </div>
                  </div>
                  {appointmentError && <p className="admin-inquiry-error" role="alert">{appointmentError}</p>}
                  {!appointmentError && !selectedDayAppointments.length && (
                    <p className="admin-calendar-empty">No appointments on this day.</p>
                  )}
                  {!appointmentError && selectedDayAppointments.map((appointment) => (
                    <article className="admin-appointment-card" key={appointment.id}>
                      <div>
                        <time>{appointment.time}</time>
                        <h3>{appointment.name}</h3>
                        <p>{appointment.type}</p>
                        {appointment.notes && <p className="admin-appointment-notes">{appointment.notes}</p>}
                      </div>
                      <button
                        className="admin-delete-button"
                        type="button"
                        onClick={() => removeAppointment(appointment.id)}
                        aria-label={`Delete ${appointment.type} appointment for ${appointment.name}`}
                      >
                        Delete
                      </button>
                    </article>
                  ))}
                </section>

                <section className="admin-panel admin-new-appointment" aria-label="Create a demo appointment">
                  <h2>Add appointment</h2>
                  <p className="admin-new-appointment-date">
                    {selectedDateValue.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <form className="admin-appointment-form" onSubmit={addAppointment}>
                    <div className="form-group">
                      <label htmlFor="appointment-client">Client name</label>
                      <input id="appointment-client" name="clientName" required maxLength="120" placeholder="Test client name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="appointment-time">Time</label>
                      <input id="appointment-time" name="time" type="time" required defaultValue="09:00" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="appointment-type">Appointment type</label>
                      <select id="appointment-type" name="type" defaultValue="Consultation">
                        <option>Consultation</option>
                        <option>Assessment</option>
                        <option>Therapy session</option>
                        <option>Parent coaching</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="appointment-notes">Notes (optional)</label>
                      <textarea id="appointment-notes" name="notes" rows="2" maxLength="1000" placeholder="Demo note" />
                    </div>
                    <button className="btn admin-appointment-submit" type="submit">
                      <span>Add demo appointment</span>
                      <span className="btn-arrow" aria-hidden="true">→</span>
                    </button>
                    {appointmentNotice && <p className="admin-appointment-notice" role="status">{appointmentNotice}</p>}
                  </form>
                </section>
              </div>
            </div>
          )}

          {activeSection === 'programs' && (
            <section className="admin-panel" aria-label="Website programs">
              <div className="admin-panel-heading">
                <div>
                  <h2>Programs on the website</h2>
                  <p>Read-only preview</p>
                </div>
                <span className="admin-readonly-label">READ ONLY</span>
              </div>
              <ul className="admin-program-list">
                {programs.map((program) => (
                  <li key={program}>
                    <span className="admin-program-check" aria-hidden="true">✓</span>
                    {program}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeSection === 'settings' && (
            <section className="admin-panel admin-settings-panel" aria-label="Admin settings">
              <span className="admin-settings-icon" aria-hidden="true">⚙</span>
              <div>
                <h2>Admin tools are not connected</h2>
                <p>This preview has no administrator sign-in or secure database. Demo inquiries remain in this browser’s local storage. Do not enter or store real family information here.</p>
              </div>
            </section>
          )}

          <footer className="admin-footer">Hope and Bloom · Admin preview</footer>
        </div>
      </main>
    </div>
  );
}
