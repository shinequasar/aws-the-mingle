# Integration Test Instructions

## Purpose
백엔드 API ↔ 프론트엔드 간 통합, 서비스 간 상호작용 검증.

## Setup
```bash
# 1. MySQL 실행 + DB 생성
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS huntingpocha;"

# 2. Backend 실행
cd backend && ./gradlew bootRun &

# 3. Customer App 실행
cd customer-app && npm run dev &

# 4. Admin App 실행
cd admin-app && npm run dev &
```

## Test Scenarios

### Scenario 1: 관리자 로그인 → 매장/룸 설정
1. Admin App (localhost:3001) 접속
2. 매장 관리에서 매장 등록 (코드: TEST01)
3. 룸 관리에서 룸 추가 (번호: 1, 비밀번호: 1234)
4. **Expected**: 매장/룸 생성 성공, 목록에 표시

### Scenario 2: 고객 로그인 → 메뉴 조회 → 주문
1. Customer App (localhost:3000) 접속
2. 매장코드 TEST01, 룸번호 1, 비밀번호 1234 로그인
3. 메뉴 카테고리 선택 → 메뉴 담기 → 장바구니 → 주문
4. **Expected**: 주문 성공, 주문번호 표시, 5초 후 메뉴 화면

### Scenario 3: 주문 → 관리자 실시간 수신
1. Scenario 2 주문 후
2. Admin App 대시보드 확인
3. **Expected**: SSE로 2초 이내 주문 표시, 상태 변경 가능

### Scenario 4: 직원 호출 → 관리자 수신
1. Customer App에서 직원 호출 (사유: 물)
2. Admin App 호출 관리 확인
3. **Expected**: SSE로 실시간 호출 표시, 처리완료 가능

### Scenario 5: 합석 요청 → 수락 → 미니게임
1. 룸 1에서 룸 2에 합석 요청
2. 룸 2에서 WebSocket 알림 수신 → 수락
3. **Expected**: 양쪽 30분 연장, 미니게임 안내 노출

### Scenario 6: 이용 완료 → 리셋
1. Admin App에서 룸 이용완료 처리
2. **Expected**: 주문 이력 이동, 룸 상태 '대기'로 리셋

## Cleanup
```bash
# 프로세스 종료
kill %1 %2 %3
# 테스트 DB 정리 (선택)
mysql -u root -p -e "DROP DATABASE huntingpocha;"
```
