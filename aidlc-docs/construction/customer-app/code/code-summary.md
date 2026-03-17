# Code Summary - Customer App

## 프로젝트 구조
```
customer-app/
  index.html, package.json, vite.config.ts, tsconfig.json
  tailwind.config.js, postcss.config.js, vitest.config.ts
  src/
    main.tsx, App.tsx, index.css
    types/index.ts
    services/api.ts, ws.ts
    stores/authStore.ts, cartStore.ts, notificationStore.ts
    components/AppLayout.tsx, CartDrawer.tsx, TimerWidget.tsx, CallButton.tsx, NotificationToast.tsx
    pages/LoginPage.tsx, MenuPage.tsx, OrderPage.tsx, SocialPage.tsx, MergePage.tsx, GamePage.tsx
    test/setup.ts, cartStore.test.ts, authStore.test.ts, notificationStore.test.ts
```

## 파일 목록 (24개)

| File | Description |
|------|-------------|
| package.json | 의존성 (React 18, Vite, Tailwind, zustand, axios, STOMP) |
| vite.config.ts | 개발 서버 + API 프록시 |
| types/index.ts | TypeScript 인터페이스 11개 |
| services/api.ts | Axios 인스턴스 + JWT 인터셉터 |
| services/ws.ts | STOMP WebSocket 클라이언트 (자동 재연결) |
| stores/authStore.ts | 인증 상태 (localStorage persist) |
| stores/cartStore.ts | 장바구니 상태 (localStorage persist) |
| stores/notificationStore.ts | 알림 상태 (memory) |
| App.tsx | 라우팅 + ProtectedRoute |
| components/AppLayout.tsx | 공통 레이아웃 (헤더, 하단 네비, 플로팅 버튼) |
| pages/LoginPage.tsx | 룸 로그인 (US-01) |
| pages/MenuPage.tsx | 메뉴 조회 + 카테고리 사이드바 + 상세 모달 (US-02) |
| components/CartDrawer.tsx | 장바구니 + 주문 (US-03, US-04) |
| pages/OrderPage.tsx | 주문 내역 (US-05) |
| pages/SocialPage.tsx | 음료보내기/메시지/사진 (US-06~08, US-11) |
| pages/MergePage.tsx | 합석 요청 (US-09, US-10) |
| pages/GamePage.tsx | 미니게임 6종 (US-12~16) |
| components/TimerWidget.tsx | 이용 시간 카운트다운 (US-18) |
| components/CallButton.tsx | 직원 호출 (US-17) |
| components/NotificationToast.tsx | WebSocket 알림 처리 |

## 테스트 (3 파일, 14 테스트)

| File | Tests |
|------|-------|
| cartStore.test.ts | 8 (추가, 중복, 삭제, 수량변경, 0이하삭제, 99제한, 합계, 비우기) |
| authStore.test.ts | 2 (로그인, 로그아웃) |
| notificationStore.test.ts | 3 (추가, 인덱스삭제, 전체삭제) |

## Story Coverage

| Story | Component | Status |
|-------|-----------|--------|
| US-01 | LoginPage | ✅ |
| US-02 | MenuPage | ✅ |
| US-03 | CartDrawer | ✅ |
| US-04 | CartDrawer | ✅ |
| US-05 | OrderPage | ✅ |
| US-06 | SocialPage (SendMenu) | ✅ |
| US-07 | SocialPage (Message) | ✅ |
| US-08 | SocialPage (Photo) | ✅ |
| US-09 | MergePage | ✅ |
| US-10 | MergePage + NotificationToast | ✅ |
| US-11 | SocialPage (Report via NotificationToast) | ✅ |
| US-12~16 | GamePage | ✅ |
| US-17 | CallButton | ✅ |
| US-18 | TimerWidget | ✅ |
