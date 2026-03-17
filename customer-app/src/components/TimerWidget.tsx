import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';

export default function TimerWidget() {
  const roomId = useAuthStore((s) => s.roomId);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!roomId) return;
    const fetchTime = () => api.get(`/rooms/${roomId}/time`).then((r) => setRemaining(r.data.data?.remainingMinutes ?? null)).catch(() => {});
    fetchTime();
    const interval = setInterval(fetchTime, 60000);
    return () => clearInterval(interval);
  }, [roomId]);

  if (remaining === null) return null;
  const h = Math.floor(remaining / 60);
  const m = remaining % 60;
  const warn = remaining <= 30;

  return (
    <span data-testid="timer-widget" className={`text-sm font-mono font-bold ${warn ? 'text-red-500' : 'text-gray-600'}`}>
      ⏱ {h}:{m.toString().padStart(2, '0')}
    </span>
  );
}
