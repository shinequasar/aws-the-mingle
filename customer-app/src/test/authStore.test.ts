import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../stores/authStore';

describe('authStore', () => {
  beforeEach(() => useAuthStore.setState({ token: null, storeId: null, roomId: null, roomNumber: null, storeName: null }));

  it('login sets all fields', () => {
    useAuthStore.getState().login('tok', 1, 2, '3', 'Test Store');
    const s = useAuthStore.getState();
    expect(s.token).toBe('tok');
    expect(s.storeId).toBe(1);
    expect(s.roomId).toBe(2);
    expect(s.roomNumber).toBe('3');
    expect(s.storeName).toBe('Test Store');
  });

  it('logout clears all fields', () => {
    useAuthStore.getState().login('tok', 1, 2, '3', 'Store');
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().token).toBeNull();
  });
});
