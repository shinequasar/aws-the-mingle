# Services

## Service Definitions

### AuthService
- JWT 토큰 발급 및 검증
- bcrypt 비밀번호 해싱/검증
- 로그인 시도 제한 (연속 실패 시 잠금)
- 관리자/룸 태블릿 인증 분리

### MenuService
- 메뉴 CRUD + 카테고리 관리
- FileService 호출하여 이미지 업로드 처리
- 메뉴 노출 순서 관리
- 입력값 검증 (필수 필드, 가격 범위)

### OrderService
- 주문 생성 (트랜잭션 처리)
- 주문 상태 변경 → NotificationService로 SSE 이벤트 발행
- 주문 삭제 → 총 주문액 재계산
- 세션 기반 주문 조회

### RoomService
- 룸 초기 설정 및 세션 생성
- 이용 시간 관리 (기본 2시간)
- 이용 완료 처리 → 주문 내역을 OrderHistory로 이동 → 리셋
- MergeService와 연동하여 합석 시 시간 연장

### StoreService
- 매장 CRUD
- 다중 매장 지원

### SocialService
- 음료/안주 보내기 → 수락 시 OrderService 호출하여 주문 생성
- 메시지/사진 전송 → WebSocket으로 실시간 전달
- FileService 호출하여 사진 저장
- 신고 접수 → NotificationService로 관리자 알림

### MergeService
- 합석 요청/수락/거절 → WebSocket으로 실시간 알림
- 합석 성립 시 RoomService 호출하여 30분 무료 연장
- 연장 규칙 적용 (30분마다 재알림, 술 1병 주문 검증)
- 합석 성공 시 GameService 연동 (미니게임 활성화)

### CallService
- 직원 호출 생성 → NotificationService로 SSE 이벤트 발행
- 호출 처리 완료 관리

### GameService
- 미니게임 데이터 제공 (DB에서 질문/주제 조회)
- 아이스브레이킹 질문, 밸런스 게임, 진실/거짓
- 룰렛/사다리타기 결과 생성
- 대화 주제 랜덤 생성

### NotificationService
- SSE 이벤트 발행 (주문, 호출 → 관리자)
- WebSocket 메시지 발행 (소셜, 합석 → 고객 룸)
- 이벤트 타입별 라우팅

### FileService
- 이미지/사진 파일 로컬 저장
- 파일 경로 관리
- 파일 삭제

## Orchestration Patterns

### 주문 생성 플로우
```
Customer → OrderController → OrderService → OrderRepository (저장)
                                          → NotificationService → SSE → Admin
```

### 음료 보내기 플로우
```
Room A → SocialController → SocialService → WebSocket → Room B (수락/거절 알림)
Room B 수락 → SocialService → OrderService → OrderRepository (Room A에 과금)
                                           → NotificationService → SSE → Admin
```

### 합석 플로우
```
Room A → MergeController → MergeService → WebSocket → Room B (합석 요청)
Room B 수락 → MergeService → RoomService (30분 연장)
                           → WebSocket → Room A + B (합석 성립 + 미니게임 활성화)
```

### 합석 연장 플로우
```
30분 경과 → 서버 스케줄러 → WebSocket → Room A + B (연장 알림)
연장 선택 → MergeController → MergeService → OrderService (술 1병 주문 검증)
                                           → RoomService (30분 추가 연장)
```
