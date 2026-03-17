import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import { MdPeople, MdFavorite, MdLightbulb, MdSportsEsports } from 'react-icons/md';

export default function MergePage() {
  const roomId = useAuthStore((s) => s.roomId);
  const [targetRoom, setTargetRoom] = useState('');

  const requestMerge = async () => {
    if (!targetRoom) return;
    try {
      await api.post(`/rooms/${roomId}/merge-request`, { targetRoomId: Number(targetRoom) });
      toast.success('합석 요청을 보냈습니다!');
      setTargetRoom('');
    } catch { toast.error('합석 요청 실패'); }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold"><MdPeople className="inline" /> 합석</h2>
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <p className="text-gray-500 text-sm">합석하고 싶은 룸 번호를 입력하세요</p>
        <input data-testid="merge-target-room" value={targetRoom} onChange={(e) => setTargetRoom(e.target.value)}
          placeholder="룸 번호" type="number" className="w-full p-3 border rounded-lg text-lg" />
        <button data-testid="merge-request-button" onClick={requestMerge} disabled={!targetRoom}
          className="w-full py-3 bg-pink-500 text-white rounded-xl font-bold text-lg disabled:opacity-50">합석 요청 보내기 <MdFavorite className="inline" /></button>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 space-y-1">
        <p><MdLightbulb className="inline text-yellow-500" /> 합석이 성립되면 기본 30분 무료 연장!</p>
        <p><MdLightbulb className="inline text-yellow-500" /> 이후 30분마다 연장 알림 (술 1병 주문 필수)</p>
        <p><MdLightbulb className="inline text-yellow-500" /> 합석 성공 시 미니게임을 즐겨보세요 <MdSportsEsports className="inline" /></p>
      </div>
    </div>
  );
}
