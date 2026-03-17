# Business Logic Model - Admin App

## API 연동 매핑

| Component | API | Method |
|-----------|-----|--------|
| LoginPage | /api/auth/admin/login | POST |
| DashboardPage | /api/admin/rooms (with orders) | GET |
| DashboardPage | /api/admin/orders/{id}/status | PUT |
| RoomManagePage | /api/admin/rooms | GET/POST |
| RoomManagePage | /api/admin/rooms/{id}/complete | POST |
| RoomManagePage | /api/admin/rooms/{id}/history | GET |
| RoomManagePage | /api/admin/orders/{id} | DELETE |
| MenuManagePage | /api/admin/menus | GET/POST/PUT/DELETE |
| MenuManagePage | /api/stores/{storeId}/categories | GET |
| StoreManagePage | /api/admin/stores | GET/POST/PUT/DELETE |
| CallManagePage | /api/admin/calls | GET |
| CallManagePage | /api/admin/calls/{id}/complete | PUT |
| ReportManagePage | /api/admin/reports | GET |
| ReportManagePage | /api/admin/reports/{id}/resolve | PUT |

## SSE 구독

| Component | Endpoint | Events |
|-----------|----------|--------|
| DashboardPage | /api/admin/sse/orders | NEW_ORDER, ORDER_STATUS_CHANGED |
| CallManagePage | /api/admin/sse/calls | NEW_CALL |
