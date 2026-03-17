import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  storeId: number | null;
  roomId: number | null;
  roomNumber: string | null;
  storeName: string | null;
  login: (token: string, storeId: number, roomId: number, roomNumber: string, storeName: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null, storeId: null, roomId: null, roomNumber: null, storeName: null,
      login: (token, storeId, roomId, roomNumber, storeName) => set({ token, storeId, roomId, roomNumber, storeName }),
      logout: () => set({ token: null, storeId: null, roomId: null, roomNumber: null, storeName: null }),
    }),
    { name: 'auth-storage' },
  ),
);
