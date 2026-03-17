import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../../stores/cartStore';
import type { Menu } from '../../types';

const menu: Menu = { id: 1, name: '맥주', price: 5000, description: '', imageUrl: '', categoryId: 1, storeId: 1, displayOrder: 1 };

describe('cartStore', () => {
  beforeEach(() => useCartStore.setState({ items: [] }));

  it('adds item', () => {
    useCartStore.getState().addItem(menu);
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('increments quantity for duplicate', () => {
    useCartStore.getState().addItem(menu);
    useCartStore.getState().addItem(menu);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it('removes item', () => {
    useCartStore.getState().addItem(menu);
    useCartStore.getState().removeItem(1);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('updates quantity', () => {
    useCartStore.getState().addItem(menu);
    useCartStore.getState().updateQuantity(1, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('removes item when quantity < 1', () => {
    useCartStore.getState().addItem(menu);
    useCartStore.getState().updateQuantity(1, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('caps quantity at 99', () => {
    useCartStore.getState().addItem(menu);
    useCartStore.getState().updateQuantity(1, 150);
    expect(useCartStore.getState().items[0].quantity).toBe(99);
  });

  it('calculates total', () => {
    useCartStore.getState().addItem(menu);
    useCartStore.getState().updateQuantity(1, 3);
    expect(useCartStore.getState().total()).toBe(15000);
  });

  it('clears all items', () => {
    useCartStore.getState().addItem(menu);
    useCartStore.getState().clear();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
