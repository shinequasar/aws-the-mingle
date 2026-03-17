# Code Generation Plan - Backend Entertainment

## Unit Context
- **Stories**: US-12 (합석 미니게임), US-13 (아이스브레이킹), US-14 (룰렛/사다리), US-15 (밸런스/진실거짓), US-16 (대화 주제)
- **Dependencies**: Unit 1 (공통 인프라, DB, 인증)
- **기존 코드**: GameQuestion, GameQuestionRepository, GameService 이미 생성됨

## Steps
- [x] Step 1: schema.sql에 game_questions 테이블 + 시드 데이터 확인 — 이미 존재
- [x] Step 2: GameQuestion 엔티티 검증 — 적합
- [x] Step 3: GameQuestionRepository 검증 — 적합
- [x] Step 4: GameService playerCount 검증 로직 추가 (2~20)
- [x] Step 5: GameController 생성 (REST API 6개 엔드포인트)
- [x] Step 6: GameServiceTest 단위 테스트 생성 (7개 테스트)
- [x] Step 7: GameControllerTest 단위 테스트 생성 (2개 테스트)
- [x] Step 8: Code Summary 문서 생성
