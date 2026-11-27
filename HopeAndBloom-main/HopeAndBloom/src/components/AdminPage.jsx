import { useEffect, useState } from 'react';
import {
  deleteDemoInquiry,
  getDemoInquiries,
  INQUIRIES_UPDATED_EVENT,
  saveDemoInquiry,
  updateDemoInquiry
} from '../data/inquiries.js';
import {
  APPOINTMENTS_UPDATED_EVENT,
  deleteDemoAppointment,
  getDemoAppointments,
  saveDemoAppointment
} from '../data/appointments.js';
import {
  DEFAULT_PROGRAMS,
  getPrograms,
  PROGRAMS_UPDATED_EVENT,
  savePrograms
} from '../data/programs.js';
import {
  getDemoPromoNotifications,
  markDemoPromoNotificationsRead,
  PROMO_NOTIFICATIONS_UPDATED_EVENT
} from '../data/promoNotifications.js';
import { AppointmentSection } from './admin/AppointmentSection.jsx';
import { ProgramsSection } from './admin/ProgramsSection.jsx';
import { WalkInInquirySection } from './admin/WalkInInquirySection.jsx';
import { AdminSidebar } from './admin/AdminSidebar.jsx';
import { AppointmentConflictDialog } from './admin/AppointmentConflictDialog.jsx';
import { DashboardSection, InquiriesSection } from './admin/InquirySections.jsx';
import { PromoNotificationsSection } from './admin/PromoNotificationsSection.jsx';
import { fromDateKey, toDateKey } from '../utils/date.js';

function createEmptyWalkInForm() {
  return {
    name: '',
    contactNumber: '',
    email: '',
    relationship: '',
    childName: '',
    age: 'under-3',
    address: '',
    message: ''
  };
}

function createEmptyProgramForm() {
  return { title: '', age: '', description: '' };
}

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
  'promo-alerts': {
    eyebrow: 'PROMO ACTIVITY',
    title: 'Promo alerts',
    description: 'Review demo package selections from this browser.'
  },
  settings: {
    eyebrow: 'ADMINISTRATION',
    title: 'Settings',
    description: 'Admin access and data storage are not configured in this preview.'
  }
};

