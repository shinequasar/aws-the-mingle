import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

const reasons = ['물', '잔', '휴지', '젓가락', '숟가락', '에어컨', '앞접시'];

export default function CallButton() {
  const roomId = useAuthStore((s) => s.roomId);
  const [open, setOpen] = useState(false);

  const handleCall = async (reason: string) => {
    try {
      await api.post(`/rooms/${roomId}/calls`, { reason });
      toast.success('직원을 호출했습니다!');
    } catch { toast.error('호출 실패'); }
    setOpen(false);
  };

  return (
    <>
      <button data-testid="call-button" onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-red-500 text-white rounded-full shadow-lg text-xl z-40">🔔</button>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setOpen(false)}>
          <div className="bg-white w-full rounded-t-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">직원 호출</h3>
            <div className="grid grid-cols-3 gap-2">
              {reasons.map((r) => (
                <button key={r} data-testid={`call-reason-${r}`} onClick={() => handleCall(r)}
                  className="py-3 bg-gray-100 rounded-xl text-sm font-medium">{r}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
