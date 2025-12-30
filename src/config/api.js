const USE_MOCK_API = true;

export const API_BASE_URL = USE_MOCK_API
  ? '/silah-showcase/mock-api'
  : `${import.meta.env.VITE_BACKEND_URL}`;
