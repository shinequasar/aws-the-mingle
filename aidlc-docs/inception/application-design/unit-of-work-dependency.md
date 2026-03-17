# Unit of Work Dependencies

## Dependency Matrix

| Unit | Depends On | Dependency Type |
|------|-----------|----------------|
| Unit 1: Backend Core Order | - | 없음 (기반 유닛) |
| Unit 2: Backend Social | Unit 1 | OrderService(음료보내기 과금), RoomService(합석 연장), NotificationService |
| Unit 3: Backend Entertainment | Unit 1 | 공통 인프라 (DB, 인증) |
| Unit 4: Customer App | Unit 1, 2, 3 | 모든 백엔드 API 의존 |
| Unit 5: Admin App | Unit 1, 2 | Core + Social 백엔드 API 의존 |

## Development Sequence

```
Unit 1 (Backend Core) ──→ Unit 2 (Backend Social) ──→ Unit 3 (Backend Game)
                                                              │
                                                              v
                                                    Unit 4 (Customer App)
                                                              │
                                                              v
                                                    Unit 5 (Admin App)
```

## Integration Points

| From | To | Interface |
|------|----|-----------|
| Unit 2 → Unit 1 | OrderService | 음료보내기 수락 시 주문 생성 |
| Unit 2 → Unit 1 | RoomService | 합석 시 시간 연장 |
| Unit 2 → Unit 1 | NotificationService | SSE/WebSocket 이벤트 발행 |
| Unit 3 → Unit 1 | 공통 DB/인증 | 인증 미들웨어, DB 연결 |
| Unit 4 → Unit 1,2,3 | REST + WebSocket | 전체 백엔드 API |
| Unit 5 → Unit 1,2 | REST + SSE | 관리 API + 실시간 알림 |
