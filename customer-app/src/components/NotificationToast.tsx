import { useEffect } from 'react';
import { useNotificationStore } from '../stores/notificationStore';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import { MdLocalBar, MdChat, MdCameraAlt, MdPeople, MdCelebration, MdSentimentDissatisfied, MdReportProblem } from 'react-icons/md';

const typeConfig: Record<string, { icon: JSX.Element; text: string }> = {
  SEND_MENU_REQUEST: { icon: <MdLocalBar />, text: '음료/안주가 도착했어요!' },
  MESSAGE_RECEIVED: { icon: <MdChat />, text: '메시지가 도착했어요!' },
  PHOTO_RECEIVED: { icon: <MdCameraAlt />, text: '사진이 도착했어요!' },
  MERGE_REQUEST: { icon: <MdPeople />, text: '합석 요청이 왔어요!' },
  MERGE_ACCEPTED: { icon: <MdCelebration />, text: '합석이 성립되었어요!' },
  MERGE_REJECTED: { icon: <MdSentimentDissatisfied />, text: '합석이 거절되었어요' },
  REPORT_RECEIVED: { icon: <MdReportProblem />, text: '신고가 접수되었습니다' },
};

export default function NotificationToast() {
  const { notifications, remove } = useNotificationStore();
  const roomId = useAuthStore((s) => s.roomId);

  useEffect(() => {
    if (!notifications.length) return;
    const latest = notifications[notifications.length - 1];
    const config = typeConfig[latest.type];
    const label = config ? config.text : `알림: ${latest.type}`;

    if (latest.type === 'SEND_MENU_REQUEST' || latest.type === 'MERGE_REQUEST') {
      toast((t) => (
        <div className="space-y-2">
          <p className="font-bold text-ink">{config && config.icon} {label}</p>
          <p className="text-sm text-gray-400">Room {String(latest.requesterRoomId ?? latest.senderRoomId)}에서</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-pink-500 text-white rounded-lg text-sm font-medium" onClick={() => {
              const endpoint = latest.type === 'MERGE_REQUEST'
                ? `/rooms/${roomId}/merge-request/${latest.requestId}/respond`
                : `/rooms/${roomId}/send-menu/${latest.requestId}/respond`;
              api.put(endpoint, { accept: true }).then(() => toast.success('수락!')).catch(() => toast.error('실패'));
              toast.dismiss(t.id);
            }}>수락</button>
            <button className="px-3 py-1 bg-gray-200 text-ink rounded-lg text-sm font-medium" onClick={() => {
              const endpoint = latest.type === 'MERGE_REQUEST'
                ? `/rooms/${roomId}/merge-request/${latest.requestId}/respond`
                : `/rooms/${roomId}/send-menu/${latest.requestId}/respond`;
              api.put(endpoint, { accept: false }).then(() => toast('거절했습니다')).catch(() => toast.error('실패'));
              toast.dismiss(t.id);
            }}>거절</button>
          </div>
        </div>
      ), { duration: 10000 });
    } else {
      toast(label, { duration: 3000, icon: config?.icon });
    }
    remove(notifications.length - 1);
  }, [notifications.length]);

  return null;
}
