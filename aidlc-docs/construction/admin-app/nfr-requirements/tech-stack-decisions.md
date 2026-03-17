# Tech Stack Decisions - Admin App

## Core Stack (Customer App과 동일)

| Technology | Purpose |
|-----------|---------|
| React 18 + TypeScript | UI |
| Vite | 빌드 |
| Tailwind CSS | 스타일링 |
| React Router v6 | 라우팅 |
| axios | HTTP (JWT 인터셉터) |
| zustand | 상태 관리 |
| react-hot-toast | 토스트 알림 |

## 추가 의존성
없음. SSE는 브라우저 내장 EventSource API 사용.
