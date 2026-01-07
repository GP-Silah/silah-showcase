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
