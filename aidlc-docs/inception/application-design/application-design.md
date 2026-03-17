# Application Design - Consolidated

## Architecture Overview
- **Pattern**: Layered Architecture (Controller → Service → Repository)
- **API Style**: RESTful API
- **Real-time**: SSE (관리자 알림) + WebSocket/STOMP (룸 간 소통, 합석)
- **Project Structure**: 모노레포

## System Components

### Backend (Spring Boot)
- 11 Controllers (REST + SSE + WebSocket)
- 11 Services (비즈니스 로직 + 오케스트레이션)
- 15 Repositories (데이터 접근)
- FileService (로컬 파일 저장)

### Frontend - Customer App (React + TypeScript + Tailwind)
- 10 주요 컴포넌트 (메뉴, 장바구니, 주문, 소셜, 합석, 미니게임, 호출, 타이머)

### Frontend - Admin App (React + TypeScript + Tailwind)
- 7 주요 컴포넌트 (대시보드, 룸/메뉴/매장/호출/신고 관리)

## Key Orchestration Flows
1. **주문**: Customer → REST → OrderService → DB + SSE → Admin
2. **음료 보내기**: Room A → REST → SocialService → WebSocket → Room B → 수락 → OrderService
3. **합석**: Room A → REST → MergeService → WebSocket → Room B → 수락 → RoomService(연장) + GameService(미니게임)
4. **합석 연장**: 스케줄러 → WebSocket(알림) → 연장 선택 → 술 주문 검증 → 시간 추가

## Detailed Artifacts
- [components.md](components.md) - 컴포넌트 정의
- [component-methods.md](component-methods.md) - 메서드 시그니처
- [services.md](services.md) - 서비스 정의 및 오케스트레이션
- [component-dependency.md](component-dependency.md) - 의존성 관계
