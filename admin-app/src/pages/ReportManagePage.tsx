import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

interface Report { id: number; reporterRoomId: number; targetType: string; targetId: number; storeId: number; reason: string; handled: boolean; createdAt: string; }

export default function ReportManagePage() {
  const storeId = useAuthStore((s) => s.storeId);
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = () => api.get('/admin/reports', { params: { storeId } }).then((r) => setReports(r.data.data)).catch(() => {});
  useEffect(fetchReports, [storeId]);

  const resolve = async (id: number) => {
    try { await api.put(`/admin/reports/${id}/resolve`); fetchReports(); toast.success('처리 완료'); }
    catch { toast.error('처리 실패'); }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">🚨 신고 관리</h1>
      <table className="w-full bg-white rounded-xl shadow-sm">
        <thead><tr className="border-b text-left text-sm text-gray-500"><th className="p-3">신고자</th><th className="p-3">대상</th><th className="p-3">유형</th><th className="p-3">사유</th><th className="p-3">상태</th><th className="p-3">액션</th></tr></thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} data-testid={`report-row-${r.id}`} className="border-b">
              <td className="p-3">Room {r.reporterRoomId}</td>
              <td className="p-3">Room {r.targetId}</td>
              <td className="p-3 text-sm">{r.targetType}</td>
              <td className="p-3 text-sm text-gray-500">{r.reason}</td>
              <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${r.handled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.handled ? '처리완료' : '미처리'}</span></td>
              <td className="p-3">
                {!r.handled && <button data-testid={`report-resolve-${r.id}`} onClick={() => resolve(r.id)} className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">처리</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reports.length === 0 && <p className="text-center text-gray-400 mt-8">신고 내역 없음</p>}
    </div>
  );
}
