import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
import type { WsNotification } from '../types';

let client: Client | null = null;

export function connectWs() {
  const { roomId } = useAuthStore.getState();
  if (!roomId || client?.active) return;

  try {
    client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        client!.subscribe(`/topic/room/${roomId}/notifications`, (msg) => {
          const notification: WsNotification = JSON.parse(msg.body);
          useNotificationStore.getState().add(notification);
        });
      },
      onStompError: () => { console.warn('[WS] STOMP 연결 실패 - 백엔드가 꺼져있을 수 있습니다'); },
    });
    client.activate();
  } catch {
    console.warn('[WS] WebSocket 연결 실패');
  }
}

export function disconnectWs() {
  client?.deactivate();
  client = null;
}
