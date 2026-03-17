# Functional Design Plan - Backend Core Order (Unit 1)

## Execution Checklist

### Phase 1: Domain Entities
- [x] Store, Admin 엔티티 설계
- [x] Room, RoomSession 엔티티 설계
- [x] Category, Menu 엔티티 설계
- [x] Order, OrderItem, OrderHistory 엔티티 설계
- [x] CallRequest 엔티티 설계
- [x] 엔티티 관계 다이어그램

### Phase 2: Business Rules
- [x] 인증 규칙 (JWT, bcrypt, 로그인 시도 제한)
- [x] 주문 규칙 (생성, 삭제, 상태 변경)
- [x] 룸 세션 규칙 (시작, 종료, 시간 관리)
- [x] 메뉴 관리 규칙 (검증, 순서)
- [x] 직원 호출 규칙

### Phase 3: Business Logic Model
- [x] 주문 생성 플로우 상세
- [x] 룸 이용완료 플로우 상세
- [x] SSE 이벤트 발행 로직

---

## Questions

## Question 1
관리자 계정 구조는 어떻게 하시겠습니까?

A) 매장당 관리자 1명 (매장 = 관리자)
B) 매장당 관리자 여러 명 (마스터 관리자 + 직원 계정)
C) Other (please describe after [Answer]: tag below)

[Answer]: a: 한 메인 포스기에서 관리

## Question 2
주문 상태 변경 플로우는?

A) 대기중 → 준비중 → 완료 (순차적, 되돌리기 불가)
B) 대기중 ↔ 준비중 ↔ 완료 (자유롭게 변경 가능)
C) Other (please describe after [Answer]: tag below)

[Answer]: a

## Question 3
룸 세션 시작 시점은?

A) 관리자가 룸 초기 설정 완료 시 자동 시작
B) 해당 룸에서 첫 주문이 들어올 때 시작
C) Other (please describe after [Answer]: tag below)

[Answer]: b
