import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import type { Menu, Category } from '../types';

export default function MenuManagePage() {
  const storeId = useAuthStore((s) => s.storeId);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Menu> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetch = () => {
    api.get(`/stores/${storeId}/menus`).then((r) => setMenus(r.data.data));
    api.get(`/stores/${storeId}/categories`).then((r) => setCategories(r.data.data));
  };
  useEffect(fetch, [storeId]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const fd = new FormData();
    fd.append('name', editing.name ?? '');
    fd.append('price', String(editing.price ?? 0));
    fd.append('description', editing.description ?? '');
    fd.append('categoryId', String(editing.categoryId ?? ''));
    fd.append('storeId', String(storeId));
    if (imageFile) fd.append('image', imageFile);
    try {
      if (editing.id) await api.put(`/admin/menus/${editing.id}`, fd);
      else await api.post('/admin/menus', fd);
      fetch(); setEditing(null); setImageFile(null); toast.success('저장!');
    } catch { toast.error('저장 실패'); }
  };

  const remove = async (id: number) => {
    if (!confirm('메뉴를 삭제하시겠습니까?')) return;
    try { await api.delete(`/admin/menus/${id}`); fetch(); toast.success('삭제!'); }
    catch { toast.error('삭제 실패'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🍽️ 메뉴 관리</h1>
        <button data-testid="menu-add-button" onClick={() => setEditing({ name: '', price: 0, description: '', categoryId: categories[0]?.id })} className="px-4 py-2 bg-blue-600 text-white rounded-lg">메뉴 추가</button>
      </div>
      <table className="w-full bg-white rounded-xl shadow-sm">
        <thead><tr className="border-b text-left text-sm text-gray-500"><th className="p-3">메뉴명</th><th className="p-3">가격</th><th className="p-3">카테고리</th><th className="p-3">액션</th></tr></thead>
        <tbody>
          {menus.map((m) => (
            <tr key={m.id} data-testid={`menu-row-${m.id}`} className="border-b">
              <td className="p-3 font-medium">{m.name}</td>
              <td className="p-3">{m.price.toLocaleString()}원</td>
              <td className="p-3 text-sm text-gray-500">{categories.find((c) => c.id === m.categoryId)?.name}</td>
              <td className="p-3 space-x-2">
                <button data-testid={`menu-edit-${m.id}`} onClick={() => setEditing(m)} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">수정</button>
                <button data-testid={`menu-delete-${m.id}`} onClick={() => remove(m.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditing(null)}>
          <form onSubmit={save} className="bg-white rounded-xl p-6 w-96 space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">{editing.id ? '메뉴 수정' : '메뉴 추가'}</h3>
            <input data-testid="menu-name-input" value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="메뉴명" className="w-full p-2 border rounded-lg" required />
            <input data-testid="menu-price-input" type="number" value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} placeholder="가격" className="w-full p-2 border rounded-lg" required />
            <textarea data-testid="menu-desc-input" value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="설명" className="w-full p-2 border rounded-lg h-20 resize-none" />
            <select data-testid="menu-category-select" value={editing.categoryId ?? ''} onChange={(e) => setEditing({ ...editing, categoryId: Number(e.target.value) })} className="w-full p-2 border rounded-lg">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input data-testid="menu-image-input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="w-full" />
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
