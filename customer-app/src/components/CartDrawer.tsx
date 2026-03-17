import { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import { MdShoppingCart, MdCheckCircle, MdDelete } from 'react-icons/md';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, clear, total } = useCartStore();
  const roomId = useAuthStore((s) => s.roomId);
  const [ordered, setOrdered] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleOrder = async () => {
    if (!items.length) return;
    try {
      const { data } = await api.post(`/rooms/${roomId}/orders`, {
        items: items.map((i) => ({ menuId: i.menu.id, menuName: i.menu.name, quantity: i.quantity, unitPrice: i.menu.price })),
        totalAmount: total(),
      });
      setOrdered(data.data.id);
      clear();
      toast.success('주문 완료!');
      setTimeout(() => { setOrdered(null); onClose(); }, 5000);
    } catch {
      toast.error('주문 실패. 다시 시도해주세요.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={onClose}>
      <div className="bg-white w-80 h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-ink"><MdShoppingCart className="inline" /> 장바구니</h2>
          <button data-testid="cart-close-button" onClick={onClose} className="text-2xl text-gray-400">✕</button>
        </div>
        {ordered ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-4xl mb-4 text-pink-500"><MdCheckCircle className="inline" /></div>
            <div className="text-xl font-bold text-ink">주문 완료!</div>
            <div className="text-gray-400 mt-2">주문번호: #{ordered}</div>
            <div className="text-sm text-gray-300 mt-1">5초 후 자동으로 닫힙니다</div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 && <p className="text-center text-gray-400 mt-8">장바구니가 비어있습니다</p>}
              {items.map((item) => (
                <div key={item.menu.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-ink">{item.menu.name}</div>
                    <div className="text-pink-500 text-sm font-bold">{(item.menu.price * item.quantity).toLocaleString()}원</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button data-testid={`qty-minus-${item.menu.id}`} onClick={() => updateQuantity(item.menu.id, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded-full text-ink">−</button>
                    <span className="w-6 text-center text-ink">{item.quantity}</span>
                    <button data-testid={`qty-plus-${item.menu.id}`} onClick={() => updateQuantity(item.menu.id, item.quantity + 1)} className="w-8 h-8 bg-gray-200 rounded-full text-ink">+</button>
                    <button data-testid={`remove-item-${item.menu.id}`} onClick={() => removeItem(item.menu.id)} className="text-red-400 ml-1"><MdDelete /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex justify-between mb-3 text-lg font-bold">
                <span className="text-ink">총 금액</span><span className="text-pink-500">{total().toLocaleString()}원</span>
              </div>
              <button data-testid="cart-order-button" onClick={handleOrder} disabled={!items.length}
                className="w-full py-3 bg-ink text-white rounded-2xl text-lg font-bold disabled:opacity-50 hover:bg-ink/90 transition-colors">주문하기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
