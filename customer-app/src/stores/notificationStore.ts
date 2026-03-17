import { create } from 'zustand';
import type { WsNotification } from '../types';

interface NotificationState {
  notifications: WsNotification[];
  add: (n: WsNotification) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  add: (n) => set((s) => ({ notifications: [...s.notifications, n] })),
  remove: (index) => set((s) => ({ notifications: s.notifications.filter((_, i) => i !== index) })),
  clear: () => set({ notifications: [] }),
}));
