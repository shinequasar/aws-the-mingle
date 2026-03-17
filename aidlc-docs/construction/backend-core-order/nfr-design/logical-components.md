# Logical Components - Backend Core Order

## Application Layer

```
+------------------------------------------------------------------+
|                     Spring Boot Application                       |
|                                                                   |
|  +------------------+  +------------------+  +----------------+  |
|  | Security Filter  |  | Global Exception |  | CORS Config    |  |
|  | (JWT Auth)       |  | Handler          |  |                |  |
|  +------------------+  +------------------+  +----------------+  |
|                                                                   |
|  +------------------+  +------------------+  +----------------+  |
|  | REST Controllers |  | SSE Controller   |  | File Upload    |  |
|  | (11 controllers) |  | (SseEmitter)     |  | (MultipartFile)|  |
|  +------------------+  +------------------+  +----------------+  |
|                                                                   |
|  +------------------+  +------------------+  +----------------+  |
|  | Service Layer    |  | Notification     |  | File Service   |  |
|  | (Business Logic) |  | Service (SSE)    |  | (Local Storage)|  |
|  +------------------+  +------------------+  +----------------+  |
|                                                                   |
|  +------------------+                                             |
|  | JPA Repositories |                                             |
|  | (Spring Data)    |                                             |
|  +------------------+                                             |
+------------------------------------------------------------------+
         |                              |
         v                              v
+------------------+          +------------------+
|     MySQL 8.0    |          |  Local File      |
|  (HikariCP x20)  |          |  System (uploads)|
+------------------+          +------------------+
```

## Component Details

| Component | Technology | Purpose |
|-----------|-----------|---------|
| JWT Filter | Spring Security + jjwt | 요청별 토큰 검증, role 기반 접근 제어 |
| Exception Handler | @RestControllerAdvice | 전역 예외 → HTTP 응답 변환 |
| CORS Config | WebMvcConfigurer | 프론트엔드 도메인 허용 |
| SSE Emitter Pool | ConcurrentHashMap<storeId, List<SseEmitter>> | 매장별 SSE 연결 관리 |
| HikariCP | Spring Boot 기본 | DB 커넥션 풀 (max 20) |
| Logback | SLF4J + Logback | 파일 로깅 (일별 롤링) |
| Jackson | Spring Boot 기본 | JSON 직렬화/역직렬화 |
| Hibernate | Spring Data JPA | ORM, DDL 자동 생성 (개발) |
