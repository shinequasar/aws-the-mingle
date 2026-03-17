# Code Summary - Admin App

## 프로젝트 구조
```
admin-app/
  index.html, package.json, vite.config.ts, tsconfig.json
  tailwind.config.js, postcss.config.js, vitest.config.ts
  src/
    main.tsx, App.tsx, index.css
    types/index.ts
    services/api.ts
    stores/authStore.ts
    hooks/useSSE.ts
    components/AdminLayout.tsx
    pages/LoginPage.tsx, DashboardPage.tsx, RoomManagePage.tsx,
          MenuManagePage.tsx, StoreManagePage.tsx, CallManagePage.tsx, ReportManagePage.tsx
    test/setup.ts, authStore.test.ts
```

## 파일 목록 (20개)

| File | Description |
|------|-------------|
| package.json | 의존성 (React 18, Vite, Tailwind, zustand, axios) |
| vite.config.ts | 개발 서버 port 3001 + API 프록시 |
| types/index.ts | TypeScript 인터페이스 11개 |
| services/api.ts | Axios + JWT 인터셉터 |
| stores/authStore.ts | 관리자 인증 상태 |
| hooks/useSSE.ts | SSE 연결 커스텀 훅 (자동 재연결) |
| components/AdminLayout.tsx | 사이드바 + 메인 레이아웃 |
| pages/LoginPage.tsx | 관리자 로그인 (US-19) |
| pages/DashboardPage.tsx | 실시간 주문 모니터링 + SSE (US-20) |
| pages/RoomManagePage.tsx | 룸 관리 + 주문 삭제 + 과거 내역 (US-21, US-22) |
| pages/MenuManagePage.tsx | 메뉴 CRUD + 이미지 업로드 (US-23) |
| pages/StoreManagePage.tsx | 매장 CRUD (US-24) |
| pages/CallManagePage.tsx | 직원 호출 관리 + SSE (US-25) |
| pages/ReportManagePage.tsx | 신고 관리 (US-26) |

## 테스트 (1 파일, 2 테스트)
| File | Tests |
|------|-------|
| authStore.test.ts | 2 (로그인, 로그아웃) |

## Story Coverage
| Story | Component | Status |
|-------|-----------|--------|
| US-19 | LoginPage | ✅ |
| US-20 | DashboardPage | ✅ |
| US-21 | RoomManagePage | ✅ |
| US-22 | RoomManagePage | ✅ |
| US-23 | MenuManagePage | ✅ |
| US-24 | StoreManagePage | ✅ |
| US-25 | CallManagePage | ✅ |
| US-26 | ReportManagePage | ✅ |
