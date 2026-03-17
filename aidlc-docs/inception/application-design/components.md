# Components

## Backend Components (Spring Boot)

### Controller Layer
| Component | Responsibility |
|-----------|---------------|
| AuthController | 매장 인증, 룸 태블릿 로그인 |
| MenuController | 메뉴 CRUD, 카테고리별 조회 |
| OrderController | 주문 생성, 조회, 삭제, 상태 변경 |
| RoomController | 룸 초기설정, 이용완료, 과거내역 |
| StoreController | 매장 등록/관리 |
| SocialController | 음료보내기, 메시지, 사진 전송, 신고 |
| MergeController | 합석 요청/수락/거절, 시간 연장 |
| CallController | 직원 호출 요청/관리 |
| GameController | 미니게임 데이터 조회 |
| SseController | SSE 연결 관리 (주문, 호출 알림) |
| WebSocketController | WebSocket 메시지 핸들링 (채팅, 합석, 소셜) |

### Service Layer
| Component | Responsibility |
|-----------|---------------|
| AuthService | JWT 발급/검증, 비밀번호 해싱, 로그인 시도 제한 |
| MenuService | 메뉴 비즈니스 로직, 이미지 업로드 처리 |
| OrderService | 주문 생성/삭제, 상태 변경, 금액 계산 |
| RoomService | 룸 세션 관리, 이용완료 처리, 시간 관리 |
| StoreService | 매장 CRUD 비즈니스 로직 |
| SocialService | 음료보내기, 메시지/사진 전송, 신고 처리 |
| MergeService | 합석 요청/수락/거절, 연장 규칙 적용 |
| CallService | 직원 호출 생성/처리 |
| GameService | 미니게임 데이터 제공 (질문, 주제, 밸런스) |
| NotificationService | SSE/WebSocket 이벤트 발행 |
| FileService | 이미지/사진 파일 저장 관리 |

### Repository Layer
| Component | Responsibility |
|-----------|---------------|
| StoreRepository | 매장 데이터 접근 |
| AdminRepository | 관리자 계정 데이터 접근 |
| MenuRepository | 메뉴 데이터 접근 |
| CategoryRepository | 카테고리 데이터 접근 |
| OrderRepository | 주문 데이터 접근 |
| OrderItemRepository | 주문 항목 데이터 접근 |
| OrderHistoryRepository | 과거 주문 이력 접근 |
| RoomRepository | 룸 데이터 접근 |
| RoomSessionRepository | 룸 세션 데이터 접근 |
| MessageRepository | 메시지 데이터 접근 |
| PhotoRepository | 사진 데이터 접근 |
| MergeRequestRepository | 합석 요청 데이터 접근 |
| CallRequestRepository | 직원 호출 데이터 접근 |
| ReportRepository | 신고 데이터 접근 |
| GameDataRepository | 미니게임 데이터 접근 |

## Frontend Components - Customer App (React)

| Component | Responsibility |
|-----------|---------------|
| LoginPage | 룸 초기 설정/자동 로그인 |
| MenuPage | 메뉴 조회 (사이드바 + 카드 그리드) |
| CartDrawer | 장바구니 관리 |
| OrderPage | 주문 확정/내역 조회 |
| SocialPage | 룸 간 소통 (메시지/사진/음료보내기) |
| MergePage | 합석 요청/수락/거절 |
| GamePage | 미니게임 (아이스브레이킹/룰렛/밸런스) |
| CallButton | 직원 호출 |
| TimerWidget | 이용 시간 카운트다운 |
| NotificationToast | 실시간 알림 표시 |

## Frontend Components - Admin App (React)

| Component | Responsibility |
|-----------|---------------|
| LoginPage | 관리자 로그인 |
| DashboardPage | 실시간 주문 모니터링 (룸별 그리드) |
| RoomManagePage | 룸 관리 (설정/이용완료/과거내역) |
| MenuManagePage | 메뉴 CRUD |
| StoreManagePage | 매장 관리 |
| CallManagePage | 직원 호출 관리 |
| ReportManagePage | 신고 관리 |
