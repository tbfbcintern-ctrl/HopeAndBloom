export function readStoredJson(key, unreadableMessage) {
  const storedValue = window.localStorage.getItem(key);
  if (storedValue === null) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    throw new Error(unreadableMessage);
  }
}

export function writeStoredJson(key, value, updatedEvent) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(updatedEvent));
}
