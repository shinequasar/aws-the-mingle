# Frontend Components - Customer App

## 라우팅 구조

| Path | Component | Description | Auth |
|------|-----------|-------------|------|
| `/login` | LoginPage | 룸 초기 설정 (매장코드, 룸번호, 비밀번호) | No |
| `/` | MenuPage | 메뉴 조회 (기본 화면) | Yes |
| `/orders` | OrderPage | 주문 내역 조회 | Yes |
| `/social` | SocialPage | 룸 간 소통 (메시지/사진/음료보내기) | Yes |
| `/merge` | MergePage | 합석 요청/관리 | Yes |
| `/games` | GamePage | 미니게임 | Yes |

## 공통 레이아웃

### AppLayout
- 상단: 매장명 + 룸번호 + TimerWidget
- 하단: BottomNav (메뉴, 주문내역, 소셜, 합석, 게임)
- 우측 하단 플로팅: CallButton
- 오버레이: NotificationToast, CartDrawer

## 컴포넌트 상세

### LoginPage
- **State**: storeCode, roomNumber, password, error
- **Action**: POST /api/auth/room/login → JWT 저장 (localStorage)
- **Flow**: 성공 → `/` 리다이렉트, 실패 → 에러 표시

### MenuPage
- **State**: categories[], selectedCategoryId, menus[], selectedMenu
- **Children**: CategorySidebar, MenuGrid, MenuDetailModal
- **API**: GET /api/stores/{storeId}/categories, GET /api/stores/{storeId}/menus?categoryId=
- **Action**: 메뉴 클릭 → 상세 모달, "담기" → CartDrawer에 추가

### CategorySidebar
- **Props**: categories[], selectedId, onSelect(id)
- **UI**: 좌측 세로 고정, 카테고리명 리스트

### MenuGrid
- **Props**: menus[], onMenuClick(menu), onAddToCart(menu)
- **UI**: 2열 카드 그리드 (이미지, 메뉴명, 가격)

### MenuDetailModal
- **Props**: menu, isOpen, onClose, onAddToCart
- **UI**: 메뉴 이미지, 설명, 가격, 수량 선택, 담기 버튼

### CartDrawer
- **State**: cartItems[] (localStorage 동기화)
- **Props**: isOpen, onClose
- **Actions**: 수량 증감, 삭제, 비우기, 주문하기
- **API**: POST /api/rooms/{roomId}/orders
- **Flow**: 주문 성공 → 주문번호 표시 → 5초 후 메뉴 화면 → 장바구니 비우기

### OrderPage
- **State**: orders[]
- **API**: GET /api/rooms/{roomId}/orders
- **UI**: 주문별 카드 (번호, 시각, 메뉴/수량, 금액, 상태 뱃지)

### SocialPage
- **Tabs**: 음료보내기, 메시지, 사진
- **Children**: SendMenuForm, MessageForm, PhotoForm

### SendMenuForm
- **State**: targetRoomId, selectedMenus[], step (메뉴선택/확인)
- **API**: POST /api/rooms/{roomId}/send-menu

### MessageForm
- **State**: targetRoomId, content
- **API**: POST /api/rooms/{roomId}/messages

### PhotoForm
- **State**: targetRoomId, photoFile (카메라 캡처)
- **API**: POST /api/rooms/{roomId}/photos

### MergePage
- **State**: targetRoomId, mergeRequests[], activeMerge
- **API**: POST /api/rooms/{roomId}/merge-request, PUT .../respond
- **UI**: 합석 요청 폼 + 수신된 요청 목록 + 활성 합석 상태

### GamePage (합석 성공 시 이스터에그 노출)
- **State**: selectedGame, gameData
- **Children**: IcebreakerGame, BalanceGame, TruthOrLieGame, RouletteGame, LadderGame, TopicGame
- **API**: GET /api/games/{type}

### TimerWidget
- **State**: expiresAt, remainingMinutes
- **API**: GET /api/rooms/{roomId}/time
- **UI**: 남은 시간 카운트다운 (MM:SS), 30분 이하 시 빨간색

### CallButton
- **State**: isOpen (사유 선택 모달), callReasons[]
- **API**: POST /api/rooms/{roomId}/calls
- **UI**: 플로팅 버튼 → 사유 선택 모달

### NotificationToast
- **Source**: WebSocket /topic/room/{roomId}/notifications
- **Types**: 음료수신, 메시지수신, 사진수신, 합석요청, 합석결과, 시간연장알림
- **UI**: 상단 토스트 (3초 자동 닫힘), 액션 버튼 (수락/거절)

## 상태 관리

| Store | Data | Persistence |
|-------|------|-------------|
| authStore | token, storeId, roomId, roomNumber | localStorage |
| cartStore | cartItems[] | localStorage |
| notificationStore | notifications[] | memory |
