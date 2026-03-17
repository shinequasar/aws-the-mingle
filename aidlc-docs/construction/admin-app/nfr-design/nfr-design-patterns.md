# NFR Design Patterns - Admin App

## Customer App 패턴 상속
- Axios Instance + JWT Interceptor
- Zustand authStore (localStorage persist)
- ProtectedRoute 가드
- Error Handling (react-hot-toast)

## Admin 고유 패턴

### SSE Connection Manager
- EventSource API 사용 (별도 라이브러리 불필요)
- 페이지 진입 시 연결, 이탈 시 해제 (useEffect cleanup)
- onerror 시 3초 후 자동 재연결
- 커스텀 훅: useSSE(url, onMessage)
