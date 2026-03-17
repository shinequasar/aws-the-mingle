# Tech Stack Decisions - Backend Core Order

## Core Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 17 | 언어 |
| Spring Boot | 3.2+ | 프레임워크 |
| Gradle | Groovy DSL | 빌드 도구 |
| MySQL | 8.0+ | 데이터베이스 |

## Spring Boot Dependencies

| Dependency | Purpose |
|-----------|---------|
| spring-boot-starter-web | REST API |
| spring-boot-starter-data-jpa | JPA/Hibernate ORM |
| spring-boot-starter-validation | 입력값 검증 (Jakarta Validation) |
| spring-boot-starter-security | Spring Security (JWT 필터) |
| spring-boot-starter-websocket | WebSocket/STOMP (Unit 2에서 사용, 기반 설정) |
| jjwt (io.jsonwebtoken) | JWT 토큰 생성/검증 |
| mysql-connector-j | MySQL JDBC 드라이버 |
| lombok | 보일러플레이트 코드 감소 |
| spring-boot-starter-test | 테스트 |

## Configuration

| 항목 | 값 |
|------|-----|
| Server Port | 8080 |
| DB Connection Pool | HikariCP, max 20 |
| JWT Secret | 환경변수 (JWT_SECRET) |
| JWT Expiration | 16시간 (57600초) |
| File Upload Path | 환경변수 (UPLOAD_PATH), 기본 ./uploads |
| Max File Size | 10MB |
