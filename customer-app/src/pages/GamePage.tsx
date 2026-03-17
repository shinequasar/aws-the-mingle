import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import type { GameQuestion } from '../types';

type GameType = 'icebreaker' | 'balance' | 'truth-or-lie' | 'topic' | 'roulette' | 'ladder';

const E3D = 'https://em-content.zobj.net/source/microsoft-teams/363';

const games: { key: GameType; label: string; icon: string }[] = [
  { key: 'icebreaker', label: '아이스\n브레이킹', icon: `${E3D}/ice_1f9ca.png` },
  { key: 'balance', label: '밸런스\n게임', icon: `${E3D}/balance-scale_2696-fe0f.png` },
  { key: 'truth-or-lie', label: '진실 or\n거짓', icon: `${E3D}/performing-arts_1f3ad.png` },
  { key: 'topic', label: '대화\n주제', icon: `${E3D}/speech-balloon_1f4ac.png` },
  { key: 'roulette', label: '룰렛', icon: `${E3D}/slot-machine_1f3b0.png` },
  { key: 'ladder', label: '사다리\n타기', icon: `${E3D}/ladder_1fa9c.png` },
];

export default function GamePage() {
  const [selected, setSelected] = useState<GameType | null>(null);
  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [playerCount, setPlayerCount] = useState(4);

  const fetchGame = async (type: GameType) => {
    setSelected(type);
    setQuestion(null);
    setResult(null);
    try {
      if (type === 'roulette' || type === 'ladder') {
        const { data } = await api.get(`/games/${type}`, { params: { playerCount } });
        setResult(data.data);
      } else {
        const { data } = await api.get(`/games/${type}`);
        setQuestion(data.data);
      }
    } catch { toast.error('게임 로딩 실패'); }
  };

  return (
    <div className="p-4 space-y-4">
      {/* 카드형 게임 선택 */}
      <div className="grid grid-cols-3 gap-2">
        {games.map((g) => (
          <button key={g.key} data-testid={`game-${g.key}`} onClick={() => fetchGame(g.key)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-all ${
              selected === g.key
                ? 'bg-gradient-to-b from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
            }`}>
            <img src={g.icon} alt={g.label} className="w-12 h-12" />
            <span className="text-xs font-bold whitespace-pre-line text-center leading-tight">{g.label}</span>
          </button>
        ))}
      </div>

      {/* 인원 입력 (룰렛/사다리) */}
      {(selected === 'roulette' || selected === 'ladder') && (
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm">
          <img src={`${E3D}/busts-in-silhouette_1f465.png`} alt="" className="w-8 h-8" />
          <span className="text-sm font-bold text-gray-700">참여 인원</span>
          <input data-testid="game-player-count" type="number" min={2} max={20} value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="w-16 p-2 border border-gray-200 rounded-xl text-center font-bold focus:border-pink-500 focus:outline-none" />
          <button onClick={() => fetchGame(selected)}
            className="ml-auto px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-400/30">
            시작! 🎲
          </button>
        </div>
      )}

      {/* 질문 결과 */}
      {question && (
        <div className="bg-white rounded-3xl p-6 shadow-sm text-center space-y-4">
          <p className="text-xl font-bold text-gray-800">{question.content}</p>
          {question.optionA && (
            <div className="flex gap-3">
              <button data-testid="game-option-a"
                className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-md shadow-pink-500/30">
                {question.optionA}
              </button>
              <button data-testid="game-option-b"
                className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl font-bold text-lg shadow-md shadow-orange-400/30">
                {question.optionB}
              </button>
            </div>
          )}
          <button data-testid="game-next" onClick={() => selected && fetchGame(selected)}
            className="text-pink-500 font-bold hover:text-pink-600">다음 →</button>
        </div>
      )}

      {/* 룰렛 결과 */}
      {result && selected === 'roulette' && (
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-6 shadow-lg text-center text-white space-y-3">
          <img src={`${E3D}/party-popper_1f389.png`} alt="" className="w-16 h-16 mx-auto" />
          <p className="text-3xl font-bold">{(result as { selectedPlayer: number }).selectedPlayer}번 당첨! 🎉</p>
          <p className="text-lg text-white/80">벌칙: {(result as { penalty: string }).penalty}</p>
          <button data-testid="game-retry" onClick={() => fetchGame('roulette')}
            className="mt-2 px-6 py-2 bg-white/20 rounded-full text-white font-bold text-sm backdrop-blur">다시 돌리기</button>
        </div>
      )}

      {/* 사다리 결과 */}
      {result && selected === 'ladder' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={`${E3D}/ladder_1fa9c.png`} alt="" className="w-8 h-8" />
            <h3 className="font-bold text-gray-800">사다리 결과</h3>
          </div>
          {Object.entries((result as { results: Record<string, string> }).results).map(([player, penalty]) => (
            <div key={player} className="flex justify-between py-2.5 px-3 rounded-xl bg-gray-50">
              <span className="font-bold text-gray-700">{player}번</span>
              <span className="text-gray-500">{penalty}</span>
            </div>
          ))}
          <button data-testid="game-retry-ladder" onClick={() => fetchGame('ladder')}
            className="mt-2 w-full text-center text-pink-500 font-bold">다시 하기 →</button>
        </div>
      )}
    </div>
  );
}
