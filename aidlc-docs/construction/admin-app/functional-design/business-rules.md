# Business Rules - Admin App

## BR-ADM-01: 인증
- JWT 없으면 /login 리다이렉트
- 401 응답 시 자동 로그아웃
- 모든 API에 Authorization Bearer 헤더

## BR-ADM-02: 주문 상태 변경
- 순방향만 허용: PENDING → PREPARING → COMPLETED
- 상태 변경 즉시 UI 반영

## BR-ADM-03: 주문 삭제
- 삭제 전 확인 팝업 필수
- 삭제 후 총 주문액 자동 재계산

## BR-ADM-04: 이용 완료
- 확인 팝업 → 세션 종료 → 주문 이력 이동 → 룸 리셋
- 되돌리기 불가

## BR-ADM-05: SSE 연결
- 대시보드 진입 시 주문 SSE 연결
- 호출 관리 진입 시 호출 SSE 연결
- 페이지 이탈 시 연결 해제

## BR-ADM-06: 메뉴 이미지
- 파일 선택 → 서버 업로드 (multipart/form-data)
- 허용: jpg, jpeg, png, gif, webp (10MB 이하)
