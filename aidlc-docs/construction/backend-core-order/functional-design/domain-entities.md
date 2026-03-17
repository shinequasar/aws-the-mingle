# Domain Entities - Backend Core Order

## Entity Relationship

```
Store 1──N Admin (1:1 in MVP)
Store 1──N Room
Store 1──N Category
Category 1──N Menu
Room 1──N RoomSession
RoomSession 1──N Order
Order 1──N OrderItem
OrderItem N──1 Menu
RoomSession 1──N OrderHistory (이용완료 시 이동)
Room 1──N CallRequest
```

## Entities

### Store (매장)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 매장 ID |
| storeCode | String | Unique, Not Null | 매장 식별 코드 |
| name | String | Not Null | 매장명 |
| address | String | | 매장 주소 |
| phone | String | | 연락처 |
| createdAt | LocalDateTime | Not Null | 생성일시 |
| updatedAt | LocalDateTime | Not Null | 수정일시 |

### Admin (관리자)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 관리자 ID |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| username | String | Not Null | 사용자명 |
| password | String | Not Null | bcrypt 해싱된 비밀번호 |
| loginAttempts | Integer | Default 0 | 로그인 시도 횟수 |
| lockedUntil | LocalDateTime | | 잠금 해제 시각 |
| createdAt | LocalDateTime | Not Null | 생성일시 |

### Room (룸)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 룸 ID |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| roomNumber | Integer | Not Null | 룸 번호 |
| password | String | Not Null | bcrypt 해싱된 비밀번호 |
| createdAt | LocalDateTime | Not Null | 생성일시 |

### RoomSession (룸 세션)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 세션 ID |
| roomId | Long | FK(Room), Not Null | 룸 ID |
| startedAt | LocalDateTime | Not Null | 세션 시작 (첫 주문 시) |
| expiresAt | LocalDateTime | Not Null | 만료 시각 (시작+2시간) |
| completedAt | LocalDateTime | | 이용 완료 시각 |
| active | Boolean | Default true | 활성 여부 |

### Category (카테고리)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 카테고리 ID |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| name | String | Not Null | 카테고리명 |
| displayOrder | Integer | Default 0 | 노출 순서 |

### Menu (메뉴)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 메뉴 ID |
| categoryId | Long | FK(Category), Not Null | 카테고리 ID |
| name | String | Not Null | 메뉴명 |
| price | Integer | Not Null, Min 0 | 가격 (원) |
| description | String | | 설명 |
| imageUrl | String | | 이미지 경로 |
| displayOrder | Integer | Default 0 | 노출 순서 |
| available | Boolean | Default true | 판매 가능 여부 |
| createdAt | LocalDateTime | Not Null | 생성일시 |
| updatedAt | LocalDateTime | Not Null | 수정일시 |

### Order (주문)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 주문 ID |
| roomSessionId | Long | FK(RoomSession), Not Null | 세션 ID |
| roomId | Long | FK(Room), Not Null | 룸 ID |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| orderNumber | String | Unique, Not Null | 주문 번호 |
| totalAmount | Integer | Not Null | 총 금액 |
| status | Enum | Not Null | PENDING/PREPARING/COMPLETED |
| createdAt | LocalDateTime | Not Null | 주문 시각 |
| updatedAt | LocalDateTime | Not Null | 수정일시 |

### OrderItem (주문 항목)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 항목 ID |
| orderId | Long | FK(Order), Not Null | 주문 ID |
| menuId | Long | FK(Menu), Not Null | 메뉴 ID |
| menuName | String | Not Null | 메뉴명 (스냅샷) |
| quantity | Integer | Not Null, Min 1 | 수량 |
| unitPrice | Integer | Not Null | 단가 (스냅샷) |

### OrderHistory (과거 주문 이력)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 이력 ID |
| roomId | Long | FK(Room), Not Null | 룸 ID |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| sessionId | Long | Not Null | 원본 세션 ID |
| orderNumber | String | Not Null | 주문 번호 |
| totalAmount | Integer | Not Null | 총 금액 |
| status | Enum | Not Null | 주문 상태 |
| items | JSON | Not Null | 주문 항목 (JSON 스냅샷) |
| orderedAt | LocalDateTime | Not Null | 원본 주문 시각 |
| completedAt | LocalDateTime | Not Null | 이용 완료 시각 |

### CallRequest (직원 호출)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 호출 ID |
| roomId | Long | FK(Room), Not Null | 룸 ID |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| reason | String | Not Null | 호출 사유 |
| handled | Boolean | Default false | 처리 완료 여부 |
| createdAt | LocalDateTime | Not Null | 호출 시각 |
| handledAt | LocalDateTime | | 처리 시각 |
