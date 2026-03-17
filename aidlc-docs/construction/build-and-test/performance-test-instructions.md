# Performance Test Instructions

## Performance Requirements
| 항목 | 목표 |
|------|------|
| 메뉴 조회 응답 | < 1초 |
| 주문 생성 응답 | < 2초 |
| SSE 이벤트 전달 | < 2초 |
| 게임 질문 조회 | < 500ms |
| 동시 접속 | 매장당 30대 태블릿 + 관리자 1대 |

## 간이 성능 테스트 (curl 기반)

### API 응답 시간 측정
```bash
# 메뉴 조회
curl -w "\n응답시간: %{time_total}s\n" -H "Authorization: Bearer {TOKEN}" http://localhost:8080/api/stores/1/menus

# 주문 생성
curl -w "\n응답시간: %{time_total}s\n" -X POST -H "Content-Type: application/json" -H "Authorization: Bearer {TOKEN}" \
  -d '{"items":[{"menuId":1,"menuName":"맥주","quantity":2,"unitPrice":5000}],"totalAmount":10000}' \
  http://localhost:8080/api/rooms/1/orders

# 게임 질문 조회
curl -w "\n응답시간: %{time_total}s\n" -H "Authorization: Bearer {TOKEN}" http://localhost:8080/api/games/icebreaker
```

## 부하 테스트 (선택, Apache Bench)
```bash
# 메뉴 조회 동시 30 요청
ab -n 100 -c 30 -H "Authorization: Bearer {TOKEN}" http://localhost:8080/api/stores/1/menus

# 기대: 평균 응답 < 1초, 에러율 0%
```

## 참고
- PoC 수준이므로 정밀 부하 테스트는 선택사항
- 로컬 서버 단일 인스턴스 기준 매장당 30대 동시 접속 충분
