import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../stores/authStore';

describe('admin authStore', () => {
  beforeEach(() => useAuthStore.setState({ token: null, storeId: null, storeName: null }));

  it('login sets fields', () => {
    useAuthStore.getState().login('tok', 1, 'Test Store');
    const s = useAuthStore.getState();
    expect(s.token).toBe('tok');
    expect(s.storeId).toBe(1);
    expect(s.storeName).toBe('Test Store');
  });

  it('logout clears fields', () => {
    useAuthStore.getState().login('tok', 1, 'Store');
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().storeId).toBeNull();
  });
});
