import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import SocialPage from './pages/SocialPage';
import GamePage from './pages/GamePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<MenuPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="social" element={<SocialPage />} />
        <Route path="games" element={<GamePage />} />
      </Route>
    </Routes>
  );
}
