# NFR Design Patterns - Backend Core Order

## 1. Security Patterns

### JWT Authentication Filter
- Spring Security FilterChain에 JWT 검증 필터 등록
- 공개 엔드포인트: `/api/auth/**` (로그인)
- 보호 엔드포인트: 그 외 모든 API
- 토큰에서 role(ADMIN/ROOM) 추출 → SecurityContext에 저장
- 관리자 전용 API (`/api/admin/**`)는 ADMIN role 필수

### Password Hashing
- BCryptPasswordEncoder (strength=10)
- 관리자 비밀번호, 룸 비밀번호 모두 bcrypt 적용

### Login Throttling
- 인메모리 카운터 (loginAttempts 필드)
- 5회 실패 → lockedUntil = now + 15분
- 성공 시 리셋

## 2. Performance Patterns

### Connection Pooling
- HikariCP (Spring Boot 기본)
- maximumPoolSize: 20
- minimumIdle: 5
- connectionTimeout: 30초

### SSE Connection Management
- SseEmitter timeout: 30분
- 매장별 emitter 관리 (ConcurrentHashMap)
- 연결 끊김 시 자동 정리 (onCompletion, onTimeout, onError 콜백)
- heartbeat: 15초 간격 빈 이벤트 전송 (연결 유지)

### Lazy Loading
- JPA 연관관계 기본 LAZY 로딩
- 필요 시 fetch join으로 N+1 문제 방지

## 3. Resilience Patterns

### Global Exception Handler
- @RestControllerAdvice로 전역 예외 처리
- 비즈니스 예외 → 400 Bad Request + 사용자 친화적 메시지
- 인증 예외 → 401 Unauthorized
- 권한 예외 → 403 Forbidden
- 서버 에러 → 500 Internal Server Error (상세 정보 숨김)

### Transaction Management
- 주문 생성: @Transactional (Order + OrderItem 원자적 저장)
- 이용 완료: @Transactional (OrderHistory 이동 + Order 삭제 + Session 비활성화)
- 실패 시 자동 롤백

### File Upload Safety
- 파일 크기 제한: 10MB
- 허용 확장자: jpg, jpeg, png, gif, webp
- UUID 기반 파일명 생성 (충돌 방지)
- 업로드 실패 시 DB 롤백

## 4. Logging Pattern

### Structured Logging
- SLF4J + Logback
- 로그 레벨: INFO (기본), DEBUG (개발)
- 파일 로깅: logs/application.log (일별 롤링, 30일 보관)
- 주요 로깅 포인트: 인증 시도, 주문 생성/삭제, 세션 시작/종료, 에러
