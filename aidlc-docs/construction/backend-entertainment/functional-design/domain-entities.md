# Domain Entities - Backend Entertainment

## GameQuestion

| Field | Type | Description |
|-------|------|-------------|
| id | Long (PK, AUTO) | 고유 식별자 |
| type | String (NOT NULL) | 게임 타입: ICEBREAKER, BALANCE, TRUTH_OR_LIE, TOPIC, PENALTY |
| category | String (nullable) | 카테고리: light, fun, deep (ICEBREAKER/TOPIC용) |
| content | Text (NOT NULL) | 질문/주제/벌칙 내용 |
| optionA | String (nullable) | 밸런스 게임 선택지 A |
| optionB | String (nullable) | 밸런스 게임 선택지 B |

## 게임 타입 정의

| Type | 용도 | category 사용 | optionA/B 사용 |
|------|------|--------------|----------------|
| ICEBREAKER | 아이스브레이킹 질문 (US-13) | O (light/fun/deep) | X |
| BALANCE | 밸런스 게임 (US-15) | X | O |
| TRUTH_OR_LIE | 진실 or 거짓 (US-15) | X | X |
| TOPIC | 대화 주제 (US-16) | O (light/fun/deep) | X |
| PENALTY | 벌칙 (US-14 룰렛/사다리용) | X | X |
