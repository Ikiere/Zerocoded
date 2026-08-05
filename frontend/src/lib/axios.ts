import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor — attach auth token if present
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('zc_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with an error status
      return Promise.reject(error);
    }
    if (error.request) {
      // No response received
      return Promise.reject(
        new Error('Unable to reach the server. Please check your connection.')
      );
    }
    return Promise.reject(error);
  }
);

export default api;
