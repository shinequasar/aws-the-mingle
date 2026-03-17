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
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold"><MdShoppingCart className="inline" /> 장바구니</h2>
          <button data-testid="cart-close-button" onClick={onClose} className="text-2xl">✕</button>
        </div>
        {ordered ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-4xl mb-4"><MdCheckCircle className="inline" /></div>
            <div className="text-xl font-bold">주문 완료!</div>
            <div className="text-gray-500 mt-2">주문번호: #{ordered}</div>
            <div className="text-sm text-gray-400 mt-1">5초 후 자동으로 닫힙니다</div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 && <p className="text-center text-gray-400 mt-8">장바구니가 비어있습니다</p>}
              {items.map((item) => (
                <div key={item.menu.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.menu.name}</div>
                    <div className="text-blue-600 text-sm">{(item.menu.price * item.quantity).toLocaleString()}원</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button data-testid={`qty-minus-${item.menu.id}`} onClick={() => updateQuantity(item.menu.id, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded-full">−</button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button data-testid={`qty-plus-${item.menu.id}`} onClick={() => updateQuantity(item.menu.id, item.quantity + 1)} className="w-8 h-8 bg-gray-200 rounded-full">+</button>
                    <button data-testid={`remove-item-${item.menu.id}`} onClick={() => removeItem(item.menu.id)} className="text-red-400 ml-1"><MdDelete /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex justify-between mb-3 text-lg font-bold">
                <span>총 금액</span><span className="text-blue-600">{total().toLocaleString()}원</span>
              </div>
              <button data-testid="cart-order-button" onClick={handleOrder} disabled={!items.length}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-bold disabled:opacity-50">주문하기</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
