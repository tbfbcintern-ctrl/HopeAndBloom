const STORAGE_KEY = 'hope-and-bloom:demo-appointments:v1';
export const APPOINTMENTS_UPDATED_EVENT = 'hope-and-bloom:appointments-updated';

function isAppointment(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && typeof value.date === 'string'
    && typeof value.time === 'string'
    && typeof value.type === 'string'
    && typeof value.notes === 'string'
    && typeof value.createdAt === 'string';
}

function readStoredAppointments() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (storedValue === null) {
    return [];
  }

  let appointments;
  try {
    appointments = JSON.parse(storedValue);
  } catch {
    throw new Error('Saved demo appointments are unreadable. Clear this site’s local storage and try again.');
  }

  if (!Array.isArray(appointments) || !appointments.every(isAppointment)) {
    throw new Error('Saved demo appointments have an invalid format. Clear this site’s local storage and try again.');
  }

  return appointments;
}

function writeStoredAppointments(appointments) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  window.dispatchEvent(new Event(APPOINTMENTS_UPDATED_EVENT));
}

export function getDemoAppointments() {
  return readStoredAppointments();
}

export function saveDemoAppointment({ name, date, time, type, notes }) {
  const appointment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: name.trim(),
    date: date.trim(),
    time: time.trim(),
    type: type.trim(),
    notes: notes.trim(),
    createdAt: new Date().toISOString()
  };

  if (!appointment.name || !appointment.type || !/^\d{4}-\d{2}-\d{2}$/.test(appointment.date)) {
    throw new Error('Please provide a client name, appointment date, and appointment type.');
  }

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(appointment.time)) {
    throw new Error('Please provide a valid appointment time.');
  }

  const [year, month, day] = appointment.date.split('-').map(Number);
  const parsedDate = new Date(year, month - 1, day);
  if (parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month - 1 || parsedDate.getDate() !== day) {
    throw new Error('Please provide a valid appointment date.');
  }

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (parsedDate < todayStart) {
    const pastDateError = new Error('Appointments cannot be booked for a date that has already passed.');
    pastDateError.code = 'APPOINTMENT_PAST_DATE';
    throw pastDateError;
  }

  const conflictingAppointment = readStoredAppointments().find((savedAppointment) =>
    savedAppointment.date === appointment.date && savedAppointment.time === appointment.time
  );
  if (conflictingAppointment) {
    const conflictError = new Error(
      `This schedule is full. ${conflictingAppointment.name} already has an appointment on ${appointment.date} at ${appointment.time}.`
    );
    conflictError.code = 'APPOINTMENT_CONFLICT';
    conflictError.appointment = conflictingAppointment;
    throw conflictError;
  }

  writeStoredAppointments([appointment, ...readStoredAppointments()]);
  return appointment;
}

export function deleteDemoAppointment(id) {
  const appointments = readStoredAppointments();
  writeStoredAppointments(appointments.filter((appointment) => appointment.id !== id));
}
