# Code Summary - Backend Entertainment

## 생성/수정 파일

| File | Action | Description |
|------|--------|-------------|
| `game/GameQuestion.java` | 기존 유지 | 엔티티 (5개 타입 통합) |
| `game/GameQuestionRepository.java` | 기존 유지 | JPA + Native RAND() 쿼리 |
| `game/GameService.java` | 수정 | playerCount 검증 (2~20) 추가 |
| `game/GameController.java` | 신규 | REST API 6개 엔드포인트 |
| `schema.sql` | 기존 유지 | game_questions 테이블 + 시드 데이터 |

## 테스트 파일

| File | Tests |
|------|-------|
| `game/GameServiceTest.java` | 7개 (icebreaker 카테고리/전체, balance, roulette 정상/예외, ladder 정상/예외) |
| `game/GameControllerTest.java` | 2개 (icebreaker 조회, roulette 결과) |

## Story Coverage

| Story | Status |
|-------|--------|
| US-12 합석 미니게임 | ✅ (게임 API 제공, 이스터에그 노출은 프론트엔드) |
| US-13 아이스브레이킹 | ✅ |
| US-14 룰렛/사다리/벌칙 | ✅ |
| US-15 밸런스/진실거짓 | ✅ |
| US-16 대화 주제 | ✅ |
