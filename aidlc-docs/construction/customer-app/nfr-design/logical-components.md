# Logical Components - Customer App

## 아키텍처 구조

```
+----------------------------------------------------------+
|                    React SPA (Vite)                       |
|                                                          |
|  +------------------+  +-----------------------------+   |
|  | React Router v6  |  | Zustand Stores              |   |
|  | (ProtectedRoute) |  | (auth, cart, notification)  |   |
|  +------------------+  +-----------------------------+   |
|                                                          |
|  +------------------+  +-----------------------------+   |
|  | Pages (6)        |  | Shared Components           |   |
|  | Login,Menu,Order |  | Toast,Timer,Call,CartDrawer  |   |
|  | Social,Merge,Game|  |                             |   |
|  +------------------+  +-----------------------------+   |
|                                                          |
|  +------------------+  +-----------------------------+   |
|  | Axios Instance   |  | STOMP WebSocket Client      |   |
|  | (JWT Interceptor)|  | (Auto-reconnect)            |   |
|  +------------------+  +-----------------------------+   |
+----------------------------------------------------------+
         |                              |
         v                              v
   REST API (8080)              WebSocket (8080/ws)
```

## 디렉토리 구조

```
customer-app/src/
  pages/          # 6 page components
  components/     # shared UI components
  hooks/          # useWebSocket, useTimer, useAuth
  services/       # api.ts (axios), ws.ts (stomp)
  stores/         # authStore, cartStore, notificationStore
  types/          # TypeScript interfaces
  App.tsx         # Router + Layout
  main.tsx        # Entry point
```
