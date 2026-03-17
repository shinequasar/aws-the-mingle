# Frontend Components - Admin App

## 라우팅 구조

| Path | Component | Description | Auth |
|------|-----------|-------------|------|
| `/login` | LoginPage | 관리자 로그인 | No |
| `/` | DashboardPage | 실시간 주문 모니터링 (기본) | Yes |
| `/rooms` | RoomManagePage | 룸 관리 | Yes |
| `/menus` | MenuManagePage | 메뉴 관리 | Yes |
| `/stores` | StoreManagePage | 매장 관리 | Yes |
| `/calls` | CallManagePage | 직원 호출 관리 | Yes |
| `/reports` | ReportManagePage | 신고 관리 | Yes |

## 공통 레이아웃

### AdminLayout
- 좌측: Sidebar (네비게이션 메뉴)
- 상단: Header (매장명 + 로그아웃)
- 메인: 콘텐츠 영역

## 컴포넌트 상세

### LoginPage
- **State**: storeCode, username, password, error
- **API**: POST /api/auth/admin/login → JWT 저장

### DashboardPage (US-20)
- **State**: rooms[] (각 룸별 주문 요약)
- **SSE**: GET /api/admin/sse/orders → 실시간 주문 업데이트
- **Children**: RoomOrderCard (룸별 카드)
- **UI**: 룸별 카드 그리드 — 총 주문액, 최신 주문, 남은 시간, 주문 상태 변경 버튼

### RoomOrderCard
- **Props**: room, orders[], onStatusChange
- **UI**: 룸번호, 총 주문액, 주문 목록, 상태 뱃지 (대기중→준비중→완료)

### RoomManagePage (US-21, US-22)
- **State**: rooms[], selectedRoom, history[]
- **API**: GET/POST /api/admin/rooms, POST .../complete, DELETE /api/admin/orders/{id}, GET .../history
- **UI**: 룸 목록 테이블, 룸 추가 폼, 이용완료 버튼, 주문 삭제, 과거 내역 조회 (날짜 필터)

### MenuManagePage (US-23)
- **State**: menus[], categories[], editingMenu
- **API**: CRUD /api/admin/menus, GET /api/stores/{storeId}/categories
- **UI**: 메뉴 테이블 + 추가/수정 모달 (이미지 업로드 포함)

### StoreManagePage (US-24)
- **State**: stores[], editingStore
- **API**: CRUD /api/admin/stores
- **UI**: 매장 테이블 + 추가/수정 모달

### CallManagePage (US-25)
- **State**: calls[]
- **SSE**: GET /api/admin/sse/calls → 실시간 호출 알림
- **API**: GET /api/admin/calls, PUT .../complete
- **UI**: 호출 목록 (룸번호, 사유, 시각, 처리 버튼)

### ReportManagePage (US-26)
- **State**: reports[]
- **API**: GET /api/admin/reports, PUT .../resolve
- **UI**: 신고 목록 (발신룸, 수신룸, 타입, 사유, 처리 버튼)

## 상태 관리

| Store | Data | Persistence |
|-------|------|-------------|
| authStore | token, storeId, storeName, username | localStorage |
