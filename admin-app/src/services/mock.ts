import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { Order, Room, Category, Menu, CallRequest, Report, Store } from '../types';

const IMG = 'https://raw.githubusercontent.com/shinequasar/aws-the-mingle/main/backend/uploads';

const ok = <T,>(data: T) => ({ success: true, message: 'ok', data });

const mockRooms: Room[] = [
  { id: 1, roomNumber: '1', storeId: 1, active: true },
  { id: 2, roomNumber: '2', storeId: 1, active: true },
  { id: 3, roomNumber: '3', storeId: 1, active: false },
  { id: 4, roomNumber: '4', storeId: 1, active: true },
  { id: 5, roomNumber: '5', storeId: 1, active: true },
  { id: 6, roomNumber: '6', storeId: 1, active: false },
  { id: 7, roomNumber: '7', storeId: 1, active: true },
  { id: 8, roomNumber: '8', storeId: 1, active: true },
];

const mockOrders: Order[] = [
  { id: 1, roomId: 1, totalAmount: 12000, status: 'COMPLETED', createdAt: new Date().toISOString(), items: [{ id: 1, menuName: '핫도그 세트', quantity: 1, unitPrice: 5000 }, { id: 2, menuName: '만두 라면', quantity: 1, unitPrice: 7000 }] },
  { id: 2, roomId: 1, totalAmount: 8500, status: 'PREPARING', createdAt: new Date().toISOString(), items: [{ id: 3, menuName: '토마토 파스타', quantity: 1, unitPrice: 8500 }] },
  { id: 3, roomId: 2, totalAmount: 5000, status: 'PENDING', createdAt: new Date().toISOString(), items: [{ id: 4, menuName: '새로', quantity: 1, unitPrice: 5000 }] },
  { id: 4, roomId: 4, totalAmount: 15000, status: 'PENDING', createdAt: new Date().toISOString(), items: [{ id: 5, menuName: '와인', quantity: 1, unitPrice: 15000 }] },
];

const mockCategories: Category[] = [
  { id: 1, name: '분식', storeId: 1 }, { id: 2, name: '면류', storeId: 1 },
  { id: 3, name: '사이드', storeId: 1 }, { id: 4, name: '디저트', storeId: 1 },
  { id: 5, name: '주류', storeId: 1 },
];

const mockMenus: Menu[] = [
  { id: 1, categoryId: 1, name: '핫도그 세트', price: 5000, description: '', imageUrl: '', displayOrder: 1, storeId: 1 },
  { id: 2, categoryId: 1, name: '떡꼬치', price: 4000, description: '', imageUrl: '', displayOrder: 2, storeId: 1 },
  { id: 3, categoryId: 1, name: '소고기 김밥', price: 4500, description: '', imageUrl: '', displayOrder: 3, storeId: 1 },
  { id: 4, categoryId: 2, name: '만두 라면', price: 7000, description: '', imageUrl: '', displayOrder: 1, storeId: 1 },
  { id: 5, categoryId: 2, name: '토마토 파스타', price: 8500, description: '', imageUrl: '', displayOrder: 2, storeId: 1 },
  { id: 15, categoryId: 5, name: '새로', price: 5000, description: '', imageUrl: `${IMG}/soju_saero.jpg`, displayOrder: 1, storeId: 1 },
  { id: 16, categoryId: 5, name: '가로', price: 5000, description: '', imageUrl: `${IMG}/soju_garo.jpg`, displayOrder: 2, storeId: 1 },
  { id: 17, categoryId: 5, name: '거꾸로', price: 5000, description: '', imageUrl: `${IMG}/soju_geokuro.jpg`, displayOrder: 3, storeId: 1 },
  { id: 18, categoryId: 5, name: '생맥주', price: 5000, description: '', imageUrl: `${IMG}/beer_glass.jpg`, displayOrder: 4, storeId: 1 },
  { id: 19, categoryId: 5, name: '하이볼', price: 7000, description: '', imageUrl: `${IMG}/highball.jpg`, displayOrder: 5, storeId: 1 },
  { id: 20, categoryId: 5, name: '와인', price: 15000, description: '', imageUrl: `${IMG}/wine_glass.jpg`, displayOrder: 6, storeId: 1 },
  { id: 21, categoryId: 5, name: '막걸리', price: 8000, description: '', imageUrl: `${IMG}/makgeolli.jpg`, displayOrder: 7, storeId: 1 },
];

const mockCalls: CallRequest[] = [
  { id: 1, roomId: 1, reason: '물 좀 주세요', status: 'PENDING', createdAt: new Date().toISOString() },
  { id: 2, roomId: 4, reason: '숟가락 추가요', status: 'PENDING', createdAt: new Date().toISOString() },
];

const mockReports: Report[] = [
  { id: 1, reporterRoomId: 2, targetRoomId: 7, targetType: 'ROOM', reason: '너무 시끄러워요', status: 'PENDING', createdAt: new Date().toISOString() },
];

const mockStores: Store[] = [
  { id: 1, name: '헌팅포차 강남점', code: 'GANGNAM01', address: '서울시 강남구' },
];

