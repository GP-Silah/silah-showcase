import { API_BASE_URL } from '@/config/api';

export function getUser() {
  return `${API_BASE_URL}/users/me.json`;
}
