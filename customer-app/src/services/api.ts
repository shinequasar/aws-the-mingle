import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { enableMock } from './mock';

const api = axios.create({ baseURL: '/api' });

// 바이패스 토큰이거나 VITE_MOCK=true면 즉시 mock 활성화
const token = useAuthStore.getState().token;
const forceMock = import.meta.env.VITE_MOCK === 'true' || token === 'bypass-token';
let mockEnabled = false;

if (forceMock) {
  enableMock(api);
  mockEnabled = true;
}

// Auth 헤더 주입 (mock 모드가 아닐 때만 의미 있지만 항상 설정)
api.interceptors.request.use((config) => {
  const t = useAuthStore.getState().token;
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// 401 처리 + 자동 mock 전환
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 네트워크 에러 (백엔드 꺼짐) → mock 전환 후 재시도
    if (!mockEnabled && (!err.response || err.code === 'ERR_NETWORK')) {
      console.warn('[AUTO-MOCK] 백엔드 연결 실패 - mock 모드로 전환합니다');
      enableMock(api);
      mockEnabled = true;
      return api.request(err.config);
    }
    // mock 모드에서는 401 로그아웃 안 함
    if (!mockEnabled && err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

// 로그인 시 바이패스 토큰이면 mock 활성화
useAuthStore.subscribe((state) => {
  if (!mockEnabled && state.token === 'bypass-token') {
    enableMock(api);
    mockEnabled = true;
  }
});

export default api;
