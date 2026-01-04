import { API_BASE_URL } from '@/config/api';

export function getCart() {
  return `${API_BASE_URL}/buyers/cart.en.json`;
}

export function getCard() {
  return `${API_BASE_URL}/buyers/card.en.json`;
}

export function getOrders() {
  return `${API_BASE_URL}/buyers/orders.en.json`;
}

export function getInvoices() {
  return `${API_BASE_URL}/buyers/invoices-all.en.json`;
}

export function getPreferences() {
  return `${API_BASE_URL}/buyers/preferences.json`;
}
