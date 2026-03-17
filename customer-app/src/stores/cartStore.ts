import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Menu } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (menu: Menu) => void;
  removeItem: (menuId: number) => void;
  updateQuantity: (menuId: number, qty: number) => void;
  clear: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (menu) => set((s) => {
        const existing = s.items.find((i) => i.menu.id === menu.id);
        if (existing) return { items: s.items.map((i) => i.menu.id === menu.id ? { ...i, quantity: i.quantity + 1 } : i) };
        return { items: [...s.items, { menu, quantity: 1 }] };
      }),
      removeItem: (menuId) => set((s) => ({ items: s.items.filter((i) => i.menu.id !== menuId) })),
      updateQuantity: (menuId, qty) => set((s) => ({
        items: qty < 1 ? s.items.filter((i) => i.menu.id !== menuId) : s.items.map((i) => i.menu.id === menuId ? { ...i, quantity: Math.min(qty, 99) } : i),
      })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.menu.price * i.quantity, 0),
    }),
    { name: 'cart-storage' },
  ),
);