let idSeq = 100;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteHandler = (params: Record<string, string>, body?: any, query?: Record<string, string>) => any;

const routes: [string, string, RouteHandler][] = [
  ['POST', '/auth/admin/login', () => ok({ token: 'mock-admin-token', storeId: 1, storeName: '헌팅포차 강남점 (Mock)' })],
  // Dashboard
  ['GET', '/admin/rooms', () => ok(mockRooms)],
  ['GET', '/admin/orders', () => ok(mockOrders)],
  ['PUT', '/admin/orders/:id/status', (p, body) => {
    const o = mockOrders.find(o => o.id === Number(p.id));
    if (o) o.status = body?.status ?? o.status;
    return ok(o);
  }],
  ['DELETE', '/admin/orders/:id', (p) => {
    const idx = mockOrders.findIndex(o => o.id === Number(p.id));
    if (idx >= 0) mockOrders.splice(idx, 1);
    return ok(null);
  }],
  // Menus
  ['GET', '/stores/:storeId/categories', () => ok(mockCategories)],
  ['GET', '/stores/:storeId/menus', (_p, _b, q) => {
    const catId = q?.categoryId ? Number(q.categoryId) : null;
    return ok(catId ? mockMenus.filter(m => m.categoryId === catId) : mockMenus);
  }],
  ['POST', '/admin/menus', (_p, body) => { const m = { ...body, id: ++idSeq }; mockMenus.push(m); return ok(m); }],
  ['PUT', '/admin/menus/:id', (p, body) => {
    const m = mockMenus.find(m => m.id === Number(p.id));
    if (m) Object.assign(m, body);
    return ok(m);
  }],
  ['DELETE', '/admin/menus/:id', (p) => {
    const idx = mockMenus.findIndex(m => m.id === Number(p.id));
    if (idx >= 0) mockMenus.splice(idx, 1);
    return ok(null);
  }],
  // Rooms
  ['POST', '/admin/rooms', (_p, body) => { const r = { ...body, id: ++idSeq }; mockRooms.push(r); return ok(r); }],
  ['PUT', '/admin/rooms/:id', (p, body) => {
    const r = mockRooms.find(r => r.id === Number(p.id));
    if (r) Object.assign(r, body);
    return ok(r);
  }],
  ['DELETE', '/admin/rooms/:id', (p) => {
    const idx = mockRooms.findIndex(r => r.id === Number(p.id));
    if (idx >= 0) mockRooms.splice(idx, 1);
    return ok(null);
  }],
  // Calls
  ['GET', '/admin/calls', () => ok(mockCalls)],
  ['PUT', '/admin/calls/:id/complete', (p) => {
    const c = mockCalls.find(c => c.id === Number(p.id));
    if (c) c.status = 'COMPLETED';
    return ok(c);
  }],
  // Reports
  ['GET', '/admin/reports', () => ok(mockReports)],
  ['PUT', '/admin/reports/:id/resolve', (p) => {
    const r = mockReports.find(r => r.id === Number(p.id));
    if (r) r.status = 'RESOLVED';
    return ok(r);
  }],
  // Stores
  ['GET', '/admin/stores', () => ok(mockStores)],
  ['POST', '/admin/stores', (_p, body) => { const s = { ...body, id: ++idSeq }; mockStores.push(s); return ok(s); }],
  ['PUT', '/admin/stores/:id', (p, body) => {
    const s = mockStores.find(s => s.id === Number(p.id));
    if (s) Object.assign(s, body);
    return ok(s);
  }],
];

function matchRoute(method: string, url: string): { handler: RouteHandler; params: Record<string, string> } | null {
  for (const [m, pattern, handler] of routes) {
    if (m !== method) continue;
    const pp = pattern.split('/'), up = url.split('?')[0].split('/');
    if (pp.length !== up.length) continue;
    const params: Record<string, string> = {};
    let ok = true;
    for (let i = 0; i < pp.length; i++) {
      if (pp[i].startsWith(':')) params[pp[i].slice(1)] = up[i];
      else if (pp[i] !== up[i]) { ok = false; break; }
    }
    if (ok) return { handler, params };
  }
  return null;
}

function parseQuery(url: string): Record<string, string> {
  const q: Record<string, string> = {};
  const idx = url.indexOf('?');
  if (idx < 0) return q;
  new URLSearchParams(url.slice(idx)).forEach((v, k) => { q[k] = v; });
  return q;
}

export function enableMock(instance: AxiosInstance) {
  console.log('%c[ADMIN MOCK] mock 데이터로 동작합니다', 'color: orange; font-weight: bold;');
  const orig = instance.defaults.adapter;
  instance.defaults.adapter = (config: InternalAxiosRequestConfig) => {
    const url = config.url ?? '';
    const method = (config.method ?? 'GET').toUpperCase();
    const matched = matchRoute(method, url);
    if (matched) {
      const query = parseQuery(url);
      let body = config.data;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch {} }
      const data = matched.handler(matched.params, body, query);
      return Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });
    }
    if (orig && typeof orig === 'function') return orig(config);
    return Promise.resolve({ data: { success: true, data: null }, status: 200, statusText: 'OK', headers: {}, config });
  };
}
