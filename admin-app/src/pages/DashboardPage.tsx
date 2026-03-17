import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useSSE } from '../hooks/useSSE';
import api from '../services/api';
import toast from 'react-hot-toast';
import type { Order } from '../types';

interface RoomOrders { roomId: number; roomNumber: string; orders: Order[]; totalAmount: number; }

const statusFlow = ['PENDING', 'PREPARING', 'COMPLETED'];
const statusLabel: Record<string, { text: string; color: string }> = {
  PENDING: { text: '대기중', color: 'bg-yellow-100 text-yellow-700' },
  PREPARING: { text: '준비중', color: 'bg-blue-100 text-blue-700' },
  COMPLETED: { text: '완료', color: 'bg-green-100 text-green-700' },
};

export default function DashboardPage() {
  const storeId = useAuthStore((s) => s.storeId);
  const [rooms, setRooms] = useState<RoomOrders[]>([]);

  const fetchRooms = () => api.get(`/admin/rooms`, { params: { storeId } }).then((r) => setRooms(r.data.data)).catch(() => {});
  useEffect(() => { fetchRooms(); }, [storeId]);
  useSSE(`/admin/sse/orders?storeId=${storeId}`, () => { fetchRooms(); toast('새 주문!', { icon: '🔔' }); });

  const changeStatus = async (orderId: number, current: string) => {
    const idx = statusFlow.indexOf(current);
    if (idx >= statusFlow.length - 1) return;
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: statusFlow[idx + 1] });
      fetchRooms();
    } catch { toast.error('상태 변경 실패'); }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">📊 실시간 주문 모니터링</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <div key={room.roomId} data-testid={`dashboard-room-${room.roomId}`} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg">Room {room.roomNumber}</span>
              <span className="text-blue-600 font-bold">{room.totalAmount.toLocaleString()}원</span>
            </div>
            {room.orders.map((o) => (
              <div key={o.id} className="border-t py-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">#{o.id}</span>
                  <button data-testid={`order-status-${o.id}`} onClick={() => changeStatus(o.id, o.status)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusLabel[o.status]?.color ?? ''}`}>
                    {statusLabel[o.status]?.text ?? o.status} {o.status !== 'COMPLETED' ? '→' : ''}
                  </button>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {o.items.map((i, idx) => <span key={idx}>{i.menuName}x{i.quantity} </span>)}
                </div>
              </div>
            ))}
            {room.orders.length === 0 && <p className="text-sm text-gray-400 text-center py-2">주문 없음</p>}
          </div>
        ))}
      </div>
      {rooms.length === 0 && <p className="text-center text-gray-400 mt-12">활성 룸이 없습니다</p>}
    </div>
  );
}
