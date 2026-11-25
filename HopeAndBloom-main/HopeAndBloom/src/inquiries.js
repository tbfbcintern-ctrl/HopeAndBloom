const STORAGE_KEY = 'hope-and-bloom:demo-inquiries:v1';
export const INQUIRIES_UPDATED_EVENT = 'hope-and-bloom:inquiries-updated';

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
    && (value.status === undefined || value.status === 'open' || value.status === 'done');
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
    status: inquiry.status || 'open'
  }));
}

function writeStoredInquiries(inquiries) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  window.dispatchEvent(new Event(INQUIRIES_UPDATED_EVENT));
}

export function getDemoInquiries() {
  return readStoredInquiries();
}

export function saveDemoInquiry({ name, email, age, message }) {
  const inquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: name.trim(),
    email: email.trim(),
    age: age.trim(),
    message: message.trim(),
    comment: '',
    status: 'open',
    createdAt: new Date().toISOString()
  };

  if (!inquiry.name || !inquiry.email || !inquiry.age) {
    throw new Error('Please provide a name, email address, and child age.');
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

  if (updates.status !== undefined && updates.status !== 'open' && updates.status !== 'done') {
    throw new Error('Inquiry status must be open or done.');
  }

  if (updates.comment !== undefined && typeof updates.comment !== 'string') {
    throw new Error('Inquiry comments must be text.');
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
