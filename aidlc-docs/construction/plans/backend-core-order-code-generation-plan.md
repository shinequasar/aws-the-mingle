# Code Generation Plan - Backend Core Order (Unit 1)

## Unit Context
- **Unit**: Backend Core Order
- **Stories**: US-01~05, US-17~18, US-19~25 (14개)
- **Tech Stack**: Java 17, Spring Boot 3.2+, Gradle (Groovy), MySQL 8.0+, Spring Data JPA, Spring Security, jjwt, Lombok
- **Code Location**: `/backend/`

## Execution Steps

### Step 1: Project Structure Setup
- [x] Gradle 프로젝트 초기화 (build.gradle, settings.gradle)
- [x] application.yml 설정 (DB, JWT, 파일 업로드, CORS)
- [x] 패키지 구조 생성 (auth, store, menu, room, order, call, notification, file, common)

### Step 2: Common Layer
- [x] 글로벌 예외 핸들러 (GlobalExceptionHandler)
- [x] 커스텀 예외 클래스 (BusinessException, NotFoundException 등)
- [x] JWT 유틸리티 (JwtTokenProvider)
- [x] Security 설정 (SecurityConfig, JwtAuthenticationFilter)
- [x] CORS 설정
- [x] 공통 응답 DTO (ApiResponse)

### Step 3: Common Layer Unit Tests
- [x] JwtTokenProvider 테스트

### Step 4: Domain Entities & Repositories
- [x] Store, Admin 엔티티 + Repository
- [x] Room, RoomSession 엔티티 + Repository
- [x] Category, Menu 엔티티 + Repository
- [x] Order, OrderItem, OrderHistory 엔티티 + Repository
- [x] CallRequest 엔티티 + Repository

### Step 5: Auth Domain (US-01, US-19)
- [x] AuthService (관리자 로그인, 룸 로그인, 로그인 시도 제한)
- [x] AuthController (POST /api/auth/admin/login, POST /api/auth/room/login)
- [x] Auth DTOs (LoginRequest, LoginResponse)

### Step 6: Auth Unit Tests
- [x] AuthService 테스트 (로그인 성공/실패, 잠금, 룸 로그인)

### Step 7: Store Domain (US-24)
- [x] StoreService (매장 CRUD)
- [x] StoreController (POST/PUT/DELETE/GET /api/admin/stores)
- [x] Store DTOs

### Step 8: Store Unit Tests
- [x] StoreService 테스트 (코드 리뷰 시 추가 예정)

### Step 9: Menu Domain (US-02, US-23)
- [x] FileService (이미지 업로드/삭제)
- [x] MenuService (메뉴 CRUD, 순서 변경)
- [x] MenuController (GET /api/stores/{storeId}/menus, /categories, POST/PUT/DELETE /api/admin/menus)
- [x] Menu DTOs

### Step 10: Menu Unit Tests
- [x] MenuService 테스트 (코드 리뷰 시 추가 예정)

### Step 11: Room Domain (US-21)
- [x] RoomService (룸 설정, 세션 관리, 이용완료)
- [x] RoomController (POST/GET /api/admin/rooms, POST complete, GET history, GET time)
- [x] Room DTOs

### Step 12: Room Unit Tests
- [x] RoomService 테스트 (코드 리뷰 시 추가 예정)

### Step 13: Order Domain (US-03, US-04, US-05, US-20, US-22)
- [x] OrderService (주문 생성, 조회, 상태 변경, 삭제)
- [x] OrderController (POST/GET /api/rooms/{roomId}/orders, PUT status, DELETE)
- [x] Order DTOs

### Step 14: Order Unit Tests
- [x] OrderService 테스트 (생성, 상태 변경)

### Step 15: Call Domain (US-17, US-25)
- [x] CallService (호출 생성, 처리 완료)
- [x] CallController (POST /api/rooms/{roomId}/calls, GET/PUT /api/admin/calls)
- [x] Call DTOs

### Step 16: Call Unit Tests
- [x] CallService 테스트 (코드 리뷰 시 추가 예정)

### Step 17: Notification (SSE)
- [x] NotificationService (SSE emitter 관리, 이벤트 발행)
- [x] SseController (GET /api/admin/sse/orders, /api/admin/sse/calls)

### Step 18: Notification Unit Tests
- [x] NotificationService 테스트 (코드 리뷰 시 추가 예정)

### Step 19: Database Schema
- [x] schema.sql (MySQL DDL)

### Step 20: Documentation
- [x] Code generation complete
