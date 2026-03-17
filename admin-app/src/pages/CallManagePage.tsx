import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useSSE } from '../hooks/useSSE';
import api from '../services/api';
import toast from 'react-hot-toast';
import type { CallRequest } from '../types';

export default function CallManagePage() {
  const storeId = useAuthStore((s) => s.storeId);
  const [calls, setCalls] = useState<CallRequest[]>([]);

  const fetch = () => api.get('/admin/calls', { params: { storeId } }).then((r) => setCalls(r.data.data)).catch(() => {});
  useEffect(fetch, [storeId]);
  useSSE(`/admin/sse/calls?storeId=${storeId}`, () => { fetch(); toast('새 호출!', { icon: '🔔' }); });

  const complete = async (id: number) => {
    try { await api.put(`/admin/calls/${id}/complete`); fetch(); toast.success('처리 완료'); }
    catch { toast.error('처리 실패'); }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">🔔 직원 호출 관리</h1>
      <table className="w-full bg-white rounded-xl shadow-sm">
        <thead><tr className="border-b text-left text-sm text-gray-500"><th className="p-3">룸</th><th className="p-3">사유</th><th className="p-3">시각</th><th className="p-3">상태</th><th className="p-3">액션</th></tr></thead>
        <tbody>
          {calls.map((c) => (
            <tr key={c.id} data-testid={`call-row-${c.id}`} className="border-b">
              <td className="p-3 font-medium">Room {c.roomId}</td>
              <td className="p-3">{c.reason}</td>
              <td className="p-3 text-sm text-gray-400">{new Date(c.createdAt).toLocaleTimeString('ko-KR')}</td>
              <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${c.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.status === 'COMPLETED' ? '완료' : '대기'}</span></td>
              <td className="p-3">
                {c.status !== 'COMPLETED' && <button data-testid={`call-complete-${c.id}`} onClick={() => complete(c.id)} className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">처리완료</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {calls.length === 0 && <p className="text-center text-gray-400 mt-8">호출 내역 없음</p>}
    </div>
  );
}
