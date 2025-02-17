const STORAGE_KEYS = {
  SPELLS: "ttrpg-spells",
  ACTIONS: "ttrpg-actions",
  NOTES: "ttrpg-notes",
} as const;

export function saveToStorage<T>(key: keyof typeof STORAGE_KEYS, data: T) {
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
}

export function loadFromStorage<T>(key: keyof typeof STORAGE_KEYS): T | null {
  const data = localStorage.getItem(STORAGE_KEYS[key]);
  return data ? JSON.parse(data) : null;
}
