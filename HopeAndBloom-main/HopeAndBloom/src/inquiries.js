const STORAGE_KEY = 'hope-and-bloom:demo-inquiries:v1';
export const INQUIRIES_UPDATED_EVENT = 'hope-and-bloom:inquiries-updated';
const inquiryStatuses = ['new', 'contacted', 'scheduled', 'closed'];

function isInquiry(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && typeof value.email === 'string'
    && typeof value.age === 'string'
    && typeof value.message === 'string'
    && typeof value.createdAt === 'string'
    && (value.comment === undefined || typeof value.comment === 'string')
    && (value.phone === undefined || typeof value.phone === 'string')
    && (value.program === undefined || typeof value.program === 'string')
    && (
      value.preferredContact === undefined
      || ['email', 'phone', 'either'].includes(value.preferredContact)
    )
    && (value.followUpDate === undefined || typeof value.followUpDate === 'string')
    && (
      value.status === undefined
      || value.status === 'open'
      || value.status === 'done'
      || inquiryStatuses.includes(value.status)
    );
}

function readStoredInquiries() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (storedValue === null) {
    return [];
  }

  let inquiries;
  try {
    inquiries = JSON.parse(storedValue);
  } catch (error) {
    throw new Error('Saved demo inquiries are unreadable. Clear this site’s local storage and try again.');
  }

  if (!Array.isArray(inquiries) || !inquiries.every(isInquiry)) {
    throw new Error('Saved demo inquiries have an invalid format. Clear this site’s local storage and try again.');
  }

  return inquiries.map((inquiry) => ({
    ...inquiry,
    comment: inquiry.comment || '',
    phone: inquiry.phone || '',
    program: inquiry.program || '',
    preferredContact: inquiry.preferredContact || 'either',
    followUpDate: inquiry.followUpDate || '',
    status: inquiry.status === 'open' ? 'new' : inquiry.status === 'done' ? 'closed' : inquiry.status || 'new'
  }));
}

function writeStoredInquiries(inquiries) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  window.dispatchEvent(new Event(INQUIRIES_UPDATED_EVENT));
}

export function getDemoInquiries() {
  return readStoredInquiries();
}

export function saveDemoInquiry({
  name = '',
  email = '',
  phone = '',
  program = '',
  preferredContact = 'either',
  age = '',
  message = ''
}) {
  const inquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    program: program.trim(),
    preferredContact,
    age: age.trim(),
    message: message.trim(),
    comment: '',
    status: 'new',
    followUpDate: '',
    createdAt: new Date().toISOString()
  };

  if (!inquiry.name) {
    throw new Error('Please provide a parent or guardian name.');
  }

  if (!['email', 'phone', 'either'].includes(inquiry.preferredContact)) {
    throw new Error('Please choose a valid preferred contact method.');
  }

  if (inquiry.preferredContact === 'email' && !inquiry.email) {
    throw new Error('Please provide an email address for the preferred contact method.');
  }

  if (inquiry.preferredContact === 'phone' && !inquiry.phone) {
    throw new Error('Please provide a phone number for the preferred contact method.');
  }

  if (inquiry.preferredContact === 'either' && !inquiry.email && !inquiry.phone) {
    throw new Error('Please provide an email address or phone number.');
  }

  writeStoredInquiries([inquiry, ...readStoredInquiries()]);
  return inquiry;
}

export function deleteDemoInquiry(id) {
  const inquiries = readStoredInquiries();
  writeStoredInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
}

export function updateDemoInquiry(id, updates) {
  if (typeof id !== 'string' || updates === null || typeof updates !== 'object') {
    throw new Error('Invalid demo inquiry update.');
  }

  if (updates.status !== undefined && !inquiryStatuses.includes(updates.status)) {
    throw new Error('Choose a valid inquiry follow-up status.');
  }

  if (updates.comment !== undefined && typeof updates.comment !== 'string') {
    throw new Error('Inquiry comments must be text.');
  }

  if (updates.followUpDate !== undefined && typeof updates.followUpDate !== 'string') {
    throw new Error('Inquiry follow-up date must be text.');
  }

  const inquiries = readStoredInquiries();
  const inquiryIndex = inquiries.findIndex((inquiry) => inquiry.id === id);
  if (inquiryIndex === -1) {
    throw new Error('This demo inquiry no longer exists.');
  }

  const updatedInquiries = [...inquiries];
  updatedInquiries[inquiryIndex] = { ...updatedInquiries[inquiryIndex], ...updates };
  writeStoredInquiries(updatedInquiries);
}
