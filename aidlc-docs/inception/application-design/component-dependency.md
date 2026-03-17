# Component Dependencies

## Backend Dependency Matrix

| Component | Depends On |
|-----------|-----------|
| AuthController | AuthService |
| MenuController | MenuService |
| OrderController | OrderService |
| RoomController | RoomService |
| StoreController | StoreService |
| SocialController | SocialService |
| MergeController | MergeService |
| CallController | CallService |
| GameController | GameService |
| SseController | NotificationService |
| WebSocketController | NotificationService |
| AuthService | AdminRepository, RoomRepository |
| MenuService | MenuRepository, CategoryRepository, FileService |
| OrderService | OrderRepository, OrderItemRepository, NotificationService |
| RoomService | RoomRepository, RoomSessionRepository, OrderHistoryRepository |
| SocialService | MessageRepository, PhotoRepository, ReportRepository, OrderService, FileService, NotificationService |
| MergeService | MergeRequestRepository, RoomService, OrderService, NotificationService |
| CallService | CallRequestRepository, NotificationService |
| GameService | GameDataRepository |
| NotificationService | SseEmitter (Spring), WebSocket (STOMP) |
| FileService | (파일 시스템) |

## Communication Patterns

| From | To | Protocol | Purpose |
|------|-----|----------|---------|
| Customer App | Backend API | REST (HTTP) | 주문, 메뉴, 인증 등 |
| Customer App | Backend | WebSocket (STOMP) | 룸 간 소통, 합석, 미니게임 |
| Admin App | Backend API | REST (HTTP) | 관리 기능 |
| Admin App | Backend | SSE | 실시간 주문/호출 알림 |
| Backend | MySQL | JDBC | 데이터 영속화 |

## Data Flow Diagram

```
+------------------+     REST/WS      +------------------+     JDBC     +-------+
|  Customer App    | <--------------> |                  | <----------> | MySQL |
|  (React + TS)    |                  |  Spring Boot     |              |       |
+------------------+                  |  Backend API     |              +-------+
                                      |                  |
+------------------+     REST/SSE     |  - Controllers   |     File I/O
|  Admin App       | <--------------> |  - Services      | <----------> +-------+
|  (React + TS)    |                  |  - Repositories  |              | Local |
+------------------+                  +------------------+              | Files |
                                                                        +-------+
```
