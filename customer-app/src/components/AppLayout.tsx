import { Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { connectWs, disconnectWs } from '../services/ws';
import TimerWidget from './TimerWidget';
import CallButton from './CallButton';
import CartDrawer from './CartDrawer';
import NotificationToast from './NotificationToast';
import { MdRestaurantMenu, MdReceipt, MdFavorite, MdPeople, MdSportsEsports, MdShoppingCart } from 'react-icons/md';

const navItems = [
  { to: '/', label: '메뉴', icon: <MdRestaurantMenu /> },
  { to: '/orders', label: '주문내역', icon: <MdReceipt /> },
  { to: '/social', label: '소셜', icon: <MdFavorite /> },
  { to: '/merge', label: '합석', icon: <MdPeople /> },
  { to: '/games', label: '게임', icon: <MdSportsEsports /> },
];

export default function AppLayout() {
  const { storeName, roomNumber } = useAuthStore();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => { connectWs(); return () => { disconnectWs(); }; }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        <div className="font-bold text-lg">{storeName} <span className="text-gray-500 text-sm">Room {roomNumber}</span></div>
        <div className="flex items-center gap-3">
          <TimerWidget />
          <button data-testid="cart-open-button" onClick={() => setCartOpen(true)} className="text-2xl"><MdShoppingCart /></button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto"><Outlet /></main>
      <nav className="flex bg-white border-t">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `flex-1 flex flex-col items-center py-2 text-xs ${isActive ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
            <span className="text-lg">{item.icon}</span>{item.label}
          </NavLink>
        ))}
      </nav>
      <CallButton />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />
    </div>
  );
}
