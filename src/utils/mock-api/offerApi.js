import { API_BASE_URL } from '@/config/api';

export function getRecievedOffers() {
  return `${API_BASE_URL}/offers/recieved.en.json`;
}
