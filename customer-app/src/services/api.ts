import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { enableMock } from './mock';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export default api;

// VITE_MOCK=true 이거나 백엔드 연결 불가 시 mock 모드 활성화
const shouldMock = import.meta.env.VITE_MOCK === 'true';
let mockEnabled = false;

if (shouldMock) {
  enableMock(api);
  mockEnabled = true;
}

// 백엔드 연결 실패 시 자동 mock 전환 (첫 요청 실패 시)
if (!mockEnabled) {
  api.interceptors.response.use(undefined, (error) => {
    if (!mockEnabled && (!error.response || error.code === 'ERR_NETWORK')) {
      console.warn('[AUTO-MOCK] 백엔드 연결 실패 - mock 모드로 전환합니다');
      enableMock(api);
      mockEnabled = true;
      // 실패한 요청 재시도
      return api.request(error.config);
    }
    return Promise.reject(error);
  });
}
