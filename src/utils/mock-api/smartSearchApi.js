import axios from 'axios';
import { getSearchResults } from './searchApi';

/**
 * MOCK AI Smart Search
 * Supports:
 *  - { text }
 *  - { itemId }
 */
export async function mockSmartSearch({ text, itemId, lang }) {
  // 1. Load ALL products & services
  const [prodRes, servRes] = await Promise.all([
    axios.get(getSearchResults({ type: 'products', lang, isAll: true })),
    axios.get(getSearchResults({ type: 'services', lang, isAll: true })),
  ]);

  const products = prodRes.data || [];
  const services = servRes.data || [];
  const allItems = [...products, ...services];

  // 2. Resolve reference text
  let referenceText = text?.toLowerCase() ?? '';

  if (itemId) {
    const refItem = allItems.find(
      (i) => i.productId === itemId || i.serviceId === itemId,
    );

    if (!refItem) return [];

    referenceText = `${refItem.name} ${
      refItem.description ?? ''
    }`.toLowerCase();
  }

  // 3. Very simple similarity scoring (mock AI)
  const scored = allItems
    .filter((i) => i.productId !== itemId && i.serviceId !== itemId)
    .map((item) => {
      const haystack = `${item.name} ${item.description ?? ''}`.toLowerCase();

      let score = 0;
      referenceText.split(' ').forEach((word) => {
        if (word.length > 2 && haystack.includes(word)) {
          score += 1;
        }
      });

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  // 4. Shape EXACTLY like backend
  return scored.map((r, idx) => ({
    text: referenceText,
    item: r.item,
    rank: idx + 1,
  }));
}
