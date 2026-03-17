import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import type { GameQuestion } from '../types';
import { MdAcUnit, MdBalance, MdTheaterComedy, MdChat, MdCasino, MdSportsEsports, MdCelebration } from 'react-icons/md';
import { GiLadder } from 'react-icons/gi';

type GameType = 'icebreaker' | 'balance' | 'truth-or-lie' | 'topic' | 'roulette' | 'ladder';

const games: { key: GameType; label: string; icon: JSX.Element }[] = [
  { key: 'icebreaker', label: '아이스브레이킹', icon: <MdAcUnit /> },
  { key: 'balance', label: '밸런스 게임', icon: <MdBalance /> },
  { key: 'truth-or-lie', label: '진실 or 거짓', icon: <MdTheaterComedy /> },
  { key: 'topic', label: '대화 주제', icon: <MdChat /> },
  { key: 'roulette', label: '룰렛', icon: <MdCasino /> },
  { key: 'ladder', label: '사다리타기', icon: <GiLadder /> },
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
      <h2 className="text-lg font-bold"><MdSportsEsports className="inline" /> 미니게임</h2>
      <div className="grid grid-cols-3 gap-2">
        {games.map((g) => (
          <button key={g.key} data-testid={`game-${g.key}`} onClick={() => fetchGame(g.key)}
            className={`py-3 rounded-xl text-sm font-medium ${selected === g.key ? 'bg-blue-600 text-white' : 'bg-white shadow-sm'}`}>
            <div className="text-2xl">{g.icon}</div>{g.label}
          </button>
        ))}
      </div>

      {(selected === 'roulette' || selected === 'ladder') && (
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
          <span className="text-sm">참여 인원:</span>
          <input data-testid="game-player-count" type="number" min={2} max={20} value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))} className="w-16 p-2 border rounded-lg text-center" />
          <button onClick={() => fetchGame(selected)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">시작!</button>
        </div>
      )}

      {question && (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-4">
          <p className="text-xl font-bold">{question.content}</p>
          {question.optionA && (
            <div className="flex gap-3">
              <button data-testid="game-option-a" className="flex-1 py-4 bg-pink-100 text-pink-700 rounded-xl font-bold text-lg">{question.optionA}</button>
              <button data-testid="game-option-b" className="flex-1 py-4 bg-blue-100 text-blue-700 rounded-xl font-bold text-lg">{question.optionB}</button>
            </div>
          )}
          <button data-testid="game-next" onClick={() => selected && fetchGame(selected)} className="text-blue-600 font-medium">다음 →</button>
        </div>
      )}

      {result && selected === 'roulette' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="text-5xl mb-3"><MdCelebration className="inline" /></div>
          <p className="text-2xl font-bold">{(result as { selectedPlayer: number }).selectedPlayer}번 당첨!</p>
          <p className="text-lg text-gray-500 mt-2">벌칙: {(result as { penalty: string }).penalty}</p>
          <button data-testid="game-retry" onClick={() => fetchGame('roulette')} className="mt-4 text-blue-600 font-medium">다시 돌리기</button>
        </div>
      )}

      {result && selected === 'ladder' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-center mb-3"><GiLadder className="inline" /> 사다리 결과</h3>
          {Object.entries((result as { results: Record<string, string> }).results).map(([player, penalty]) => (
            <div key={player} className="flex justify-between py-2 border-b last:border-0">
              <span className="font-medium">{player}번</span><span className="text-gray-600">{penalty}</span>
            </div>
          ))}
          <button data-testid="game-retry-ladder" onClick={() => fetchGame('ladder')} className="mt-3 w-full text-center text-blue-600 font-medium">다시 하기</button>
        </div>
      )}
    </div>
  );
}
