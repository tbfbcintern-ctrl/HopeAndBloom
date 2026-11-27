import { useEffect, useRef, useState } from 'react';
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
import {
  DEFAULT_PROGRAMS,
  getPrograms,
  PROGRAMS_UPDATED_EVENT,
  savePrograms
} from '../programs.js';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'inquiries', label: 'Inquiries', icon: '✉' },
  { id: 'add-inquiry', label: 'Add Inquiry', icon: '+' },
  { id: 'appointments', label: 'Appointments', icon: '▦' },
  { id: 'programs', label: 'Programs', icon: '✿' },
  { id: 'settings', label: 'Settings', icon: '⚙' }
];

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
  'add-inquiry': {
    eyebrow: 'WALK-IN REGISTRATION',
    title: 'Add Inquiry',
    description: 'Manually record an inquiry received directly at the center.'
  },
  appointments: {
    eyebrow: 'SCHEDULE',
    title: 'Appointments',
    description: 'Create and manage local demo appointments on the calendar.'
  },
  programs: {
    eyebrow: 'CENTER SERVICES',
    title: 'Programs',
    description: 'Manage the services families see on the Hope and Bloom website.'
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
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setComment(inquiry.comment);
  }, [inquiry.comment]);

  const saveComment = () => {
    if (onUpdate(inquiry.id, { comment })) {
      setCommentSaved(true);
    }
  };

  const markDone = () => {
    onUpdate(inquiry.id, { status: inquiry.status === 'done' ? 'open' : 'done' });
  };

  const startEditing = () => {
    setEditForm({
      name: inquiry.name,
      contactNumber: inquiry.contactNumber || '',
      email: inquiry.email,
      relationship: inquiry.relationship || '',
      childName: inquiry.childName || '',
      age: inquiry.age,
      address: inquiry.address || '',
      message: inquiry.message
    });
    setIsEditing(true);
  };

  const saveEdits = (event) => {
    event.preventDefault();
    if (onUpdate(inquiry.id, editForm)) {
      setIsEditing(false);
    }
  };

  return (
    <article className={`admin-inquiry-card${inquiry.status === 'done' ? ' is-done' : ''}`}>
      {isEditing ? (
        <form className="admin-walk-in-form admin-inquiry-edit-form" onSubmit={saveEdits}>
          <div className="admin-walk-in-heading">
            <h3>Edit inquiry</h3>
          </div>
          <div className="admin-walk-in-grid">
            <div className="form-group">
              <label htmlFor={`inquiry-name-${inquiry.id}`}>Parent or Guardian Name</label>
              <input id={`inquiry-name-${inquiry.id}`} required value={editForm.name} onChange={(event) => setEditForm({ ...editForm, name: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-contact-${inquiry.id}`}>Contact Number</label>
              <input id={`inquiry-contact-${inquiry.id}`} type="tel" required value={editForm.contactNumber} onChange={(event) => setEditForm({ ...editForm, contactNumber: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-email-${inquiry.id}`}>Email Address</label>
              <input id={`inquiry-email-${inquiry.id}`} type="email" value={editForm.email} onChange={(event) => setEditForm({ ...editForm, email: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-relationship-${inquiry.id}`}>Relationship to the Child</label>
              <select id={`inquiry-relationship-${inquiry.id}`} value={editForm.relationship} onChange={(event) => setEditForm({ ...editForm, relationship: event.target.value })}>
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="guardian">Guardian</option>
                <option value="grandparent">Grandparent</option>
                <option value="teacher">Teacher</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-child-name-${inquiry.id}`}>Child's Name</label>
              <input id={`inquiry-child-name-${inquiry.id}`} value={editForm.childName} onChange={(event) => setEditForm({ ...editForm, childName: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-age-${inquiry.id}`}>Child's Age</label>
              <select id={`inquiry-age-${inquiry.id}`} required value={editForm.age} onChange={(event) => setEditForm({ ...editForm, age: event.target.value })}>
                <option value="under-3">Under 3 years old</option>
                <option value="3-5">3 to 5 years old</option>
                <option value="6-12">6 to 12 years old</option>
                <option value="13-plus">13+ years old</option>
              </select>
            </div>
            <div className="form-group admin-walk-in-full">
              <label htmlFor={`inquiry-address-${inquiry.id}`}>Address</label>
              <input id={`inquiry-address-${inquiry.id}`} value={editForm.address} onChange={(event) => setEditForm({ ...editForm, address: event.target.value })} />
            </div>
            <div className="form-group admin-walk-in-full">
              <label htmlFor={`inquiry-message-${inquiry.id}`}>How Can We Help?</label>
              <textarea id={`inquiry-message-${inquiry.id}`} rows="3" value={editForm.message} onChange={(event) => setEditForm({ ...editForm, message: event.target.value })} />
            </div>
          </div>
          <div className="admin-inquiry-actions">
            <button className="admin-done-button" type="submit">Save changes</button>
            <button className="admin-delete-button" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
      <>
      <div className="admin-inquiry-heading">
        <div>
          <div className="admin-inquiry-title-row">
            <h3>{inquiry.name}</h3>
            <span className={`admin-inquiry-status${inquiry.status === 'done' ? ' is-done' : ''}`}>
              {inquiry.status === 'done' ? 'Done' : 'Open'}
            </span>
          </div>
          {inquiry.email && <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>}
          {inquiry.source === 'walk-in' && <span className="admin-inquiry-source">Walk-in</span>}
          {inquiry.contactNumber && (
            <a href={`tel:${inquiry.contactNumber}`}>{inquiry.contactNumber}</a>
          )}
        </div>
        <div className="admin-inquiry-actions">
          <button className="admin-done-button" type="button" onClick={startEditing}>Edit</button>
          <button
            className="admin-done-button"
            type="button"
            onClick={markDone}
          >
            {inquiry.status === 'done' ? 'Reopen' : 'Mark as done'}
          </button>
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
        {inquiry.childName && <span>Child: {inquiry.childName}</span>}
        <span>Child age: {inquiry.age}</span>
        {inquiry.relationship && <span>Relationship: {inquiry.relationship}</span>}
        {inquiry.address && <span>Address: {inquiry.address}</span>}
        <time dateTime={inquiry.createdAt}>{new Date(inquiry.createdAt).toLocaleString()}</time>
      </div>
      {inquiry.message && <p className="admin-inquiry-message">{inquiry.message}</p>}
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
      </>
      )}
    </article>
  );
}

export function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [inquiries, setInquiries] = useState([]);
  const [inquiryError, setInquiryError] = useState('');
  const [inquiryNotice, setInquiryNotice] = useState('');
  const [walkInForm, setWalkInForm] = useState({
    name: '',
    contactNumber: '',
    email: '',
    relationship: '',
    childName: '',
    age: 'under-3',
    address: '',
    message: ''
  });
  const [appointments, setAppointments] = useState([]);
  const [appointmentError, setAppointmentError] = useState('');
  const [appointmentNotice, setAppointmentNotice] = useState('');
  const [appointmentConflict, setAppointmentConflict] = useState(null);
  const appointmentConflictDialogRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [programError, setProgramError] = useState('');
  const [programNotice, setProgramNotice] = useState('');
  const [editingProgramId, setEditingProgramId] = useState('');
  const [programForm, setProgramForm] = useState({ title: '', age: '', description: '' });
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

    const refreshPrograms = () => {
      try {
        setPrograms(getPrograms());
        setProgramError('');
      } catch (error) {
        setProgramError(error.message);
      }
    };

    refreshInquiries();
    refreshAppointments();
    refreshPrograms();
    window.addEventListener(INQUIRIES_UPDATED_EVENT, refreshInquiries);
    window.addEventListener('storage', refreshInquiries);
    window.addEventListener(APPOINTMENTS_UPDATED_EVENT, refreshAppointments);
    window.addEventListener('storage', refreshAppointments);
    window.addEventListener(PROGRAMS_UPDATED_EVENT, refreshPrograms);
    window.addEventListener('storage', refreshPrograms);
    return () => {
      window.removeEventListener(INQUIRIES_UPDATED_EVENT, refreshInquiries);
      window.removeEventListener('storage', refreshInquiries);
      window.removeEventListener(APPOINTMENTS_UPDATED_EVENT, refreshAppointments);
      window.removeEventListener('storage', refreshAppointments);
      window.removeEventListener(PROGRAMS_UPDATED_EVENT, refreshPrograms);
      window.removeEventListener('storage', refreshPrograms);
    };
  }, []);

  useEffect(() => {
    const dialog = appointmentConflictDialogRef.current;
    if (!dialog) return;

    if (appointmentConflict && !dialog.open) {
      dialog.showModal();
    } else if (!appointmentConflict && dialog.open) {
      dialog.close();
    }
  }, [appointmentConflict]);

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

  const addWalkInInquiry = (event) => {
    event.preventDefault();
    try {
      saveDemoInquiry({ ...walkInForm, source: 'walk-in' });
      setWalkInForm({
        name: '',
        contactNumber: '',
        email: '',
        relationship: '',
        childName: '',
        age: 'under-3',
        address: '',
        message: ''
      });
      setInquiryError('');
      setInquiryNotice('');
      setActiveSection('inquiries');
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
      if (error.code === 'APPOINTMENT_CONFLICT' || error.code === 'APPOINTMENT_PAST_DATE') {
        setAppointmentError('');
        setAppointmentConflict({
          reason: error.code,
          name: error.appointment ? error.appointment.name : '',
          date: selectedDate,
          time: error.appointment ? error.appointment.time : '',
          type: error.appointment ? error.appointment.type : ''
        });
      } else {
        setAppointmentError(error.message);
      }
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

  const persistPrograms = (updatedPrograms, successMessage) => {
    try {
      savePrograms(updatedPrograms);
      setPrograms(updatedPrograms);
      setProgramError('');
      setProgramNotice(successMessage);
      return true;
    } catch (error) {
      setProgramNotice('');
      setProgramError(error.message);
      return false;
    }
  };

  const saveProgram = (event) => {
    event.preventDefault();
    const title = programForm.title.trim();
    const age = programForm.age.trim();
    const description = programForm.description.trim();
    const isEditing = Boolean(editingProgramId);
    const updatedPrograms = isEditing
      ? programs.map((program) => (
        program.id === editingProgramId
          ? { ...program, title, age, description }
          : program
      ))
      : [{
        id: `program-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        title,
        age,
        description,
        active: true
      }, ...programs];

    const successMessage = isEditing
      ? 'Program changes saved in this browser. Published programs appear on the website.'
      : 'Program added and published on the website in this browser.';
    if (persistPrograms(updatedPrograms, successMessage)) {
      setProgramForm({ title: '', age: '', description: '' });
      setEditingProgramId('');
    }
  };

  const editProgram = (program) => {
    setEditingProgramId(program.id);
    setProgramForm({
      title: program.title,
      age: program.age,
      description: program.description
    });
    setProgramNotice('');
    setProgramError('');
  };

  const toggleProgramVisibility = (program) => {
    const active = !program.active;
    const updatedPrograms = programs.map((item) => (
      item.id === program.id ? { ...item, active } : item
    ));
    persistPrograms(
      updatedPrograms,
      active
        ? 'Program published on the website in this browser.'
        : 'Program hidden from the website in this browser.'
    );
  };

  const cancelProgramEdit = () => {
    setProgramForm({ title: '', age: '', description: '' });
    setEditingProgramId('');
    setProgramError('');
    setProgramNotice('');
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
          Submit the website contact form with test details to see a demo inquiry here. No message is sent.
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
            <p><strong>Local demo only.</strong> Inquiries, appointments, and program settings are stored in this browser, without login or encryption. Use fake test details only; do not enter real family or child information.</p>
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
                  <strong>{programs.filter((program) => program.active).length}</strong>
                  <span className="admin-stat-caption">Published on the website in this browser</span>
                </article>
              </section>

              <section className="admin-panel" aria-labelledby="admin-recent-title">
                <div className="admin-panel-heading">
                  <div>
                    <h2 id="admin-recent-title">Recent inquiries</h2>
                    <p>New messages from families</p>
                  </div>
                  <button className="admin-text-button" type="button" onClick={() => setActiveSection('inquiries')}>
                    View inquiries <span aria-hidden="true">→</span>
                  </button>
                </div>
                {renderInquiryList(inquiries.slice(0, 3))}
              </section>
            </>
          )}

          {activeSection === 'inquiries' && (
            <section className="admin-panel" aria-label="Inquiries">
              <div className="admin-panel-heading">
                <div>
                  <h2>Consultation inquiries</h2>
                  <p>{inquiries.length} demo {inquiries.length === 1 ? 'inquiry' : 'inquiries'} stored in this browser</p>
                </div>
                <button className="admin-text-button" type="button" onClick={() => setActiveSection('add-inquiry')}>
                  Add inquiry <span aria-hidden="true">+</span>
                </button>
              </div>
              {renderInquiryList(inquiries)}
            </section>
          )}

          {activeSection === 'add-inquiry' && (
            <section className="admin-panel" aria-label="Add inquiry">
              <div className="admin-panel-heading">
                <div>
                  <h2>Add walk-in inquiry</h2>
                  <p>Enter details received directly at the center.</p>
                </div>
                <span className="admin-readonly-label">LOCAL DEMO</span>
              </div>
              <form className="admin-walk-in-form" onSubmit={addWalkInInquiry}>
                <div className="admin-walk-in-grid">
                  <div className="form-group">
                    <label htmlFor="walkin-name">Parent or Guardian Name</label>
                    <input id="walkin-name" required value={walkInForm.name} onChange={(event) => setWalkInForm({ ...walkInForm, name: event.target.value })} placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="walkin-contact">Contact Number</label>
                    <input id="walkin-contact" type="tel" required value={walkInForm.contactNumber} onChange={(event) => setWalkInForm({ ...walkInForm, contactNumber: event.target.value })} placeholder="09xx xxx xxxx" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="walkin-email">Email Address <span>(optional)</span></label>
                    <input id="walkin-email" type="email" value={walkInForm.email} onChange={(event) => setWalkInForm({ ...walkInForm, email: event.target.value })} placeholder="you@example.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="walkin-relationship">Relationship to the Child</label>
                    <select id="walkin-relationship" value={walkInForm.relationship} onChange={(event) => setWalkInForm({ ...walkInForm, relationship: event.target.value })}>
                      <option value="">Select relationship</option>
                      <option value="parent">Parent</option>
                      <option value="guardian">Guardian</option>
                      <option value="grandparent">Grandparent</option>
                      <option value="teacher">Teacher</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="walkin-child-name">Child's Name <span>(optional)</span></label>
                    <input id="walkin-child-name" value={walkInForm.childName} onChange={(event) => setWalkInForm({ ...walkInForm, childName: event.target.value })} placeholder="Child's name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="walkin-age">Child's Age</label>
                    <select id="walkin-age" required value={walkInForm.age} onChange={(event) => setWalkInForm({ ...walkInForm, age: event.target.value })}>
                      <option value="under-3">Under 3 years old</option>
                      <option value="3-5">3 to 5 years old</option>
                      <option value="6-12">6 to 12 years old</option>
                      <option value="13-plus">13+ years old</option>
                    </select>
                  </div>
                  <div className="form-group admin-walk-in-full">
                    <label htmlFor="walkin-address">Address <span>(optional)</span></label>
                    <input id="walkin-address" value={walkInForm.address} onChange={(event) => setWalkInForm({ ...walkInForm, address: event.target.value })} placeholder="Street, barangay, city" />
                  </div>
                  <div className="form-group admin-walk-in-full">
                    <label htmlFor="walkin-message">How Can We Help?</label>
                    <textarea id="walkin-message" rows="3" value={walkInForm.message} onChange={(event) => setWalkInForm({ ...walkInForm, message: event.target.value })} placeholder="Concerns, goals, or notes from the walk-in consultation" />
                  </div>
                </div>
                <button className="admin-done-button admin-walk-in-submit" type="submit">Add walk-in inquiry</button>
              </form>
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
            <section className="admin-panel admin-programs-panel" aria-label="Manage website programs">
              <div className="admin-panel-heading">
                <div>
                  <h2>Program catalog</h2>
                  <p>{programs.filter((program) => program.active).length} published · {programs.length} total</p>
                </div>
                <span className="admin-readonly-label">LOCAL DEMO</span>
              </div>
              <p className="admin-programs-help">Add or edit a service, then publish or hide it from the public Programs section. Changes stay in this browser.</p>
              {programError && <p className="admin-inquiry-error" role="alert">{programError}</p>}
              {programNotice && <p className="admin-appointment-notice" role="status">{programNotice}</p>}

              <div className="admin-program-manager">
                <div className="admin-program-manager-list">
                  {programs.map((program) => (
                    <article className={`admin-program-card${program.active ? '' : ' is-hidden'}`} key={program.id}>
                      <div className="admin-program-card-heading">
                        <div>
                          <span className={`admin-program-state${program.active ? ' is-published' : ''}`}>
                            {program.active ? 'Published' : 'Hidden'}
                          </span>
                          <h3>{program.title}</h3>
                          <p className="admin-program-age">{program.age}</p>
                        </div>
                        <div className="admin-program-actions">
                          <button className="admin-done-button" type="button" onClick={() => editProgram(program)}>
                            Edit
                          </button>
                          <button className="admin-delete-button" type="button" onClick={() => toggleProgramVisibility(program)}>
                            {program.active ? 'Hide' : 'Publish'}
                          </button>
                        </div>
                      </div>
                      <p className="admin-program-description">{program.description}</p>
                    </article>
                  ))}
                </div>

                <form className="admin-panel admin-program-form" onSubmit={saveProgram}>
                  <h3>{editingProgramId ? 'Edit program' : 'Add a program'}</h3>
                  <p>{editingProgramId ? 'Update the details shown to families.' : 'New programs are published on this browser’s website preview.'}</p>
                  <div className="form-group">
                    <label htmlFor="program-title">Program name</label>
                    <input
                      id="program-title"
                      required
                      maxLength="100"
                      value={programForm.title}
                      onChange={(event) => setProgramForm({ ...programForm, title: event.target.value })}
                      placeholder="e.g. Play and Learning"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="program-age">Age range or group</label>
                    <input
                      id="program-age"
                      required
                      maxLength="80"
                      value={programForm.age}
                      onChange={(event) => setProgramForm({ ...programForm, age: event.target.value })}
                      placeholder="e.g. Ages 3–6"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="program-description">Description</label>
                    <textarea
                      id="program-description"
                      required
                      maxLength="1200"
                      rows="5"
                      value={programForm.description}
                      onChange={(event) => setProgramForm({ ...programForm, description: event.target.value })}
                      placeholder="Describe the service for families."
                    />
                  </div>
                  <button className="btn admin-program-submit" type="submit">
                    <span>{editingProgramId ? 'Save changes' : 'Add and publish'}</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </button>
                  {editingProgramId && (
                    <button className="admin-program-cancel" type="button" onClick={cancelProgramEdit}>
                      Cancel edit
                    </button>
                  )}
                </form>
              </div>
            </section>
          )}

          {activeSection === 'settings' && (
            <section className="admin-panel admin-settings-panel" aria-label="Admin settings">
              <span className="admin-settings-icon" aria-hidden="true">⚙</span>
              <div>
                <h2>Admin tools are not connected</h2>
                <p>This preview has no administrator sign-in or secure database. Demo inquiries, appointments, and program settings remain in this browser’s local storage. Do not enter or store real family information here.</p>
              </div>
            </section>
          )}

          <footer className="admin-footer">Hope and Bloom · Admin preview</footer>
        </div>
      </main>
      <dialog
        ref={appointmentConflictDialogRef}
        className="appointment-conflict-dialog"
        aria-labelledby="appointment-conflict-title"
        aria-describedby="appointment-conflict-description"
        onCancel={() => setAppointmentConflict(null)}
      >
        {appointmentConflict && (
          <>
            <div className="appointment-conflict-icon" aria-hidden="true">!</div>
            {appointmentConflict.reason === 'APPOINTMENT_PAST_DATE' ? (
              <>
                <p className="appointment-conflict-eyebrow">DATE NO LONGER AVAILABLE</p>
                <h2 id="appointment-conflict-title">This date has already passed</h2>
                <p id="appointment-conflict-description">
                  Appointments can’t be booked for {fromDateKey(appointmentConflict.date).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}.
                </p>
                <p className="appointment-conflict-tip">Please choose today or a future date.</p>
              </>
            ) : (
              <>
                <p className="appointment-conflict-eyebrow">SCHEDULE CONFLICT</p>
                <h2 id="appointment-conflict-title">This schedule is full</h2>
                <p id="appointment-conflict-description">
                  {appointmentConflict.name} already has a {appointmentConflict.type.toLowerCase()} appointment
                  {' '}on {fromDateKey(appointmentConflict.date).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })} at {appointmentConflict.time}.
                </p>
                <p className="appointment-conflict-tip">Please choose another available time.</p>
              </>
            )}
            <button
              className="btn appointment-conflict-close"
              type="button"
              onClick={() => setAppointmentConflict(null)}
            >
              {appointmentConflict.reason === 'APPOINTMENT_PAST_DATE' ? 'Choose another date' : 'Choose another time'}
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}
