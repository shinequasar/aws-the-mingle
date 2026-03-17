# Domain Entities - Backend Social & Hunting

## Entities

### SendMenuRequest (음료/안주 보내기 요청)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 요청 ID |
| senderRoomId | Long | FK(Room), Not Null | 보내는 룸 |
| receiverRoomId | Long | FK(Room), Not Null | 받는 룸 |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| menuItems | JSON | Not Null | 보내는 메뉴 목록 [{menuId, quantity}] |
| status | Enum | Not Null | PENDING/ACCEPTED/REJECTED |
| createdAt | LocalDateTime | Not Null | 요청 시각 |

### Message (메시지)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 메시지 ID |
| senderRoomId | Long | FK(Room), Not Null | 발신 룸 |
| receiverRoomId | Long | FK(Room), Not Null | 수신 룸 |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| content | String | Not Null | 메시지 내용 |
| createdAt | LocalDateTime | Not Null | 전송 시각 |

### Photo (사진)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 사진 ID |
| senderRoomId | Long | FK(Room), Not Null | 발신 룸 |
| receiverRoomId | Long | FK(Room), Not Null | 수신 룸 |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| imageUrl | String | Not Null | 사진 경로 |
| createdAt | LocalDateTime | Not Null | 전송 시각 |

### MergeRequest (합석 요청)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 합석 ID |
| requesterRoomId | Long | FK(Room), Not Null | 요청 룸 |
| targetRoomId | Long | FK(Room), Not Null | 대상 룸 |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| status | Enum | Not Null | PENDING/ACCEPTED/REJECTED |
| freeExtensionUsed | Boolean | Default false | 무료 연장 사용 여부 |
| extensionCount | Integer | Default 0 | 유료 연장 횟수 |
| createdAt | LocalDateTime | Not Null | 요청 시각 |

### Report (신고)
| Field | Type | Constraint | Description |
|-------|------|-----------|-------------|
| id | Long | PK, Auto | 신고 ID |
| reporterRoomId | Long | FK(Room), Not Null | 신고자 룸 |
| targetType | String | Not Null | MESSAGE/PHOTO |
| targetId | Long | Not Null | 대상 ID |
| storeId | Long | FK(Store), Not Null | 매장 ID |
| reason | String | | 신고 사유 |
| handled | Boolean | Default false | 처리 여부 |
| createdAt | LocalDateTime | Not Null | 신고 시각 |
