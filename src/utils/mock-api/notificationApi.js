import { API_BASE_URL } from '@/config/api';

/**
 * Returns the mock notifications URL based on role and language
 * @param {'buyer' | 'supplier'} role
 * @param {'ar' | 'en'} lang
 * @returns {string}
 */
export function getNotifications(role, lang = 'en') {
  // Both languages return English JSON for now
  lang = 'en';

  if (role === 'buyer') {
    return `${API_BASE_URL}/buyers/notifications.${lang}.json`;
  }

  if (role === 'supplier') {
    return `${API_BASE_URL}/suppliers/notifications.${lang}.json`;
  }

  // fallback empty array
  return [];
}
