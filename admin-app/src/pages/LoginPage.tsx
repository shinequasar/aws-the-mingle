import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [storeCode, setStoreCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/admin/login', { storeCode, username, password });
      login(data.data.token, data.data.storeId, data.data.storeName);
      navigate('/', { replace: true });
    } catch { toast.error('로그인 실패'); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">🍻 관리자 로그인</h1>
        <input data-testid="admin-login-store" value={storeCode} onChange={(e) => setStoreCode(e.target.value)} placeholder="매장 코드" className="w-full p-3 border rounded-lg" required />
        <input data-testid="admin-login-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="사용자명" className="w-full p-3 border rounded-lg" required />
        <input data-testid="admin-login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" className="w-full p-3 border rounded-lg" required />
        <button data-testid="admin-login-submit" type="submit" disabled={loading} className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50">
          {loading ? '로그인 중...' : '로그인'}
        </button>
        <button type="button" onClick={() => { login('bypass-token', 1, '테스트매장'); navigate('/', { replace: true }); }} className="w-full p-2 text-sm text-gray-400 underline">
          테스트 로그인 (바이패스)
        </button>
      </form>
    </div>
  );
}