export function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [inquiries, setInquiries] = useState([]);
  const [inquiryError, setInquiryError] = useState('');
  const [walkInForm, setWalkInForm] = useState(createEmptyWalkInForm);
  const [appointments, setAppointments] = useState([]);
  const [appointmentError, setAppointmentError] = useState('');
  const [appointmentNotice, setAppointmentNotice] = useState('');
  const [appointmentConflict, setAppointmentConflict] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [programError, setProgramError] = useState('');
  const [programNotice, setProgramNotice] = useState('');
  const [editingProgramId, setEditingProgramId] = useState('');
  const [programForm, setProgramForm] = useState(createEmptyProgramForm);
  const [promoNotifications, setPromoNotifications] = useState([]);
  const [promoNotificationError, setPromoNotificationError] = useState('');
  const section = sectionCopy[activeSection];
  const unreadPromoNotificationCount = promoNotifications.filter(
    (notification) => !notification.isRead
  ).length;

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

    const refreshPromoNotifications = () => {
      try {
        setPromoNotifications(getDemoPromoNotifications());
        setPromoNotificationError('');
      } catch (error) {
        setPromoNotificationError(error.message);
      }
    };

    refreshInquiries();
    refreshAppointments();
    refreshPrograms();
    refreshPromoNotifications();
    const subscriptions = [
      [INQUIRIES_UPDATED_EVENT, refreshInquiries],
      [APPOINTMENTS_UPDATED_EVENT, refreshAppointments],
      [PROGRAMS_UPDATED_EVENT, refreshPrograms],
      [PROMO_NOTIFICATIONS_UPDATED_EVENT, refreshPromoNotifications]
    ];

    subscriptions.forEach(([eventName, refresh]) => {
      window.addEventListener(eventName, refresh);
      window.addEventListener('storage', refresh);
    });

    return () => {
      subscriptions.forEach(([eventName, refresh]) => {
        window.removeEventListener(eventName, refresh);
        window.removeEventListener('storage', refresh);
      });
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

  const addWalkInInquiry = (event) => {
    event.preventDefault();
    try {
      saveDemoInquiry({ ...walkInForm, source: 'walk-in' });
      setWalkInForm(createEmptyWalkInForm());
      setInquiryError('');
      setActiveSection('inquiries');
    } catch (error) {
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

  const markAllPromoNotificationsRead = () => {
    try {
      markDemoPromoNotificationsRead();
      setPromoNotificationError('');
    } catch (error) {
      setPromoNotificationError(error.message);
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
      setProgramForm(createEmptyProgramForm());
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
    setProgramForm(createEmptyProgramForm());
    setEditingProgramId('');
    setProgramError('');
    setProgramNotice('');
  };

  const selectedDateValue = fromDateKey(selectedDate);
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

  return (
    <div className="admin-shell">
      <AdminSidebar
        activeSection={activeSection}
        inquiryCount={inquiries.length}
        promoNotificationCount={unreadPromoNotificationCount}
        onNavigate={setActiveSection}
      />

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">Hope &amp; Bloom <span>/</span> Admin</div>
          <div className="admin-profile">
            <span className="admin-avatar" aria-hidden="true">H</span>
            <span>Admin preview</span>
          </div>
        </header>

        <div className="admin-content">
          {unreadPromoNotificationCount > 0 && activeSection !== 'promo-alerts' && (
            <div className="admin-promo-alert-banner" role="status">
              <span>
                {unreadPromoNotificationCount} new demo promo {unreadPromoNotificationCount === 1 ? 'selection' : 'selections'}.
                These are not verified payments.
              </span>
              <button type="button" onClick={() => setActiveSection('promo-alerts')}>
                View alerts
              </button>
            </div>
          )}

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
            <p><strong>Local demo only.</strong> Inquiries, appointments, promo selections, and program settings are stored in this browser, without login or encryption. Promo selections do not confirm payment. Use fake test details only; do not enter real family or child information.</p>
          </div>

          {activeSection === 'dashboard' && (
            <DashboardSection
              inquiries={inquiries}
              publishedProgramCount={programs.filter((program) => program.active).length}
              inquiryError={inquiryError}
              onDeleteInquiry={removeInquiry}
              onUpdateInquiry={updateInquiry}
              onViewInquiries={() => setActiveSection('inquiries')}
            />
          )}

          {activeSection === 'inquiries' && (
            <InquiriesSection
              inquiries={inquiries}
              inquiryError={inquiryError}
              onDeleteInquiry={removeInquiry}
              onUpdateInquiry={updateInquiry}
              onAddInquiry={() => setActiveSection('add-inquiry')}
            />
          )}

          {activeSection === 'add-inquiry' && (
            <WalkInInquirySection
              walkInForm={walkInForm}
              setWalkInForm={setWalkInForm}
              onSubmit={addWalkInInquiry}
            />
          )}

          {activeSection === 'appointments' && (
            <AppointmentSection
              appointments={appointments}
              appointmentError={appointmentError}
              appointmentNotice={appointmentNotice}
              selectedDate={selectedDate}
              onSelectDate={(dateKey) => {
                setSelectedDate(dateKey);
                setAppointmentNotice('');
              }}
              onMoveMonth={moveCalendarMonth}
              onDeleteAppointment={removeAppointment}
              onAddAppointment={addAppointment}
            />
          )}

          {activeSection === 'programs' && (
            <ProgramsSection
              programs={programs}
              programError={programError}
              programNotice={programNotice}
              editingProgramId={editingProgramId}
              programForm={programForm}
              setProgramForm={setProgramForm}
              onSaveProgram={saveProgram}
              onEditProgram={editProgram}
              onToggleProgramVisibility={toggleProgramVisibility}
              onCancelEdit={cancelProgramEdit}
            />
          )}

          {activeSection === 'promo-alerts' && (
            <PromoNotificationsSection
              notifications={promoNotifications}
              error={promoNotificationError}
              onMarkAllRead={markAllPromoNotificationsRead}
            />
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
      <AppointmentConflictDialog conflict={appointmentConflict} onClose={() => setAppointmentConflict(null)} />
    </div>
  );
}
