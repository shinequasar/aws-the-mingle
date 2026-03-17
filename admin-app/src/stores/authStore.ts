import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  storeId: number | null;
  storeName: string | null;
  login: (token: string, storeId: number, storeName: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null, storeId: null, storeName: null,
      login: (token, storeId, storeName) => set({ token, storeId, storeName }),
      logout: () => set({ token: null, storeId: null, storeName: null }),
    }),
    { name: 'admin-auth-storage' },
  ),
);
