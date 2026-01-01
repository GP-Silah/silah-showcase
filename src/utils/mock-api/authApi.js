import { API_BASE_URL } from '@/config/api';

export async function fetchMe() {
  const res = await fetch(`${API_BASE_URL}/users/me.json`);
  if (!res.ok) throw new Error('Mock /users/me failed');
  return await res.json();
}

export async function fetchSupplierMe() {
  const res = await fetch(`${API_BASE_URL}/suppliers/me.json`);
  if (!res.ok) throw new Error('Mock /suppliers/me failed');
  return await res.json();
}
