import { useState } from 'react';
import toast from 'react-hot-toast';

interface Call { id: number; roomId: number; reason: string; handled: boolean; createdAt: string; }

const initialCalls: Call[] = [
  { id: 1, roomId: 1, reason: '물', handled: false, createdAt: new Date().toISOString() },
  { id: 2, roomId: 2, reason: '잔', handled: false, createdAt: new Date().toISOString() },
  { id: 3, roomId: 3, reason: '앞접시', handled: true, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: 4, roomId: 5, reason: '휴지', handled: false, createdAt: new Date().toISOString() },
  { id: 5, roomId: 1, reason: '젓가락', handled: false, createdAt: new Date().toISOString() },
  { id: 6, roomId: 4, reason: '에어컨', handled: false, createdAt: new Date().toISOString() },
];

export default function CallManagePage() {
  const [calls, setCalls] = useState<Call[]>(initialCalls);

  const complete = (id: number) => {
    setCalls((prev) => prev.map((c) => c.id === id ? { ...c, handled: true } : c));
    toast.success('처리 완료');
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
              <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${c.handled ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.handled ? '완료' : '대기'}</span></td>
              <td className="p-3">
                {!c.handled && <button data-testid={`call-complete-${c.id}`} onClick={() => complete(c.id)} className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">처리완료</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
