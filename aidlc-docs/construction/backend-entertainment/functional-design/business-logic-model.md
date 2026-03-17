# Business Logic Model - Backend Entertainment

## GameService

### getIcebreaker(category?)
- category 지정 시 해당 카테고리에서 랜덤 1건 조회
- category 미지정 시 전체 ICEBREAKER에서 랜덤 1건 조회

### getBalance()
- BALANCE 타입에서 랜덤 1건 조회 (optionA, optionB 포함)

### getTruthOrLie()
- TRUTH_OR_LIE 타입에서 랜덤 1건 조회

### getTopic(category?)
- category 지정 시 해당 카테고리에서 랜덤 1건 조회
- category 미지정 시 전체 TOPIC에서 랜덤 1건 조회

### getRoulette(playerCount)
- PENALTY에서 랜덤 벌칙 1건 조회
- 1~playerCount 중 랜덤 당첨자 선정
- 반환: { selectedPlayer, totalPlayers, penalty }

### getLadder(playerCount)
- 1~playerCount 셔플하여 각 플레이어에 벌칙 배정
- PENALTY 목록 셔플 후 순서대로 매핑 (부족 시 "통과!")
- 반환: { results: { playerNumber → penalty } }

## GameController (REST API)

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/games/icebreaker | GET | 아이스브레이킹 질문 (query: category) |
| /api/games/balance | GET | 밸런스 게임 질문 |
| /api/games/truth-or-lie | GET | 진실 or 거짓 주제 |
| /api/games/topic | GET | 대화 주제 (query: category) |
| /api/games/roulette | GET | 룰렛 결과 (query: playerCount) |
| /api/games/ladder | GET | 사다리타기 결과 (query: playerCount) |
