# Component Methods

## AuthController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| POST /api/auth/admin/login | storeCode, username, password | JWT token | 관리자 로그인 |
| POST /api/auth/room/login | storeCode, roomNumber, password | JWT token | 룸 태블릿 로그인 |

## MenuController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| GET /api/stores/{storeId}/menus | storeId, categoryId? | Menu[] | 메뉴 목록 조회 |
| GET /api/stores/{storeId}/categories | storeId | Category[] | 카테고리 목록 조회 |
| POST /api/admin/menus | MenuCreateDto + image file | Menu | 메뉴 등록 |
| PUT /api/admin/menus/{menuId} | MenuUpdateDto + image file? | Menu | 메뉴 수정 |
| DELETE /api/admin/menus/{menuId} | menuId | void | 메뉴 삭제 |
| PUT /api/admin/menus/order | menuId[], displayOrder[] | void | 메뉴 순서 변경 |

## OrderController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| POST /api/rooms/{roomId}/orders | OrderCreateDto | Order | 주문 생성 |
| GET /api/rooms/{roomId}/orders | roomId, sessionId | Order[] | 현재 세션 주문 조회 |
| PUT /api/admin/orders/{orderId}/status | orderId, status | Order | 주문 상태 변경 |
| DELETE /api/admin/orders/{orderId} | orderId | void | 주문 삭제 |

## RoomController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| POST /api/admin/rooms | RoomCreateDto | Room | 룸 초기 설정 |
| GET /api/admin/rooms | storeId | Room[] | 룸 목록 조회 |
| POST /api/admin/rooms/{roomId}/complete | roomId | void | 이용 완료 처리 |
| GET /api/admin/rooms/{roomId}/history | roomId, dateFrom?, dateTo? | OrderHistory[] | 과거 내역 조회 |
| GET /api/rooms/{roomId}/time | roomId | TimeInfo | 남은 이용 시간 조회 |

## StoreController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| POST /api/admin/stores | StoreCreateDto | Store | 매장 등록 |
| PUT /api/admin/stores/{storeId} | StoreUpdateDto | Store | 매장 수정 |
| DELETE /api/admin/stores/{storeId} | storeId | void | 매장 삭제 |
| GET /api/admin/stores | - | Store[] | 매장 목록 조회 |

## SocialController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| POST /api/rooms/{roomId}/send-menu | targetRoomId, menuItems[] | SendRequest | 음료/안주 보내기 |
| PUT /api/rooms/{roomId}/send-menu/{requestId}/respond | accept/reject | void | 수락/거절 |
| POST /api/rooms/{roomId}/messages | targetRoomId, content | Message | 메시지 보내기 |
| POST /api/rooms/{roomId}/photos | targetRoomId, photo file | Photo | 사진 보내기 |
| POST /api/rooms/{roomId}/reports | targetType, targetId, reason | Report | 신고 |

## MergeController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| POST /api/rooms/{roomId}/merge-request | targetRoomId | MergeRequest | 합석 요청 |
| PUT /api/rooms/{roomId}/merge-request/{requestId}/respond | accept/reject | void | 합석 수락/거절 |
| POST /api/rooms/{roomId}/merge/extend | - | void | 합석 시간 연장 (술 1병 주문 필수) |

## CallController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| POST /api/rooms/{roomId}/calls | reason | CallRequest | 직원 호출 |
| GET /api/admin/calls | storeId | CallRequest[] | 호출 목록 조회 |
| PUT /api/admin/calls/{callId}/complete | callId | void | 호출 처리 완료 |

## GameController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| GET /api/games/icebreaker | category? | Question | 아이스브레이킹 질문 |
| GET /api/games/balance | - | BalanceQuestion | 밸런스 게임 질문 |
| GET /api/games/truth-or-lie | - | TruthQuestion | 진실/거짓 주제 |
| GET /api/games/roulette | playerCount | RouletteResult | 룰렛 결과 |
| GET /api/games/ladder | playerCount | LadderResult | 사다리타기 결과 |
| GET /api/games/topic | category? | Topic | 대화 주제 랜덤 생성 |

## SseController
| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| GET /api/admin/sse/orders | storeId | SseEmitter | 관리자 주문 SSE 스트림 |
| GET /api/admin/sse/calls | storeId | SseEmitter | 관리자 호출 SSE 스트림 |

## WebSocketController
| Endpoint | Direction | Purpose |
|----------|-----------|---------|
| /ws/room/{roomId} | bidirectional | 룸별 WebSocket 연결 |
| /topic/room/{roomId}/notifications | server→client | 음료보내기/합석/메시지 알림 |
| /topic/room/{roomId}/merge-game | server→client | 합석 미니게임 동기화 |
