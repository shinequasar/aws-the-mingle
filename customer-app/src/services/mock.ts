import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { Category, Menu, Order, GameQuestion } from '../types';
import { broadcastToRoom } from './broadcast';

const IMG = 'https://raw.githubusercontent.com/shinequasar/aws-the-mingle/main/backend/uploads';

const categories: Category[] = [
  { id: 1, name: '분식', storeId: 1 },
  { id: 2, name: '면류', storeId: 1 },
  { id: 3, name: '사이드', storeId: 1 },
  { id: 4, name: '디저트', storeId: 1 },
  { id: 5, name: '주류', storeId: 1 },
];

const menus: Menu[] = [
  { id: 1, categoryId: 1, name: '핫도그 세트', price: 5000, description: '바삭한 핫도그 3종 세트', imageUrl: '', displayOrder: 1, storeId: 1 },
  { id: 2, categoryId: 1, name: '떡꼬치', price: 4000, description: '매콤달콤 양념 떡꼬치', imageUrl: '', displayOrder: 2, storeId: 1 },
  { id: 3, categoryId: 1, name: '소고기 김밥', price: 4500, description: '소고기와 신선한 야채가 가득한 김밥', imageUrl: '', displayOrder: 3, storeId: 1 },
  { id: 4, categoryId: 2, name: '만두 라면', price: 7000, description: '푸짐한 만두가 올라간 얼큰한 라면', imageUrl: '', displayOrder: 1, storeId: 1 },
  { id: 5, categoryId: 2, name: '토마토 파스타', price: 8500, description: '방울토마토와 바질의 클래식 파스타', imageUrl: '', displayOrder: 2, storeId: 1 },
  { id: 6, categoryId: 2, name: '비빔면', price: 6000, description: '매콤새콤 비빔면', imageUrl: '', displayOrder: 3, storeId: 1 },
  { id: 7, categoryId: 3, name: '군만두', price: 5500, description: '노릇노릇 바삭한 군만두', imageUrl: '', displayOrder: 1, storeId: 1 },
  { id: 8, categoryId: 3, name: '새우튀김', price: 7500, description: '바삭한 황금빛 새우튀김', imageUrl: '', displayOrder: 2, storeId: 1 },
  { id: 9, categoryId: 3, name: '감자구이', price: 5000, description: '허브 시즈닝 감자구이', imageUrl: '', displayOrder: 3, storeId: 1 },
  { id: 10, categoryId: 3, name: '브로콜리 소시지', price: 4500, description: '귀여운 브로콜리 소시지', imageUrl: '', displayOrder: 4, storeId: 1 },
  { id: 11, categoryId: 3, name: '잉글리시 브렉퍼스트', price: 9000, description: '베이컨, 소시지, 계란후라이 플레이트', imageUrl: '', displayOrder: 5, storeId: 1 },
  { id: 12, categoryId: 4, name: '말차 초코빵', price: 3500, description: '진한 말차 크림이 가득한 초코빵', imageUrl: '', displayOrder: 1, storeId: 1 },
  { id: 13, categoryId: 4, name: '딸기 토스트', price: 5500, description: '생크림과 딸기잼의 달콤한 토스트', imageUrl: '', displayOrder: 2, storeId: 1 },
  { id: 14, categoryId: 4, name: '탕후루', price: 4000, description: '달콤 바삭한 과일 탕후루', imageUrl: '', displayOrder: 3, storeId: 1 },
  { id: 15, categoryId: 5, name: '새로', price: 5000, description: '제로슈거 깔끔한 소주 360ml', imageUrl: `${IMG}/soju_saero.jpg`, displayOrder: 1, storeId: 1 },
  { id: 16, categoryId: 5, name: '가로', price: 5000, description: '새로를 가로로! 눕혀서 마시면 더 맛있다?', imageUrl: `${IMG}/soju_garo.jpg`, displayOrder: 2, storeId: 1 },
  { id: 17, categoryId: 5, name: '거꾸로', price: 5000, description: '새로를 거꾸로! 뒤집어진 소주 🙃', imageUrl: `${IMG}/soju_geokuro.jpg`, displayOrder: 3, storeId: 1 },
  { id: 18, categoryId: 5, name: '생맥주', price: 5000, description: '시원한 생맥주 500ml', imageUrl: `${IMG}/beer_glass.jpg`, displayOrder: 4, storeId: 1 },
  { id: 19, categoryId: 5, name: '하이볼', price: 7000, description: '위스키 소다 하이볼', imageUrl: `${IMG}/highball.jpg`, displayOrder: 5, storeId: 1 },
  { id: 20, categoryId: 5, name: '와인', price: 15000, description: '하우스 레드/화이트 와인 한 잔', imageUrl: `${IMG}/wine_glass.jpg`, displayOrder: 6, storeId: 1 },
  { id: 21, categoryId: 5, name: '막걸리', price: 8000, description: '전통 생막걸리 한 병', imageUrl: `${IMG}/makgeolli.jpg`, displayOrder: 7, storeId: 1 },
];

