# Business Logic Model - Backend Core Order

## 1. 주문 생성 플로우

```
1. 고객이 주문 확정 요청
2. JWT 토큰 검증 → roomId, storeId 추출
3. 활성 RoomSession 조회
   - 없으면: 새 RoomSession 생성 (expiresAt = now + 2h)
4. 주문 번호 생성 (매장코드-날짜-순번)
5. Order 생성 + OrderItem[] 생성 (트랜잭션)
6. 총 금액 계산: Σ(Menu.price × quantity)
7. Order 저장
8. SSE 이벤트 발행 → 관리자 (NEW_ORDER)
9. 주문 번호 반환
```

## 2. 주문 상태 변경 플로우

```
1. 관리자가 상태 변경 요청 (orderId, newStatus)
2. JWT 토큰 검증 → 관리자 권한 확인
3. Order 조회
4. 상태 전이 검증:
   - PENDING → PREPARING (OK)
   - PREPARING → COMPLETED (OK)
   - 그 외 → 에러 (InvalidStatusTransition)
5. 상태 업데이트
6. SSE 이벤트 발행 → 관리자 (ORDER_STATUS_CHANGED)
```

## 3. 룸 이용 완료 플로우

```
1. 관리자가 이용 완료 요청 (roomId)
2. 활성 RoomSession 조회
3. 해당 세션의 모든 Order 조회
4. 각 Order → OrderHistory로 변환 (items는 JSON 스냅샷)
5. OrderHistory 일괄 저장
6. Order + OrderItem 삭제
7. RoomSession 비활성화 (active=false, completedAt=now)
8. 트랜잭션 커밋
```

## 4. 관리자 로그인 플로우

```
1. storeCode + username + password 수신
2. Store 조회 (storeCode)
3. Admin 조회 (storeId + username)
4. 계정 잠금 확인 (lockedUntil > now → 에러)
5. bcrypt 비밀번호 검증
   - 실패: loginAttempts++, 5회 이상이면 lockedUntil = now + 15min
   - 성공: loginAttempts = 0
6. JWT 토큰 생성 (payload: adminId, storeId, role=ADMIN, exp=16h)
7. 토큰 반환
```

## 5. 룸 태블릿 로그인 플로우

```
1. storeCode + roomNumber + password 수신
2. Store 조회 (storeCode)
3. Room 조회 (storeId + roomNumber)
4. bcrypt 비밀번호 검증
5. JWT 토큰 생성 (payload: roomId, storeId, role=ROOM, exp=16h)
6. 토큰 반환
```

## 6. SSE 이벤트 모델

| Event Type | Trigger | Target | Payload |
|-----------|---------|--------|---------|
| NEW_ORDER | 주문 생성 | 관리자 (storeId) | orderId, roomNumber, totalAmount, items |
| ORDER_STATUS_CHANGED | 상태 변경 | 관리자 (storeId) | orderId, roomNumber, newStatus |
| ORDER_DELETED | 주문 삭제 | 관리자 (storeId) | orderId, roomNumber |
| NEW_CALL | 직원 호출 | 관리자 (storeId) | callId, roomNumber, reason |
| CALL_HANDLED | 호출 처리 | 관리자 (storeId) | callId, roomNumber |

## 7. JWT 토큰 구조

```json
{
  "sub": "adminId 또는 roomId",
  "storeId": 1,
  "role": "ADMIN 또는 ROOM",
  "iat": 1710648000,
  "exp": 1710705600
}
```
