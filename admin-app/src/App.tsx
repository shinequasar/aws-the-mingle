import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RoomManagePage from './pages/RoomManagePage';
import MenuManagePage from './pages/MenuManagePage';
import StoreManagePage from './pages/StoreManagePage';
import CallManagePage from './pages/CallManagePage';
import ReportManagePage from './pages/ReportManagePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return useAuthStore((s) => s.token) ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="rooms" element={<RoomManagePage />} />
        <Route path="menus" element={<MenuManagePage />} />
        <Route path="stores" element={<StoreManagePage />} />
        <Route path="calls" element={<CallManagePage />} />
        <Route path="reports" element={<ReportManagePage />} />
      </Route>
    </Routes>
  );
}
