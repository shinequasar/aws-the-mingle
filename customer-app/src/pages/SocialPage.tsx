import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import { MdLocalBar, MdChat, MdCameraAlt, MdLightbulb } from 'react-icons/md';

type Tab = 'drink' | 'message' | 'photo';

export default function SocialPage() {
  const roomId = useAuthStore((s) => s.roomId);
  const storeId = useAuthStore((s) => s.storeId);
  const [tab, setTab] = useState<Tab>('drink');
  const [targetRoom, setTargetRoom] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!targetRoom || !message) return;
    try {
      await api.post(`/rooms/${roomId}/messages`, { targetRoomId: Number(targetRoom), content: message });
      toast.success('메시지 전송!');
      setMessage('');
    } catch { toast.error('전송 실패'); }
  };

  const sendPhoto = async (file: File) => {
    if (!targetRoom) { toast.error('룸 번호를 입력하세요'); return; }
    const fd = new FormData();
    fd.append('photo', file);
    fd.append('targetRoomId', targetRoom);
    try {
      await api.post(`/rooms/${roomId}/photos`, fd);
      toast.success('사진 전송!');
    } catch { toast.error('전송 실패'); }
  };

  const sendDrink = async () => {
    if (!targetRoom) return;
    toast('메뉴 화면에서 메뉴를 선택 후 보내기를 이용해주세요', { icon: <MdLightbulb /> });
  };

  const tabs: { key: Tab; label: string; icon: JSX.Element }[] = [
    { key: 'drink', label: '음료보내기', icon: <MdLocalBar /> },
    { key: 'message', label: '메시지', icon: <MdChat /> },
    { key: 'photo', label: '사진', icon: <MdCameraAlt /> },
  ];

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button key={t.key} data-testid={`social-tab-${t.key}`} onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${tab === t.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <input data-testid="social-target-room" value={targetRoom} onChange={(e) => setTargetRoom(e.target.value)}
        placeholder="받는 룸 번호" className="w-full p-3 border rounded-lg mb-4 text-lg" type="number" />

      {tab === 'message' && (
        <div className="space-y-3">
          <textarea data-testid="social-message-input" value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요" className="w-full p-3 border rounded-lg h-32 resize-none" />
          <button data-testid="social-send-message" onClick={sendMessage} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">보내기</button>
        </div>
      )}
      {tab === 'photo' && (
        <div>
          <label data-testid="social-photo-input" className="block w-full py-8 border-2 border-dashed rounded-xl text-center text-gray-400 cursor-pointer">
            <MdCameraAlt className="inline" /> 사진 촬영 / 선택
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && sendPhoto(e.target.files[0])} />
          </label>
        </div>
      )}
      {tab === 'drink' && (
        <button data-testid="social-send-drink" onClick={sendDrink} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">음료/안주 보내기</button>
      )}
    </div>
  );
}
