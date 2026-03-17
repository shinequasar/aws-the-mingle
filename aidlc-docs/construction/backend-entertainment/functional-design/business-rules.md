# Business Rules - Backend Entertainment

## BR-GAME-01: 게임 접근 조건
- 합석 성공(MERGE_ACCEPTED) 시 미니게임 메뉴 자동 노출 (이스터에그)
- 합석 없이도 개별 게임 API 호출 가능 (제한 없음)

## BR-GAME-02: 랜덤 조회
- 모든 게임 질문은 DB에서 ORDER BY RAND() LIMIT 1로 조회
- 데이터 없을 경우 null 반환 (에러 아님)

## BR-GAME-03: 룰렛 규칙
- playerCount는 2 이상 필수
- 당첨자는 1~playerCount 범위 내 균등 랜덤

## BR-GAME-04: 사다리타기 규칙
- playerCount는 2 이상 필수
- 모든 플레이어에게 벌칙 1:1 매핑
- 벌칙 수 < 플레이어 수일 경우 나머지는 "통과!"

## BR-GAME-05: 시드 데이터
- schema.sql에 초기 게임 데이터 INSERT
- 관리자 UI에서 게임 데이터 관리는 이번 범위 외
