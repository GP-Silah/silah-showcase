import { API_BASE_URL } from '@/config/api';

export function getCart() {
  return `${API_BASE_URL}/buyers/cart.en.json`;
}

export function getCard() {
  return `${API_BASE_URL}/buyers/card.en.json`;
}
