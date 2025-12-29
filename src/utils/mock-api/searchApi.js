import { API_BASE_URL } from '@/config/api';

/**
 * Fetch products or services by category
 * @param {Object} params
 * @param {'products' | 'services'} params.type
 * @param {number|string} params.categoryId
 * @param {string} params.lang
 */
export function getSearchResults({ type, categoryId, lang = 'en' }) {
  // MOCK
  if (API_BASE_URL) {
    // return `${API_BASE_URL}/search/${type}/category-${categoryId}.${lang}.json`;
    return `${API_BASE_URL}/search/${type}/category-${categoryId}.en.json`;
    // since I won't personally do the .ar.json files I will let both lang options respone in en..
    // because the ar DeepL translation from the Backend is broken itself, Backend calls DeepL on every single string which gave too many requests error
    // so not all strings gets translated, we should change how we translate in the backend first then do the mock api
  }

  return [];
}
