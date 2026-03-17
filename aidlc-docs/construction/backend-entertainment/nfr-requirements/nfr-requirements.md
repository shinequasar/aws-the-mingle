# NFR Requirements - Backend Entertainment

## 기본 원칙
Unit 1 (Backend Core Order)의 NFR을 그대로 상속. 아래는 Unit 3 고유 사항만 기술.

## 성능 요구사항

| 항목 | 요구사항 |
|------|---------|
| 게임 질문 조회 | < 500ms (단일 랜덤 쿼리) |
| 룰렛/사다리 결과 생성 | < 200ms (인메모리 연산) |
| playerCount 제한 | 2~20명 |

## 데이터 요구사항

| 항목 | 요구사항 |
|------|---------|
| 시드 데이터 | schema.sql에 초기 게임 데이터 포함 |
| 데이터 확장 | 추후 관리자 UI 없이 DB 직접 INSERT로 확장 |

## 보안/가용성
- Unit 1과 동일 (JWT 인증, 글로벌 예외 핸들러)
