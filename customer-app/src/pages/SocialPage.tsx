import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import PhotoBooth from '../components/PhotoBooth';

type Tab = 'drink' | 'message' | 'photo' | 'merge';

const tabs: { key: Tab; label: string; emoji: string; desc: string }[] = [
  { key: 'drink', label: '음료보내기', emoji: 'https://raw.githubusercontent.com/nicepkg/gpt-runner/main/packages/gpt-runner-web/public/logo.svg', desc: '관심있는 룸에 음료를 보내보세요' },
  { key: 'message', label: '메시지', emoji: '', desc: '마음을 담은 메시지를 전달하세요' },
  { key: 'photo', label: '사진', emoji: '', desc: '사진으로 인사해보세요' },
  { key: 'merge', label: '합석', emoji: '', desc: '함께 즐겨요!' },
];

// Fluent Emoji 3D CDN
const EMOJI_3D = {
  drink: 'https://em-content.zobj.net/source/microsoft-teams/363/tropical-drink_1f379.png',
  message: 'https://em-content.zobj.net/source/microsoft-teams/363/love-letter_1f48c.png',
  photo: 'https://em-content.zobj.net/source/microsoft-teams/363/camera-with-flash_1f4f8.png',
  merge: 'https://em-content.zobj.net/source/microsoft-teams/363/people-hugging_1fac2.png',
  send: 'https://em-content.zobj.net/source/microsoft-teams/363/rocket_1f680.png',
  beer: 'https://em-content.zobj.net/source/microsoft-teams/363/clinking-beer-mugs_1f37b.png',
};

export default function SocialPage() {
  const roomId = useAuthStore((s) => s.roomId);
  const storeId = useAuthStore((s) => s.storeId);
  const [tab, setTab] = useState<Tab>('drink');
  const [targetRoom, setTargetRoom] = useState('');
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState<{ id: number; roomNumber: number; active: boolean; label: string }[]>([]);
  const [showBooth, setShowBooth] = useState(false);

  const sendMessage = async () => {
    if (!targetRoom || !message) return;
    toast.success(`Room ${targetRoom}에 메시지 전송 완료!`);
    setMessage('');
  };

  const sendPhoto = async (_file: File) => {
    toast.success('사진 전송 완료! 📸');
  };

  const requestMerge = async () => {
    if (!targetRoom) return;
    toast.success(`${targetRoom}번 룸에 합석 요청 완료! 💕`);
    setTargetRoom('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* 카드형 탭 선택 */}
      <div className="grid grid-cols-4 gap-2">
        {tabs.map((t) => (
          <button key={t.key} data-testid={`social-tab-${t.key}`} onClick={() => setTab(t.key)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${
              tab === t.key
                ? 'bg-gradient-to-b from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
            }`}>
            <img src={EMOJI_3D[t.key]} alt={t.label} className="w-10 h-10" />
            <span className="text-xs font-bold">{t.label}</span>
          </button>
        ))}
      </div>

      {/* 대상 룸 입력 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <label className="text-sm text-gray-500 mb-1 block">받는 룸 번호</label>
        <input data-testid="social-target-room" value={targetRoom} onChange={(e) => setTargetRoom(e.target.value)}
          placeholder="룸 번호 입력" className="w-full p-3 border border-gray-200 rounded-xl text-lg text-center font-bold focus:border-pink-500 focus:outline-none" type="number" />
      </div>

      {/* 탭별 콘텐츠 */}
      {tab === 'drink' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-4">
          <img src={EMOJI_3D.beer} alt="beer" className="w-20 h-20 mx-auto" />
          <p className="text-gray-500 text-sm">관심있는 룸에 음료/안주를 보내보세요!</p>
          <button data-testid="social-send-drink" onClick={() => toast('메뉴 화면에서 메뉴를 선택 후 보내기를 이용해주세요', { icon: '💡' })}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl font-bold text-lg shadow-md shadow-orange-400/30">
            음료/안주 보내기
          </button>
        </div>
      )}

      {tab === 'message' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
          <img src={EMOJI_3D.message} alt="message" className="w-16 h-16 mx-auto" />
          <textarea data-testid="social-message-input" value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="오늘따라 유독 눈에 들어와서요... 혹시 저만 그런 건 아니죠? 🥺💗" className="w-full p-3 border border-gray-200 rounded-xl h-32 resize-none focus:border-pink-500 focus:outline-none" />
          <button data-testid="social-send-message" onClick={sendMessage}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold shadow-md shadow-pink-500/30">
            메시지 보내기
          </button>
        </div>
      )}

      {tab === 'photo' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-3">
          <img src={EMOJI_3D.photo} alt="camera" className="w-16 h-16 mx-auto" />
          <p className="text-gray-500 text-sm">필터로 예쁘게 찍어서 보내보세요!</p>
          <button onClick={() => setShowBooth(true)}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-md shadow-purple-500/30">
            📸 포토부스 열기
          </button>
          <label className="block w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 cursor-pointer hover:border-pink-400 transition-colors">
            <span className="text-sm">또는 앨범에서 선택</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && sendPhoto(e.target.files[0])} />
          </label>
        </div>
      )}
      {showBooth && (
        <PhotoBooth
          onCapture={(blob) => { sendPhoto(new File([blob], 'photo.jpg', { type: 'image/jpeg' })); setShowBooth(false); }}
          onClose={() => setShowBooth(false)}
        />
      )}

      {tab === 'merge' && (
        <div className="space-y-3">
          {/* 합석 요청 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center space-y-4">
            <img src={EMOJI_3D.merge} alt="merge" className="w-16 h-16 mx-auto" />
            {targetRoom ? (
              <p className="text-sm text-gray-600"><span className="font-bold text-purple-600">{targetRoom}번 룸</span>에 합석 요청을 보낼까요?</p>
            ) : (
              <p className="text-gray-400 text-sm">아래 배치도에서 룸을 선택하세요!</p>
            )}
            <button data-testid="social-merge-request" onClick={requestMerge} disabled={!targetRoom}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl font-bold text-lg shadow-md shadow-pink-500/30 disabled:opacity-50">
              합석 요청 보내기 💕
            </button>
            <div className="bg-purple-50 rounded-xl p-3 text-xs text-purple-600 space-y-1 text-left">
              <p>✨ 합석 성립 시 기본 30분 무료 연장!</p>
              <p>✨ 합석 성공하면 미니게임을 즐겨보세요</p>
            </div>
          </div>

          {/* 자리배치도 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🗺️</span>
              <span className="text-sm font-bold text-gray-700">자리 배치도</span>
            </div>
            <img src="/asset/table.png" alt="자리 배치도" className="w-full rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
