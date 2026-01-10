import { API_BASE_URL } from '@/config/api';

export function getFavoriteCategories() {
  return `${API_BASE_URL}/suppliers/favorite-categories.json`;
}

export function getSupplier() {
  return `${API_BASE_URL}/suppliers/me.json`;
}

export function getPendingOrdersCount() {
  return `${API_BASE_URL}/supplieres/pending-orders-count.json`;
}

export function getStockLevels() {
  return `${API_BASE_URL}/suppliers/stock-levels.json`;
}

export function getPlan() {
  return `${API_BASE_URL}/suppliers/plan.json`;
}

export function getProductListings() {
  return `${API_BASE_URL}/suppliers/listings-products.json`;
}

export function getServiceListings() {
  return `${API_BASE_URL}/suppliers/listings-services.json`;
}

export function getOrders() {
  return `${API_BASE_URL}/suppliers/orders.json`;
}

export function getInvoices() {
  return `${API_BASE_URL}/suppliers/invoices-all.json`;
}

export function getPreferences() {
  return `${API_BASE_URL}/suppliers/preferences.json`;
}
