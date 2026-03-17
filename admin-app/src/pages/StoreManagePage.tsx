import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

interface Store { id: number; name: string; storeCode: string; address: string; phone: string; }

export default function StoreManagePage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [editing, setEditing] = useState<Partial<Store & { storeCode: string }> | null>(null);

  const fetchStores = () => api.get('/admin/stores').then((r) => setStores(r.data.data)).catch(() => {});
  useEffect(fetchStores, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      if (editing.id) await api.put(`/admin/stores/${editing.id}`, editing);
      else await api.post('/admin/stores', editing);
      fetchStores(); setEditing(null); toast.success('저장!');
    } catch { toast.error('저장 실패'); }
  };

  const remove = async (id: number) => {
    if (!confirm('매장을 삭제하시겠습니까?')) return;
    try { await api.delete(`/admin/stores/${id}`); fetchStores(); toast.success('삭제!'); } catch { toast.error('삭제 실패'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🏪 매장 관리</h1>
        <button data-testid="store-add-button" onClick={() => setEditing({ name: '', storeCode: '', address: '' })} className="px-4 py-2 bg-blue-600 text-white rounded-lg">매장 추가</button>
      </div>
      <table className="w-full bg-white rounded-xl shadow-sm">
        <thead><tr className="border-b text-left text-sm text-gray-500"><th className="p-3">매장명</th><th className="p-3">코드</th><th className="p-3">주소</th><th className="p-3">액션</th></tr></thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id} data-testid={`store-row-${s.id}`} className="border-b">
              <td className="p-3 font-medium">{s.name}</td><td className="p-3 text-sm">{s.storeCode}</td><td className="p-3 text-sm text-gray-500">{s.address}</td>
              <td className="p-3 space-x-2">
                <button data-testid={`store-edit-${s.id}`} onClick={() => setEditing(s)} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">수정</button>
                <button data-testid={`store-delete-${s.id}`} onClick={() => remove(s.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditing(null)}>
          <form onSubmit={save} className="bg-white rounded-xl p-6 w-96 space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">{editing.id ? '매장 수정' : '매장 추가'}</h3>
            <input data-testid="store-name-input" value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="매장명" className="w-full p-2 border rounded-lg" required />
            <input data-testid="store-code-input" value={editing.storeCode ?? ''} onChange={(e) => setEditing({ ...editing, storeCode: e.target.value })} placeholder="매장 코드" className="w-full p-2 border rounded-lg" required />
            <input data-testid="store-address-input" value={editing.address ?? ''} onChange={(e) => setEditing({ ...editing, address: e.target.value })} placeholder="주소" className="w-full p-2 border rounded-lg" />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold">저장</button>
              <button type="button" onClick={() => setEditing(null)} className="flex-1 py-2 bg-gray-100 rounded-lg">취소</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
