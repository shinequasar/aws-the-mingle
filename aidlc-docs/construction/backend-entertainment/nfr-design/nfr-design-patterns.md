# NFR Design Patterns - Backend Entertainment

## 기본 원칙
Unit 1의 모든 NFR 패턴 상속 (JWT 인증, 글로벌 예외 핸들러, 트랜잭션 관리, 로깅).

## Unit 3 고유 패턴

### 1. Input Validation
- playerCount 파라미터: @Min(2) @Max(20) 검증
- category 파라미터: 허용값 검증 (light, fun, deep) 또는 null

### 2. Null-Safe Response
- 게임 데이터 없을 경우 null 반환 (404 아님)
- 클라이언트에서 "데이터 없음" 처리 책임

### 3. Stateless Design
- 게임 상태 서버 미저장 (모든 게임 결과는 요청 시 생성)
- 룰렛/사다리 결과는 인메모리 연산 후 즉시 반환
