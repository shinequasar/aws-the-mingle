# Unit Test Execution

## Backend Tests
```bash
cd backend
./gradlew test
```

### 예상 결과
| Test Class | Tests | Description |
|-----------|-------|-------------|
| MergeServiceTest | 3 | 합석 수락/거절/미존재 |
| GameServiceTest | 7 | 아이스브레이킹, 밸런스, 룰렛 정상/예외, 사다리 정상/예외 |
| **Total** | **10** | |

### 테스트 리포트
- `backend/build/reports/tests/test/index.html`

## Customer App Tests
```bash
cd customer-app
npm run test
```

### 예상 결과
| Test File | Tests | Description |
|-----------|-------|-------------|
| cartStore.test.ts | 8 | 장바구니 CRUD, 수량 제한, 합계 |
| authStore.test.ts | 2 | 로그인/로그아웃 |
| notificationStore.test.ts | 3 | 알림 추가/삭제/전체삭제 |
| **Total** | **13** | |

## Admin App Tests
```bash
cd admin-app
npm run test
```

### 예상 결과
| Test File | Tests | Description |
|-----------|-------|-------------|
| authStore.test.ts | 2 | 로그인/로그아웃 |
| **Total** | **2** | |

## 전체 테스트 요약
- Backend: 10 tests
- Customer App: 13 tests
- Admin App: 2 tests
- **Total: 25 tests**
