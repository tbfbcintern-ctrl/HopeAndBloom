import { readStoredJson, writeStoredJson } from './storage.js';

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
    && (value.contactNumber === undefined || typeof value.contactNumber === 'string')
    && (value.childName === undefined || typeof value.childName === 'string')
    && (value.address === undefined || typeof value.address === 'string')
    && (value.relationship === undefined || typeof value.relationship === 'string')
    && (value.source === undefined || value.source === 'website' || value.source === 'walk-in')
    && (value.comment === undefined || typeof value.comment === 'string')
    && (value.status === undefined || value.status === 'open' || value.status === 'done');
}

function readStoredInquiries() {
  const inquiries = readStoredJson(
    STORAGE_KEY,
    'Saved demo inquiries are unreadable. Clear this site’s local storage and try again.'
  );
  if (inquiries === null) {
    return [];
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
  writeStoredJson(STORAGE_KEY, inquiries, INQUIRIES_UPDATED_EVENT);
}

export function getDemoInquiries() {
  return readStoredInquiries();
}

export function saveDemoInquiry({ name, email = '', contactNumber = '', childName = '', age = '', relationship = '', address = '', message = '', source = 'website' }) {
  const inquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: name.trim(),
    email: email.trim(),
    contactNumber: contactNumber.trim(),
    childName: childName.trim(),
    age: age.trim(),
    relationship: relationship.trim(),
    address: address.trim(),
    message: message.trim(),
    source: source === 'walk-in' ? 'walk-in' : 'website',
    comment: '',
    status: 'open',
    createdAt: new Date().toISOString()
  };

  if (!inquiry.name || !inquiry.contactNumber || !inquiry.age) {
    throw new Error('Please provide a name, contact number, and child age.');
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

  const editableFields = ['name', 'email', 'contactNumber', 'childName', 'age', 'relationship', 'address', 'message'];
  for (const field of editableFields) {
    if (updates[field] !== undefined && typeof updates[field] !== 'string') {
      throw new Error(`Inquiry ${field} must be text.`);
    }
  }

  if (updates.status !== undefined && updates.status !== 'open' && updates.status !== 'done') {
    throw new Error('Inquiry status must be open or done.');
  }

  if (updates.comment !== undefined && typeof updates.comment !== 'string') {
    throw new Error('Inquiry comments must be text.');
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'name') && !updates.name.trim()) {
    throw new Error('Please provide a parent or guardian name.');
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'contactNumber') && !updates.contactNumber.trim()) {
    throw new Error('Please provide a contact number.');
  }
  if (Object.prototype.hasOwnProperty.call(updates, 'age') && !updates.age.trim()) {
    throw new Error('Please provide the child age.');
  }

  const inquiries = readStoredInquiries();
  const inquiryIndex = inquiries.findIndex((inquiry) => inquiry.id === id);
  if (inquiryIndex === -1) {
    throw new Error('This demo inquiry no longer exists.');
  }

  const updatedInquiries = [...inquiries];
  const normalizedUpdates = Object.fromEntries(
    Object.entries(updates).map(([field, value]) => [
      field,
      editableFields.includes(field) ? value.trim() : value
    ])
  );
  updatedInquiries[inquiryIndex] = { ...updatedInquiries[inquiryIndex], ...normalizedUpdates };
  writeStoredInquiries(updatedInquiries);
}
