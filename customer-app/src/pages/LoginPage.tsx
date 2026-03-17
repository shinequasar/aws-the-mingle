import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [storeCode, setStoreCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();

  if (token) { navigate('/', { replace: true }); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/room/login', { storeCode, roomNumber, password });
      login(data.data.token, data.data.storeId, data.data.roomId, roomNumber, data.data.storeName);
      navigate('/', { replace: true });
    } catch {
      toast.error('로그인 실패. 정보를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-80 space-y-4">
        <h1 className="text-2xl font-bold text-center">🍻 룸 헌팅포차</h1>
        <input data-testid="login-store-code" value={storeCode} onChange={(e) => setStoreCode(e.target.value)} placeholder="매장 코드" className="w-full p-3 border rounded-lg text-lg" required />
        <input data-testid="login-room-number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="룸 번호" className="w-full p-3 border rounded-lg text-lg" required />
        <input data-testid="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" className="w-full p-3 border rounded-lg text-lg" required />
        <button data-testid="login-submit-button" type="submit" disabled={loading} className="w-full p-3 bg-blue-600 text-white rounded-lg text-lg font-bold disabled:opacity-50">
          {loading ? '로그인 중...' : '입장하기'}
        </button>
        <button type="button" onClick={() => { login('bypass-token', 1, 1, '1', '테스트매장'); navigate('/', { replace: true }); }} className="w-full p-2 text-sm text-gray-400 underline">
          테스트 입장 (바이패스)
        </button>
      </form>
    </div>
  );
}
