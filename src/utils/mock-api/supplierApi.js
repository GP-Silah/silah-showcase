import { API_BASE_URL } from '@/config/api';

export function getFavoriteCategories() {
  return `${API_BASE_URL}/suppliers/favorite-categories.json`;
}
