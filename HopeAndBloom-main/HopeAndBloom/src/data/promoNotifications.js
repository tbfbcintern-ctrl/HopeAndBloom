import { readStoredJson, writeStoredJson } from './storage.js';

const STORAGE_KEY = 'hope-and-bloom:demo-promo-notifications:v1';
export const PROMO_NOTIFICATIONS_UPDATED_EVENT = 'hope-and-bloom:promo-notifications-updated';

const PAYMENT_METHODS = new Set(['gcash', 'maya', 'card']);

function isPromoNotification(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.promoName === 'string'
    && typeof value.sessions === 'string'
    && typeof value.price === 'string'
    && PAYMENT_METHODS.has(value.paymentMethod)
    && typeof value.createdAt === 'string'
    && typeof value.isRead === 'boolean'
    && (value.parentGuardianName === undefined || typeof value.parentGuardianName === 'string');
}

function readStoredPromoNotifications() {
  const notifications = readStoredJson(
    STORAGE_KEY,
    'Saved demo promo alerts are unreadable. Clear this site’s local storage and try again.'
  );
  if (notifications === null) {
    return [];
  }

  if (!Array.isArray(notifications) || !notifications.every(isPromoNotification)) {
    throw new Error('Saved demo promo alerts have an invalid format. Clear this site’s local storage and try again.');
  }

  return notifications.map((notification) => ({
    ...notification,
    parentGuardianName: notification.parentGuardianName || 'Not recorded (older alert)'
  }));
}

export function getDemoPromoNotifications() {
  return readStoredPromoNotifications();
}

export function recordDemoPromoNotification(promo, paymentMethod, parentGuardianName) {
  if (
    !promo
    || typeof promo.name !== 'string'
    || typeof promo.sessions !== 'string'
    || typeof promo.price !== 'string'
    || !PAYMENT_METHODS.has(paymentMethod)
    || typeof parentGuardianName !== 'string'
    || !parentGuardianName.trim()
    || parentGuardianName.trim().length > 100
  ) {
    throw new Error('Enter a parent/guardian name of 1 to 100 characters and select a valid payment method.');
  }

  const notification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    promoName: promo.name,
    sessions: promo.sessions,
    price: promo.price,
    parentGuardianName: parentGuardianName.trim(),
    paymentMethod,
    createdAt: new Date().toISOString(),
    isRead: false
  };

  writeStoredJson(
    STORAGE_KEY,
    [notification, ...readStoredPromoNotifications()],
    PROMO_NOTIFICATIONS_UPDATED_EVENT
  );
  return notification;
}

export function markDemoPromoNotificationsRead() {
  const notifications = readStoredPromoNotifications();
  if (!notifications.some((notification) => !notification.isRead)) {
    return;
  }

  writeStoredJson(
    STORAGE_KEY,
    notifications.map((notification) => ({ ...notification, isRead: true })),
    PROMO_NOTIFICATIONS_UPDATED_EVENT
  );
}
