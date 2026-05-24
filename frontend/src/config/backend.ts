// Backend configuration
const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:5001/api" : "https://nirvaha-5cqj.onrender.com/api");

export const BACKEND_CONFIG = {
  API_URL,
  SOCKET_URL: API_URL.replace("/api", ""),

  get API_BASE_URL() {
    return API_URL;
  },

  get SOCKET_BASE_URL() {
    return API_URL.replace("/api", "");
  },
};

export default BACKEND_CONFIG;
