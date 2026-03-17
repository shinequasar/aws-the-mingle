import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import type { Order } from '../types';

const statusLabel: Record<string, { text: string; color: string }> = {
  PENDING: { text: '대기중', color: 'bg-yellow-500 text-ink' },
  PREPARING: { text: '준비중', color: 'bg-pink-500 text-white' },
  COMPLETED: { text: '완료', color: 'bg-ink text-white' },
};

export default function OrderPage() {
  const roomId = useAuthStore((s) => s.roomId);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get(`/rooms/${roomId}/orders`).then((r) => setOrders(r.data.data));
  }, [roomId]);

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-bold text-ink">📋 주문 내역</h2>
      {orders.length === 0 && <p className="text-center text-gray-400 mt-8">주문 내역이 없습니다</p>}
      {orders.map((o) => (
        <div key={o.id} data-testid={`order-card-${o.id}`} className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-ink">#{o.id}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusLabel[o.status]?.color ?? 'bg-gray-100'}`}>
              {statusLabel[o.status]?.text ?? o.status}
            </span>
          </div>
          <div className="text-xs text-gray-400 mb-2">{new Date(o.createdAt).toLocaleString('ko-KR')}</div>
          {o.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm text-gray-500">
              <span>{item.menuName} x{item.quantity}</span>
              <span>{(item.unitPrice * item.quantity).toLocaleString()}원</span>
            </div>
          ))}
          <div className="flex justify-end mt-2 font-bold text-pink-500">{o.totalAmount.toLocaleString()}원</div>
        </div>
      ))}
    </div>
  );
}
