import { API_BASE_URL } from '@/config/api';

/**
 * Search
 * @param {Object} params
 * @param {'products' | 'services' | 'suppliers'} params.type
 * @param {number} params.categoryId
 * @param {'ar' | 'en'} params.lang
 * @param {boolean} params.isAll
 */
export function getSearchResults({
  type,
  categoryId,
  lang = 'en',
  isAll = false,
}) {
  // MOCK
  if (API_BASE_URL) {
    if (isAll) {
      return `${API_BASE_URL}/search/${type}/all.en.json`;
    }
    // return `${API_BASE_URL}/search/${type}/category-${categoryId}.${lang}.json`;
    return `${API_BASE_URL}/search/${type}/category-${categoryId}.en.json`;
    // since I won't personally do the .ar.json files I will let both lang options respone in en..
    // because the ar DeepL translation from the Backend is broken itself, Backend calls DeepL on every single string which gave too many requests error
    // so not all strings gets translated, we should change how we translate in the backend first then do the mock api
  }

  return [];
}
