import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { enableMock } from './mock';

const api = axios.create({ baseURL: '/api' });

let mockEnabled = false;
const forceMock = import.meta.env.VITE_MOCK === 'true';
if (forceMock) { enableMock(api); mockEnabled = true; }

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!mockEnabled && (!err.response || err.code === 'ERR_NETWORK')) {
      console.warn('[ADMIN AUTO-MOCK] 백엔드 연결 실패 - mock 모드로 전환');
      enableMock(api);
      mockEnabled = true;
      return api.request(err.config);
    }
    if (!mockEnabled && err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export default api;
