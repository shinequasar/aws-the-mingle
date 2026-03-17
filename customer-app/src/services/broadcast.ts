import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
import type { WsNotification } from '../types';

const channel = new BroadcastChannel('hunting-pocha');

// 다른 탭에서 보낸 알림 수신
channel.onmessage = (e: MessageEvent<{ targetRoomId: number; notification: WsNotification }>) => {
  const myRoomId = useAuthStore.getState().roomId;
  if (myRoomId && e.data.targetRoomId === myRoomId) {
    useNotificationStore.getState().add(e.data.notification);
  }
};

/** 상대 탭(룸)에 알림 전송 */
export function broadcastToRoom(targetRoomId: number, notification: WsNotification) {
  channel.postMessage({ targetRoomId, notification });
}
