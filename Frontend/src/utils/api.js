import axios from 'axios';

const api = axios.create({
  // In production: VITE_API_URL should be full backend URL with /api prefix
  // Example: https://gigflowbackend-saxu.onrender.com/api
  // In development: Uses proxy to /api
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true
});

export default api;
