import { useEffect, useRef } from 'react';
import { useAuthStore } from '../stores/authStore';

export function useSSE(path: string, onMessage: (data: unknown) => void) {
  const token = useAuthStore((s) => s.token);
  const ref = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!token) return;
    const url = `/api${path}${path.includes('?') ? '&' : '?'}token=${token}`;
    const connect = () => {
      const es = new EventSource(url);
      es.onmessage = (e) => { try { onMessage(JSON.parse(e.data)); } catch {} };
      es.onerror = () => { es.close(); setTimeout(connect, 3000); };
      ref.current = es;
    };
    connect();
    return () => { ref.current?.close(); };
  }, [path, token]);
}
