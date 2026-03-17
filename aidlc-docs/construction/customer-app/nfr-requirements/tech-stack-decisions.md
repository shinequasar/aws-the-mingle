# Tech Stack Decisions - Customer App

## Core Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI 프레임워크 |
| TypeScript | 타입 안전성 |
| Vite | 빌드 도구 (빠른 HMR) |
| Tailwind CSS | 스타일링 |
| React Router v6 | 클라이언트 라우팅 |

## Dependencies

| Library | Purpose |
|---------|---------|
| axios | HTTP 클라이언트 (인터셉터로 JWT 자동 첨부) |
| @stomp/stompjs + sockjs-client | WebSocket/STOMP 클라이언트 |
| zustand | 경량 상태 관리 (auth, cart, notification) |
| react-hot-toast | 토스트 알림 |
