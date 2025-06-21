import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://medication-management-system-42fc.onrender.com/', // Update this to your deployed backend URL if needed
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

