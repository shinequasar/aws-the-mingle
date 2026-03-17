import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import type { Category, Menu } from '../types';

export default function MenuPage() {
  const storeId = useAuthStore((s) => s.storeId);
  const addItem = useCartStore((s) => s.addItem);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [detail, setDetail] = useState<Menu | null>(null);

  useEffect(() => {
    api.get(`/stores/${storeId}/categories`).then((r) => {
      setCategories(r.data.data);
      if (r.data.data.length) setSelectedCat(r.data.data[0].id);
    });
  }, [storeId]);

  useEffect(() => {
    if (!selectedCat) return;
    api.get(`/stores/${storeId}/menus`, { params: { categoryId: selectedCat } }).then((r) => setMenus(r.data.data));
  }, [storeId, selectedCat]);

  const handleAdd = (menu: Menu) => { addItem(menu); toast.success(`${menu.name} 담김!`); };

  return (
    <div className="flex h-full">
      {/* 카테고리 사이드바 */}
      <aside className="w-24 bg-white border-r overflow-y-auto shrink-0">
        {categories.map((c) => (
          <button key={c.id} data-testid={`category-${c.id}`} onClick={() => setSelectedCat(c.id)}
            className={`w-full py-4 text-center text-sm border-b ${selectedCat === c.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600'}`}>
            {c.name}
          </button>
        ))}
      </aside>
      {/* 메뉴 그리드 */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {menus.map((m) => (
            <div key={m.id} data-testid={`menu-card-${m.id}`} className="bg-white rounded-xl shadow-sm overflow-hidden" onClick={() => setDetail(m)}>
              {m.imageUrl && <img src={m.imageUrl} alt={m.name} className="w-full h-32 object-cover" loading="lazy" />}
              <div className="p-3">
                <div className="font-medium text-sm">{m.name}</div>
                <div className="text-blue-600 font-bold">{m.price.toLocaleString()}원</div>
                <button data-testid={`add-to-cart-${m.id}`} onClick={(e) => { e.stopPropagation(); handleAdd(m); }}
                  className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg text-sm">담기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 상세 모달 */}
      {detail && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setDetail(null)}>
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {detail.imageUrl && <img src={detail.imageUrl} alt={detail.name} className="w-full h-48 object-cover rounded-xl mb-4" />}
            <h2 className="text-xl font-bold">{detail.name}</h2>
            <p className="text-gray-500 mt-1">{detail.description}</p>
            <p className="text-2xl font-bold text-blue-600 mt-3">{detail.price.toLocaleString()}원</p>
            <button data-testid="detail-add-to-cart" onClick={() => { handleAdd(detail); setDetail(null); }}
              className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-bold">장바구니에 담기</button>
          </div>
        </div>
      )}
    </div>
  );
}
