const USE_MOCK_API = true;

export const API_BASE_URL = USE_MOCK_API
  ? `${import.meta.env.VITE_MOCK_API_URL}`
  : `${import.meta.env.VITE_BACKEND_URL}`;
