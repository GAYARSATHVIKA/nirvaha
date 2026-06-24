const BACKEND_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
  SOCKET_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'
};

export default BACKEND_CONFIG;
