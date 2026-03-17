# Business Rules - Backend Social & Hunting

## BR-SEND: 음료/안주 보내기
- 보내는 룸에서 메뉴 선택 + 받는 룸 번호 입력
- WebSocket으로 받는 룸에 수락/거절 알림
- 수락 시: OrderService 호출하여 보내는 룸에 과금, 주방에 주문 전달
- 거절 시: 보내는 룸에 거절 알림

## BR-MSG: 메시지 보내기
- 특정 룸 번호 지정 1:1 메시지
- WebSocket으로 실시간 전달
- 최대 200자 제한

## BR-PHOTO: 사진 보내기
- 태블릿 카메라 촬영 → 서버 업로드 → 특정 룸에 전송
- FileService로 로컬 저장
- WebSocket으로 수신 룸에 알림

## BR-MERGE: 합석
- 룸 A → 룸 B 합석 요청 (WebSocket)
- 룸 B 수락/거절 (WebSocket)
- 수락 시: 최초 1회 무료 30분 연장 (RoomService)
- 30분 후 재알림 (서버 스케줄러 → WebSocket)
- 연장 시 술 1병 주문 필수 (OrderService로 검증)

## BR-REPORT: 신고
- 수신한 메시지/사진에 신고 버튼
- 신고 접수 → 관리자에게 SSE 알림
- 관리자가 콘텐츠 삭제 처리
