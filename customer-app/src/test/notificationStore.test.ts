import { describe, it, expect, beforeEach } from 'vitest';
import { useNotificationStore } from '../../stores/notificationStore';

describe('notificationStore', () => {
  beforeEach(() => useNotificationStore.setState({ notifications: [] }));

  it('adds notification', () => {
    useNotificationStore.getState().add({ type: 'TEST' });
    expect(useNotificationStore.getState().notifications).toHaveLength(1);
  });

  it('removes notification by index', () => {
    useNotificationStore.getState().add({ type: 'A' });
    useNotificationStore.getState().add({ type: 'B' });
    useNotificationStore.getState().remove(0);
    expect(useNotificationStore.getState().notifications).toHaveLength(1);
    expect(useNotificationStore.getState().notifications[0].type).toBe('B');
  });

  it('clears all', () => {
    useNotificationStore.getState().add({ type: 'A' });
    useNotificationStore.getState().clear();
    expect(useNotificationStore.getState().notifications).toHaveLength(0);
  });
});
