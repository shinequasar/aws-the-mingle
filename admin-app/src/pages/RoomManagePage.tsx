import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import type { Room, OrderHistory } from '../types';

export default function RoomManagePage() {
  const storeId = useAuthStore((s) => s.storeId);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [form, setForm] = useState({ roomNumber: '', password: '' });
  const [history, setHistory] = useState<{ roomId: number; data: OrderHistory[] } | null>(null);

  const fetchRooms = () => api.get('/admin/rooms', { params: { storeId } }).then((r) => setRooms(r.data.data)).catch(() => {});
  useEffect(() => { fetchRooms(); }, [storeId]);

  const addRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api.post('/admin/rooms', { ...form, storeId }); fetchRooms(); setForm({ roomNumber: '', password: '' }); toast.success('룸 추가!'); }
    catch { toast.error('추가 실패'); }
  };

  const completeRoom = async (roomId: number) => {
    if (!confirm('이용 완료 처리하시겠습니까? 되돌릴 수 없습니다.')) return;
    try { await api.post(`/admin/rooms/${roomId}/complete`); fetchRooms(); toast.success('이용 완료!'); }
    catch { toast.error('처리 실패'); }
  };

  const viewHistory = async (roomId: number) => {
    try { const { data } = await api.get(`/admin/rooms/${roomId}/history`); setHistory({ roomId, data: data.data }); }
    catch { toast.error('내역 조회 실패'); }
  };

  const deleteOrder = async (orderId: number) => {
    if (!confirm('주문을 삭제하시겠습니까?')) return;
    try { await api.delete(`/admin/orders/${orderId}`); fetchRooms(); toast.success('삭제 완료'); }
    catch { toast.error('삭제 실패'); }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">🚪 룸 관리</h1>
      <form onSubmit={addRoom} className="flex gap-2 mb-6">
        <input data-testid="room-number-input" value={form.roomNumber} onChange={(e) => setForm({ ...form, roomNumber: e.target.value })} placeholder="룸 번호" className="p-2 border rounded-lg" required />
        <input data-testid="room-password-input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="비밀번호" className="p-2 border rounded-lg" required />
        <button data-testid="room-add-button" type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">추가</button>
      </form>
      <table className="w-full bg-white rounded-xl shadow-sm">
        <thead><tr className="border-b text-left text-sm text-gray-500"><th className="p-3">룸번호</th><th className="p-3">상태</th><th className="p-3">액션</th></tr></thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id} data-testid={`room-row-${r.id}`} className="border-b">
              <td className="p-3 font-medium">{r.roomNumber}</td>
              <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${r.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{r.active ? '이용중' : '대기'}</span></td>
              <td className="p-3 space-x-2">
                {r.active && <button data-testid={`room-complete-${r.id}`} onClick={() => completeRoom(r.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm">이용완료</button>}
                <button data-testid={`room-history-${r.id}`} onClick={() => viewHistory(r.id)} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">과거내역</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {history && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setHistory(null)}>
          <div className="bg-white rounded-xl p-6 w-[600px] max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">Room 과거 내역</h3>
            {history.data.length === 0 && <p className="text-gray-400">내역 없음</p>}
            {history.data.map((h) => (
              <div key={h.id} className="border-b py-2 text-sm">
                <div className="flex justify-between"><span>{new Date(h.completedAt).toLocaleString('ko-KR')}</span><span className="font-bold">{h.totalAmount.toLocaleString()}원</span></div>
              </div>
            ))}
            <button onClick={() => setHistory(null)} className="mt-4 w-full py-2 bg-gray-100 rounded-lg">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
