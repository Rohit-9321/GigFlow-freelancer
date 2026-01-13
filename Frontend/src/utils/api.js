import axios from 'axios';

// Ensure baseURL always includes /api prefix
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_URL;
  
  // If VITE_API_URL is set, use it (should include /api)
  if (envURL) {
    // If it doesn't end with /api, add it
    return envURL.endsWith('/api') ? envURL : `${envURL}/api`;
  }
  
  // Development: use proxy
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});

export default api;
