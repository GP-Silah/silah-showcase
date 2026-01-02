import { API_BASE_URL } from '@/config/api';

export function getItemReviews() {
  return `${API_BASE_URL}/reviews/items.en.json`;
}

export function getSupplierReviews() {
  return `${API_BASE_URL}/reviews/suppliers.en.json`;
}
