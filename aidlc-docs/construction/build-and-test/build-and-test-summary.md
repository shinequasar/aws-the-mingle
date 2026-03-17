# Build and Test Summary

## Project Overview
- **Project**: 룸 헌팅포차 테이블오더 서비스
- **Units**: 5 (Backend Core, Backend Social, Backend Entertainment, Customer App, Admin App)
- **Stories**: 26 (20 Must, 6 Should) — 전체 구현 완료

## Build Components

| Component | Build Tool | Port | Command |
|-----------|-----------|------|---------|
| Backend | Gradle + Spring Boot | 8080 | `./gradlew bootRun` |
| Customer App | Vite + React | 3000 | `npm run dev` |
| Admin App | Vite + React | 3001 | `npm run dev` |

## Unit Test Summary

| Component | Tests | Coverage |
|-----------|-------|----------|
| Backend (MergeServiceTest) | 3 | Merge 서비스 |
| Backend (GameServiceTest) | 7 | Game 서비스 |
| Customer App (stores) | 13 | auth/cart/notification stores |
| Admin App (store) | 2 | auth store |
| **Total** | **25** | |

## Integration Test Scenarios: 6
1. 관리자 로그인 → 매장/룸 설정
2. 고객 로그인 → 메뉴 → 주문
3. 주문 → 관리자 SSE 실시간 수신
4. 직원 호출 → 관리자 SSE 수신
5. 합석 요청 → 수락 → 미니게임
6. 이용 완료 → 리셋

## Performance Targets
- 메뉴 조회 < 1초, 주문 생성 < 2초, SSE < 2초, 게임 < 500ms

## Overall Status
- **Build**: Ready (instructions provided)
- **Unit Tests**: 25 tests defined
- **Integration Tests**: 6 scenarios defined
- **Performance Tests**: curl + ab 기반 가이드
- **Ready for Deployment**: Yes (로컬 서버)
