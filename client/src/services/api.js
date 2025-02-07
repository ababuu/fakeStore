import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // required for httpOnly cookie auth (Phase 3+)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
