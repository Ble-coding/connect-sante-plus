// Configuration de l'API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Clés de stockage
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'pharmafriconnect_access_token',
  REFRESH_TOKEN: 'pharmafriconnect_refresh_token',
  USER_SESSION: 'pharmafriconnect_user_session',
  REMEMBERED_EMAIL: 'pharmafriconnect_remembered_email',
} as const;








