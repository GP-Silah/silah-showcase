import { API_BASE_URL } from '@/config/api';

export function getWishlist() {
  return `${API_BASE_URL}/buyers/wishlist.en.json`;
}
