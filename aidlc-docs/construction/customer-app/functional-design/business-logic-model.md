# Business Logic Model - Customer App

## API 연동 매핑

### 인증
| Component | API | Method |
|-----------|-----|--------|
| LoginPage | /api/auth/room/login | POST |

### 메뉴/주문
| Component | API | Method |
|-----------|-----|--------|
| MenuPage | /api/stores/{storeId}/categories | GET |
| MenuPage | /api/stores/{storeId}/menus | GET |
| CartDrawer | /api/rooms/{roomId}/orders | POST |
| OrderPage | /api/rooms/{roomId}/orders | GET |

### 소셜
| Component | API | Method |
|-----------|-----|--------|
| SendMenuForm | /api/rooms/{roomId}/send-menu | POST |
| SendMenuForm | /api/rooms/{roomId}/send-menu/{id}/respond | PUT |
| MessageForm | /api/rooms/{roomId}/messages | POST |
| PhotoForm | /api/rooms/{roomId}/photos | POST |

### 합석
| Component | API | Method |
|-----------|-----|--------|
| MergePage | /api/rooms/{roomId}/merge-request | POST |
| MergePage | /api/rooms/{roomId}/merge-request/{id}/respond | PUT |
| MergePage | /api/rooms/{roomId}/merge/extend | POST |

### 게임
| Component | API | Method |
|-----------|-----|--------|
| GamePage | /api/games/icebreaker | GET |
| GamePage | /api/games/balance | GET |
| GamePage | /api/games/truth-or-lie | GET |
| GamePage | /api/games/topic | GET |
| GamePage | /api/games/roulette | GET |
| GamePage | /api/games/ladder | GET |

### 유틸리티
| Component | API | Method |
|-----------|-----|--------|
| CallButton | /api/rooms/{roomId}/calls | POST |
| TimerWidget | /api/rooms/{roomId}/time | GET |

## WebSocket 구독

| Topic | 수신 이벤트 |
|-------|-----------|
| /topic/room/{roomId}/notifications | SEND_MENU_REQUEST, SEND_MENU_ACCEPTED, SEND_MENU_REJECTED, MESSAGE_RECEIVED, PHOTO_RECEIVED, MERGE_REQUEST, MERGE_ACCEPTED, MERGE_REJECTED, REPORT_RECEIVED |