export const mockOrders: Order[] = [];

const icebreakers: GameQuestion[] = [
  { id: 1, type: 'ICEBREAKER', category: 'light', content: '가장 최근에 웃었던 이유는?', optionA: '', optionB: '' },
  { id: 2, type: 'ICEBREAKER', category: 'light', content: '무인도에 하나만 가져간다면?', optionA: '', optionB: '' },
  { id: 3, type: 'ICEBREAKER', category: 'fun', content: '가장 창피했던 순간은?', optionA: '', optionB: '' },
];

const balanceQs: GameQuestion[] = [
  { id: 10, type: 'BALANCE', category: '', content: '연애할 때 더 중요한 것은?', optionA: '외모', optionB: '성격' },
  { id: 11, type: 'BALANCE', category: '', content: '여행 스타일은?', optionA: '계획형', optionB: '즉흥형' },
];

const topics: GameQuestion[] = [
  { id: 20, type: 'TOPIC', category: 'light', content: '요즘 가장 핫한 드라마/영화는?', optionA: '', optionB: '' },
  { id: 21, type: 'TOPIC', category: 'fun', content: '술게임 중 가장 좋아하는 건?', optionA: '', optionB: '' },
];

const truthOrLie: GameQuestion[] = [
  { id: 30, type: 'TRUTH_OR_LIE', category: '', content: '나에 대한 3가지 사실 중 거짓 하나를 찾아보세요', optionA: '', optionB: '' },
];

