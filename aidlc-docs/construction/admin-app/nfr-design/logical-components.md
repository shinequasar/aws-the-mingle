# Logical Components - Admin App

## 아키텍처 구조

```
+----------------------------------------------------------+
|                   React SPA (Vite)                        |
|                                                          |
|  +------------------+  +-----------------------------+   |
|  | React Router v6  |  | Zustand Store (auth)        |   |
|  | (ProtectedRoute) |  |                             |   |
|  +------------------+  +-----------------------------+   |
|                                                          |
|  +------------------+  +-----------------------------+   |
|  | Pages (7)        |  | Shared: useSSE hook         |   |
|  | Login,Dashboard  |  | Sidebar, ConfirmModal       |   |
|  | Room,Menu,Store  |  |                             |   |
|  | Call,Report      |  |                             |   |
|  +------------------+  +-----------------------------+   |
|                                                          |
|  +------------------+  +-----------------------------+   |
|  | Axios Instance   |  | EventSource (SSE)           |   |
|  | (JWT Interceptor)|  | (Auto-reconnect)            |   |
|  +------------------+  +-----------------------------+   |
+----------------------------------------------------------+
         |                              |
         v                              v
   REST API (8080)              SSE (8080/api/admin/sse)
```

## 디렉토리 구조

```
admin-app/src/
  pages/          # 7 page components
  components/     # Sidebar, ConfirmModal
  hooks/          # useSSE
  services/       # api.ts
  stores/         # authStore
  types/          # TypeScript interfaces
  App.tsx
  main.tsx
```
