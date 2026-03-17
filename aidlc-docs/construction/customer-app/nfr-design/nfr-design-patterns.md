# NFR Design Patterns - Customer App

## 1. API Layer Pattern

### Axios Instance + Interceptor
- baseURL: 환경변수 (VITE_API_URL)
- Request interceptor: localStorage에서 JWT 읽어 Authorization 헤더 자동 첨부
- Response interceptor: 401 → authStore.logout() → /login 리다이렉트

## 2. WebSocket Pattern

### STOMP Client Manager
- 로그인 성공 시 연결, 로그아웃 시 해제
- /topic/room/{roomId}/notifications 구독
- 연결 끊김 시 3초 간격 자동 재연결
- 수신 메시지 → notificationStore에 추가 → NotificationToast 렌더링

## 3. State Management Pattern

### Zustand Stores
- **authStore**: token, storeId, roomId — localStorage persist
- **cartStore**: items[] — localStorage persist
- **notificationStore**: notifications[] — memory only

## 4. Route Guard Pattern
- ProtectedRoute 컴포넌트: authStore.token 없으면 /login 리다이렉트
- LoginPage: token 있으면 / 리다이렉트

## 5. Error Handling Pattern
- API 에러 → react-hot-toast로 에러 메시지 표시
- 네트워크 에러 → "서버 연결 실패" 토스트
- 폼 검증 에러 → 인라인 에러 메시지