const penalties = ['원샷!', '옆 사람에게 칭찬 3개 하기', '30초 동안 개인기 보여주기', '가장 최근 찍은 셀카 공개'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

let orderIdSeq = 100;

const ok = <T,>(data: T) => ({ success: true, message: 'ok', data });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteHandler = (params: Record<string, string>, body?: any, query?: Record<string, string>) => any;

const mockRooms = [
  { id: 1, roomNumber: 1, storeId: 1, active: true, label: '💑' },
  { id: 2, roomNumber: 2, storeId: 1, active: true, label: '👫' },
  { id: 3, roomNumber: 3, storeId: 1, active: false, label: '' },
  { id: 4, roomNumber: 4, storeId: 1, active: true, label: '🥳' },
  { id: 5, roomNumber: 5, storeId: 1, active: true, label: '🎉' },
  { id: 6, roomNumber: 6, storeId: 1, active: false, label: '' },
  { id: 7, roomNumber: 7, storeId: 1, active: true, label: '🍻' },
  { id: 8, roomNumber: 8, storeId: 1, active: true, label: '💃' },
];

const routes: [string, string, RouteHandler][] = [
  ['POST', '/auth/room/login', () => ok({ token: 'mock-token', storeId: 1, roomId: 1, storeName: '헌팅포차 강남점 (Mock)' })],
  ['GET', '/stores/:storeId/rooms', () => ok(mockRooms)],
  ['GET', '/stores/:storeId/categories', () => ok(categories)],
  ['GET', '/stores/:storeId/menus', (_p, _b, query) => {
    const catId = query?.categoryId ? Number(query.categoryId) : null;
    return ok(catId ? menus.filter(m => m.categoryId === catId) : menus);
  }],
  ['GET', '/rooms/:roomId/orders', () => ok(mockOrders)],
  ['POST', '/rooms/:roomId/orders', (_p, body) => {
    const id = ++orderIdSeq;
    return ok({ id, orderNumber: `ORD-${id}`, totalAmount: body?.totalAmount ?? 0, status: 'PENDING' });
  }],
  ['GET', '/rooms/:roomId/time', () => ok({ roomId: 1, expiresAt: new Date(Date.now() + 3 * 3600000).toISOString(), remainingMinutes: 180 })],
  ['POST', '/rooms/:roomId/calls', () => ok({ id: 1 })],
  ['POST', '/rooms/:roomId/messages', (params, body) => {
    const senderRoomId = Number(params.roomId);
    const targetRoomId = body?.targetRoomId;
    if (targetRoomId) broadcastToRoom(targetRoomId, { type: 'MESSAGE_RECEIVED', senderRoomId, content: body?.content ?? '' });
    return ok({ id: 1 });
  }],
  ['POST', '/rooms/:roomId/photos', (params, body) => {
    const senderRoomId = Number(params.roomId);
    const targetRoomId = Number(body?.targetRoomId ?? body?.get?.('targetRoomId'));
    if (targetRoomId) broadcastToRoom(targetRoomId, { type: 'PHOTO_RECEIVED', senderRoomId });
    return ok({ id: 1 });
  }],
  ['POST', '/rooms/:roomId/merge-request', (params, body) => {
    const requesterRoomId = Number(params.roomId);
    const targetRoomId = body?.targetRoomId;
    if (targetRoomId) broadcastToRoom(targetRoomId, { type: 'MERGE_REQUEST', requesterRoomId, requestId: 1 });
    return ok({ id: 1, status: 'PENDING' });
  }],
  ['PUT', '/rooms/:roomId/merge-request/:requestId/respond', () => ok({ status: 'ACCEPTED' })],
  ['PUT', '/rooms/:roomId/send-menu/:requestId/respond', () => ok({ status: 'ACCEPTED' })],
  ['GET', '/games/icebreaker', () => ok(pick(icebreakers))],
  ['GET', '/games/balance', () => ok(pick(balanceQs))],
  ['GET', '/games/truth-or-lie', () => ok(pick(truthOrLie))],
  ['GET', '/games/topic', () => ok(pick(topics))],
  ['GET', '/games/roulette', (_p, _b, query) => {
    const count = Number(query?.playerCount ?? 4);
    return ok({ selectedPlayer: Math.ceil(Math.random() * count), penalty: pick(penalties) });
  }],
  ['GET', '/games/ladder', (_p, _b, query) => {
    const count = Number(query?.playerCount ?? 4);
    const results: Record<string, string> = {};
    for (let i = 1; i <= count; i++) results[String(i)] = pick(penalties);
    return ok({ results });
  }],
];

function matchRoute(method: string, url: string): { handler: RouteHandler; params: Record<string, string> } | null {
  for (const [m, pattern, handler] of routes) {
    if (m !== method) continue;
    const patternParts = pattern.split('/');
    const urlParts = url.split('?')[0].split('/');
    if (patternParts.length !== urlParts.length) continue;
    const params: Record<string, string> = {};
    let match = true;
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) { params[patternParts[i].slice(1)] = urlParts[i]; }
      else if (patternParts[i] !== urlParts[i]) { match = false; break; }
    }
    if (match) return { handler, params };
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
  console.log('%c[MOCK MODE] 백엔드 없이 mock 데이터로 동작합니다', 'color: orange; font-weight: bold;');

  // adapter를 교체해서 네트워크 요청 자체를 가로챔
  const originalAdapter = instance.defaults.adapter;
  instance.defaults.adapter = (config: InternalAxiosRequestConfig) => {
    const url = config.url ?? '';
    const method = (config.method ?? 'GET').toUpperCase();
    const matched = matchRoute(method, url);

    if (matched) {
      const query = parseQuery(url);
      let body = config.data;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch { /* keep as-is */ } }
      const data = matched.handler(matched.params, body, query);
      return Promise.resolve({ data, status: 200, statusText: 'OK', headers: {}, config });
    }

    // 매칭 안 되는 요청은 원래 adapter로 (또는 빈 성공 응답)
    if (originalAdapter && typeof originalAdapter === 'function') {
      return originalAdapter(config);
    }
    return Promise.resolve({ data: { success: true, data: null }, status: 200, statusText: 'OK', headers: {}, config });
  };
}
