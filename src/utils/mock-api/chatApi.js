import { API_BASE_URL } from '@/config/api';

export function getChats() {
  return `${API_BASE_URL}/chats/me.json`;
}
