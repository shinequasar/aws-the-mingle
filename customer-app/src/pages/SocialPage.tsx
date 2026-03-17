import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

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

  useEffect(() => {
    api.get(`/stores/${storeId ?? 1}/rooms`).then(({ data }) => setRooms(data.data ?? [])).catch(() => {});
  }, [storeId]);

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

  const requestMerge = async () => {
    if (!targetRoom) return;
    try {
      await api.post(`/rooms/${roomId}/merge-request`, { targetRoomId: Number(targetRoom) });
      toast.success('합석 요청을 보냈습니다!');
      setTargetRoom('');
    } catch { toast.error('합석 요청 실패'); }
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
            placeholder="마음을 담은 메시지를 적어보세요 💕" className="w-full p-3 border border-gray-200 rounded-xl h-32 resize-none focus:border-pink-500 focus:outline-none" />
          <button data-testid="social-send-message" onClick={sendMessage}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold shadow-md shadow-pink-500/30">
            메시지 보내기
          </button>
        </div>
      )}

      {tab === 'photo' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-3">
          <img src={EMOJI_3D.photo} alt="camera" className="w-16 h-16 mx-auto" />
          <label data-testid="social-photo-input" className="block w-full py-8 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 cursor-pointer hover:border-pink-400 hover:text-pink-400 transition-colors">
            <img src={EMOJI_3D.photo} alt="" className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <span className="text-sm font-medium">사진 촬영 / 선택</span>
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && sendPhoto(e.target.files[0])} />
          </label>
        </div>
      )}

      {tab === 'merge' && (
        <div className="space-y-3">
          {/* 자리배치도 - 포차 평면도 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🗺️</span>
              <span className="text-sm font-bold text-gray-700">자리 배치도</span>
              <span className="ml-auto flex items-center gap-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" /> 입실</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" /> 빈방</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block" /> 나</span>
              </span>
            </div>
            <svg viewBox="0 0 360 320" className="w-full" style={{ fontFamily: 'sans-serif' }}>
              {/* 배경 - 포차 바닥 */}
              <rect x="0" y="0" width="360" height="320" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
              {/* 입구 */}
              <rect x="145" y="295" width="70" height="25" rx="6" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="180" y="312" textAnchor="middle" fontSize="10" fill="#a855f7" fontWeight="bold">🚪 입구</text>
              {/* 바 카운터 */}
              <rect x="120" y="135" width="120" height="40" rx="20" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="180" y="159" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">🍸 BAR</text>
              {/* 화장실 */}
              <rect x="300" y="10" width="50" height="30" rx="6" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1" />
              <text x="325" y="29" textAnchor="middle" fontSize="9" fill="#6366f1">🚻 W/C</text>
              {/* 룸들 - 2열 좌우 배치 */}
              {(() => {
                const positions = [
                  { x: 15, y: 15, w: 75, h: 55 },   // Room 1 - 좌상
                  { x: 15, y: 80, w: 75, h: 55 },   // Room 2 - 좌중
                  { x: 15, y: 190, w: 75, h: 55 },  // Room 3 - 좌하
                  { x: 15, y: 255, w: 75, h: 55 },  // Room 4 - 좌최하
                  { x: 270, y: 50, w: 75, h: 55 },  // Room 5 - 우상
                  { x: 270, y: 115, w: 75, h: 55 },  // Room 6 - 우중
                  { x: 270, y: 190, w: 75, h: 55 },  // Room 7 - 우하
                  { x: 270, y: 255, w: 75, h: 55 },  // Room 8 - 우최하
                ];
                return rooms.map((r, i) => {
                  const pos = positions[i];
                  if (!pos) return null;
                  const isMe = r.roomNumber === roomId;
                  const isSel = String(r.roomNumber) === targetRoom;
                  const fill = isMe ? '#fce7f3' : isSel ? '#ede9fe' : r.active ? '#dcfce7' : '#f3f4f6';
                  const stroke = isMe ? '#ec4899' : isSel ? '#8b5cf6' : r.active ? '#86efac' : '#d1d5db';
                  return (
                    <g key={r.id}
                      onClick={() => { if (!isMe && r.active) setTargetRoom(String(r.roomNumber)); }}
                      style={{ cursor: !isMe && r.active ? 'pointer' : 'default' }}>
                      {/* 테이블 - 중앙 원형 */}
                      <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h} rx="12" fill={fill} stroke={stroke} strokeWidth={isMe || isSel ? 2.5 : 1.5} />
                      <ellipse cx={pos.x + pos.w / 2} cy={pos.y + pos.h / 2} rx="14" ry="10" fill={r.active ? '#fef3c7' : '#f3f4f6'} stroke={r.active ? '#f59e0b' : '#d1d5db'} strokeWidth="1" />
                      {/* 사람들 - 머리+몸 */}
                      {r.active && [
                        [pos.x + 14, pos.y + 10],
                        [pos.x + pos.w - 14, pos.y + 10],
                        [pos.x + 14, pos.y + pos.h - 14],
                        [pos.x + pos.w - 14, pos.y + pos.h - 14],
                      ].map(([cx, cy], pi) => (
                        <g key={pi}>
                          <circle cx={cx} cy={cy} r="5" fill="#a78bfa" />
                          <ellipse cx={cx} cy={cy + 8} rx="4" ry="3" fill="#a78bfa" />
                        </g>
                      ))}
                      {/* 룸 번호 */}
                      <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 4} textAnchor="middle" fontSize="10"
                        fill={isMe ? '#ec4899' : r.active ? '#374151' : '#9ca3af'} fontWeight="bold">
                        {r.roomNumber}번{isMe ? '👈' : !r.active ? '🔒' : ''}
                      </text>
                    </g>
                  );
                });
              })()}
              {/* 중앙 통로 표시 */}
              <text x="180" y="210" textAnchor="middle" fontSize="9" fill="#c4b5fd">· · · 통 로 · · ·</text>
              <text x="180" y="110" textAnchor="middle" fontSize="9" fill="#c4b5fd">· · · 통 로 · · ·</text>
              <text x="180" y="270" textAnchor="middle" fontSize="9" fill="#c4b5fd">· · · 통 로 · · ·</text>
            </svg>
          </div>

          {/* 합석 요청 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center space-y-4">
            <img src={EMOJI_3D.merge} alt="merge" className="w-16 h-16 mx-auto" />
            {targetRoom ? (
              <p className="text-sm text-gray-600"><span className="font-bold text-purple-600">{targetRoom}번 룸</span>에 합석 요청을 보낼까요?</p>
            ) : (
              <p className="text-gray-400 text-sm">위 배치도에서 룸을 선택하세요!</p>
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
        </div>
      )}
    </div>
  );
}
