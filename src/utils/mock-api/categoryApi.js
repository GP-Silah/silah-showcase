import { API_BASE_URL } from '@/config/api';

export function getCategories({ main = false, lang = 'en' }) {
  if (main) {
    return `${API_BASE_URL}/categories/main.${lang}.json`;
  }

  return `${API_BASE_URL}/categories/all.${lang}.json`;
}
