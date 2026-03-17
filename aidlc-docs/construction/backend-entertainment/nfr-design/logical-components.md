# Logical Components - Backend Entertainment

## 컴포넌트 구조

```
+----------------------------------------------+
|          Game Module (game/)                  |
|                                              |
|  +----------------+  +-------------------+   |
|  | GameController |  | GameService       |   |
|  | (REST API x6)  |  | (랜덤조회+결과생성)|   |
|  +----------------+  +-------------------+   |
|                                              |
|  +--------------------------------------+    |
|  | GameQuestionRepository               |    |
|  | (JPA + Native RAND() Query)          |    |
|  +--------------------------------------+    |
+----------------------------------------------+
         |
         v
+----------------------------------------------+
|  game_questions 테이블 (시드 데이터)           |
+----------------------------------------------+
```

## Component Details

| Component | Purpose |
|-----------|---------|
| GameController | 6개 REST 엔드포인트 (icebreaker, balance, truth-or-lie, topic, roulette, ladder) |
| GameService | 랜덤 질문 조회, 룰렛 당첨자 선정, 사다리 결과 생성 |
| GameQuestionRepository | JPA + Native Query (ORDER BY RAND() LIMIT 1) |
| GameQuestion | 단일 엔티티 (5개 타입 통합) |
