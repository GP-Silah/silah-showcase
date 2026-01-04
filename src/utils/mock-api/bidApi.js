import { API_BASE_URL } from '@/config/api';

export function getMyBids() {
  return `${API_BASE_URL}/bids/me.en.json`;
}
