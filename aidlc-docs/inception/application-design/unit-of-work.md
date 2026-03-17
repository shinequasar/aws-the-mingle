# Unit of Work

## Decomposition Strategy
레이어별(백엔드/프론트엔드) 분리 후, 각 레이어 내에서 기능 도메인별 유닛으로 분해.

## Unit Definitions

### Unit 1: Backend - Core Order (백엔드 핵심 주문)
- **Scope**: 인증, 매장, 룸, 메뉴, 장바구니, 주문, 직원 호출, 이용 시간
- **Stories**: US-01~05, US-17~18, US-19~25
- **Components**: AuthController/Service, MenuController/Service, OrderController/Service, RoomController/Service, StoreController/Service, CallController/Service, SseController, NotificationService, FileService
- **Priority**: 1st (기반 인프라 + 핵심 기능)

### Unit 2: Backend - Social & Hunting (백엔드 소셜/헌팅)
- **Scope**: 룸 간 음료보내기, 메시지, 사진, 합석, 신고
- **Stories**: US-06~11
- **Components**: SocialController/Service, MergeController/Service, WebSocketController, NotificationService(확장)
- **Priority**: 2nd

### Unit 3: Backend - Entertainment (백엔드 미니게임)
- **Scope**: 아이스브레이킹, 룰렛/사다리, 밸런스/진실거짓, 대화 주제
- **Stories**: US-12~16
- **Components**: GameController/Service, GameDataRepository
- **Priority**: 3rd

### Unit 4: Frontend - Customer App (고객용 프론트엔드)
- **Scope**: 고객용 전체 UI (메뉴, 장바구니, 주문, 소셜, 합석, 미니게임, 호출, 타이머)
- **Stories**: US-01~18
- **Components**: LoginPage, MenuPage, CartDrawer, OrderPage, SocialPage, MergePage, GamePage, CallButton, TimerWidget, NotificationToast
- **Priority**: 4th (백엔드 Unit 1~3 완료 후)

### Unit 5: Frontend - Admin App (관리자용 프론트엔드)
- **Scope**: 관리자용 전체 UI (대시보드, 룸/메뉴/매장/호출/신고 관리)
- **Stories**: US-19~26
- **Components**: LoginPage, DashboardPage, RoomManagePage, MenuManagePage, StoreManagePage, CallManagePage, ReportManagePage
- **Priority**: 5th

## Code Organization (Greenfield)

```
aidlc-workshop/
├── backend/                          # Spring Boot 백엔드
│   └── src/main/java/com/huntingpocha/
│       ├── auth/                     # 인증 도메인
│       ├── store/                    # 매장 도메인
│       ├── menu/                     # 메뉴 도메인
│       ├── room/                     # 룸 도메인
│       ├── order/                    # 주문 도메인
│       ├── call/                     # 직원 호출 도메인
│       ├── social/                   # 소셜 도메인 (메시지, 사진, 음료보내기)
│       ├── merge/                    # 합석 도메인
│       ├── game/                     # 미니게임 도메인
│       ├── notification/             # SSE + WebSocket 알림
│       ├── file/                     # 파일 관리
│       └── common/                   # 공통 (config, security, exception)
├── customer-app/                     # React 고객용 앱
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       ├── services/                 # API 호출
│       └── store/                    # 상태 관리
├── admin-app/                        # React 관리자용 앱
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── store/
└── aidlc-docs/                       # 문서
```

## Development Order
1. Unit 1: Backend Core Order → 2. Unit 2: Backend Social → 3. Unit 3: Backend Entertainment → 4. Unit 4: Customer App → 5. Unit 5: Admin App
