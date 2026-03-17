import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const filters = [
  { name: '원본', css: 'none', emoji: '📷' },
  { name: '핑크핑크', css: 'saturate(1.5) hue-rotate(330deg) brightness(1.1)', emoji: '🩷' },
  { name: '반짝반짝', css: 'brightness(1.3) contrast(1.1) saturate(1.3)', emoji: '✨' },
  { name: '몽환', css: 'blur(0.5px) brightness(1.2) saturate(1.4) contrast(0.9)', emoji: '🦄' },
  { name: '빈티지', css: 'sepia(0.4) saturate(1.3) brightness(1.1)', emoji: '🧸' },
  { name: '쿨톤', css: 'hue-rotate(180deg) saturate(0.8) brightness(1.1)', emoji: '🧊' },
  { name: '흑백', css: 'grayscale(1) contrast(1.2)', emoji: '🖤' },
  { name: '선셋', css: 'hue-rotate(15deg) saturate(1.6) brightness(1.05) contrast(1.1)', emoji: '🌅' },
];

interface Props {
  onCapture: (blob: Blob) => void;
  onClose: () => void;
}

export default function PhotoBooth({ onCapture, onClose }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [filterIdx, setFilterIdx] = useState(0);
  const [captured, setCaptured] = useState<string | null>(null);

  const capture = useCallback(() => {
    const canvas = document.createElement('canvas');
    const video = webcamRef.current?.video;
    if (!video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.filter = filters[filterIdx].css === 'none' ? '' : filters[filterIdx].css;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCaptured(dataUrl);
  }, [filterIdx]);

  const send = () => {
    if (!captured) return;
    fetch(captured).then(r => r.blob()).then(blob => onCapture(blob));
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-3 text-white">
        <button onClick={onClose} className="text-2xl">✕</button>
        <span className="font-bold">📸 포토부스</span>
        <div className="w-8" />
      </div>

      {/* 카메라 / 프리뷰 */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {captured ? (
          <img src={captured} alt="captured" className="max-h-full max-w-full object-contain" />
        ) : (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'user', width: 720, height: 720 }}
            className="max-h-full max-w-full object-contain"
            style={{ filter: filters[filterIdx].css === 'none' ? undefined : filters[filterIdx].css }}
            mirrored
          />
        )}
      </div>

      {/* 필터 선택 */}
      {!captured && (
        <div className="px-2 py-3 flex gap-2 overflow-x-auto">
          {filters.map((f, i) => (
            <button key={f.name} onClick={() => setFilterIdx(i)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl shrink-0 transition-all ${
                filterIdx === i ? 'bg-pink-500 text-white scale-105' : 'bg-gray-800 text-gray-300'
              }`}>
              <span className="text-xl">{f.emoji}</span>
              <span className="text-[10px] font-medium whitespace-nowrap">{f.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* 하단 버튼 */}
      <div className="p-4 flex justify-center gap-4">
        {captured ? (
          <>
            <button onClick={() => setCaptured(null)} className="px-6 py-3 bg-gray-700 text-white rounded-2xl font-bold">다시 찍기</button>
            <button onClick={send} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold shadow-lg">보내기 💕</button>
          </>
        ) : (
          <button onClick={capture} className="w-16 h-16 bg-white rounded-full border-4 border-pink-400 shadow-lg active:scale-90 transition-transform" />
        )}
      </div>
    </div>
  );
}
