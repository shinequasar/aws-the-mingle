import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { MdDashboard, MdMeetingRoom, MdRestaurantMenu, MdStore, MdNotifications, MdReport, MdLocalBar } from 'react-icons/md';

const navItems = [
  { to: '/', label: '대시보드', icon: <MdDashboard /> },
  { to: '/rooms', label: '룸 관리', icon: <MdMeetingRoom /> },
  { to: '/menus', label: '메뉴 관리', icon: <MdRestaurantMenu /> },
  { to: '/stores', label: '매장 관리', icon: <MdStore /> },
  { to: '/calls', label: '직원 호출', icon: <MdNotifications /> },
  { to: '/reports', label: '신고 관리', icon: <MdReport /> },
];

export default function AdminLayout() {
  const { storeName, logout } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-52 bg-white shadow-sm flex flex-col">
        <div className="p-4 border-b font-bold text-lg"><MdLocalBar className="inline" /> {storeName}</div>
        <nav className="flex-1 py-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) => `flex items-center gap-2 px-4 py-3 text-sm ${isActive ? 'bg-blue-50 text-blue-600 font-bold border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span>{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <button data-testid="admin-logout" onClick={logout} className="p-4 border-t text-sm text-gray-500 hover:text-red-500">로그아웃</button>
      </aside>
      <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
    </div>
  );
}
