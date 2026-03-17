import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import type { Order } from '../types';

const statusLabel: Record<string, { text: string; color: string }> = {
  PENDING: { text: '대기중', color: 'bg-yellow-100 text-yellow-700' },
  PREPARING: { text: '준비중', color: 'bg-blue-100 text-blue-700' },
  COMPLETED: { text: '완료', color: 'bg-green-100 text-green-700' },
};

export default function OrderPage() {
  const roomId = useAuthStore((s) => s.roomId);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get(`/rooms/${roomId}/orders`).then((r) => setOrders(r.data.data));
  }, [roomId]);

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-bold">📋 주문 내역</h2>
      {orders.length === 0 && <p className="text-center text-gray-400 mt-8">주문 내역이 없습니다</p>}
      {orders.map((o) => (
        <div key={o.id} data-testid={`order-card-${o.id}`} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">#{o.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabel[o.status]?.color ?? ''}`}>
              {statusLabel[o.status]?.text ?? o.status}
            </span>
          </div>
          <div className="text-xs text-gray-400 mb-2">{new Date(o.createdAt).toLocaleString('ko-KR')}</div>
          {o.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm text-gray-600">
              <span>{item.menuName} x{item.quantity}</span>
              <span>{(item.unitPrice * item.quantity).toLocaleString()}원</span>
            </div>
          ))}
          <div className="flex justify-end mt-2 font-bold text-blue-600">{o.totalAmount.toLocaleString()}원</div>
        </div>
      ))}
    </div>
  );
}
