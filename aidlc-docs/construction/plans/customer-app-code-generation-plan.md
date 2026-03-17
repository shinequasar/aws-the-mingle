# Code Generation Plan - Customer App

## Unit Context
- **Stories**: US-01~18 (고객용 전체 UI)
- **Dependencies**: Unit 1 (Core Order API), Unit 2 (Social API), Unit 3 (Game API)
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, zustand, axios, @stomp/stompjs

## Steps
- [x] Step 1: 프로젝트 초기화 (Vite + React + TS + Tailwind 설정, package.json)
- [x] Step 2: 공통 인프라 (types, api.ts, ws.ts, stores 3개)
- [x] Step 3: App.tsx + 라우팅 + ProtectedRoute + AppLayout
- [x] Step 4: LoginPage (US-01)
- [x] Step 5: MenuPage + CategorySidebar + MenuGrid + MenuDetailModal (US-02)
- [x] Step 6: CartDrawer (US-03, US-04)
- [x] Step 7: OrderPage (US-05)
- [x] Step 8: SocialPage + SendMenuForm + MessageForm + PhotoForm (US-06~08, US-11)
- [x] Step 9: MergePage (US-09, US-10)
- [x] Step 10: GamePage + 게임 컴포넌트들 (US-12~16)
- [x] Step 11: TimerWidget + CallButton + NotificationToast (US-17, US-18)
- [x] Step 12: 단위 테스트 (stores 3개, 14 tests)
- [x] Step 13: Code Summary 문서
