import { API_BASE_URL } from '@/config/api';

export function getCategories({
  main = false,
  lang = 'en',
  sub = false,
  type = 'null',
}) {
  if (main) {
    return `${API_BASE_URL}/categories/main.${lang}.json`;
  }
  if (sub) {
    return `${API_BASE_URL}/categories/sub-${type}.${lang}.json`;
  }
  return `${API_BASE_URL}/categories/all.${lang}.json`;
}
