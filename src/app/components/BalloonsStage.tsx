import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift } from 'lucide-react';

interface BalloonsStageProps {
  onComplete: () => void;
}

interface Balloon {
  id: number;
  color: string;
  message: string;
  x: number;
  y: number;
  type: 'heart' | 'circle';
}

const balloons: Balloon[] = [
  { id: 1, color: '#FF69B4', message: '너무너무 보고싶은 주으나 !! 26살 4월 20일 생일을 축하해 !!', x: 15, y: 20, type: 'heart' },
  { id: 2, color: '#FFB6C1', message: '울 주은이는 이 세상에서 너무나 소중한 존재야!', x: 35, y: 15, type: 'circle' },
  { id: 3, color: '#FF1493', message: '오늘 뿐 아니라 매일매일 행복과 감사와 평안함 안에서 살아가길 기도하고 응원해', x: 55, y: 25, type: 'heart' },
  { id: 4, color: '#FFC0CB', message: '우리 곧 만나서 행복한 시간 보내자~!', x: 75, y: 18, type: 'circle' },
  { id: 5, color: '#FF69B4', message: '내가 언제나 쥬니를 너무너무 아끼고 사랑해', x: 25, y: 60, type: 'heart' },
  { id: 6, color: '#FFB6C1', message: '💕 생일축하해 💕', x: 65, y: 55, type: 'circle' },
];

export function BalloonsStage({ onComplete }: BalloonsStageProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const [messages, setMessages] = useState<Array<{ id: number; message: string; x: number; y: number }>>([]);

  const handleOpenBox = () => {
    if (isOpened) return;
    setIsOpened(true);
  };

  const handleBalloonPop = (balloon: Balloon) => {
    if (poppedBalloons.includes(balloon.id)) return;

    setPoppedBalloons((prev) => [...prev, balloon.id]);

    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: `${balloon.id}-${i}-${Date.now()}`,
      x: balloon.x,
      y: balloon.y,
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);

    setMessages((prev) => [
      ...prev,
      {
        id: balloon.id,
        message: balloon.message,
        x: balloon.x,
        y: balloon.y,
      },
    ]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !s.id.startsWith(`${balloon.id}-`)));
    }, 900);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== balloon.id));
    }, 1800);

    if (poppedBalloons.length + 1 === balloons.length) {
      setTimeout(() => {
        onComplete();
      }, 1400);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: '#FFF8F2' }}
    >
      {/* 안내 문구 */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="open-guide"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-white px-8 py-4 rounded-full shadow-md border border-pink-100">
              <p className="text-2xl font-semibold text-pink-500">
                🎁 선물박스 클릭해봐! 🎁
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="balloon-guide"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 z-50"
          >
        
          </motion.div>
        )}
      </AnimatePresence>

      {/* 풍선 */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {isOpened &&
            balloons.map((balloon, index) =>
              !poppedBalloons.includes(balloon.id) ? (
                <motion.button
                  key={balloon.id}
                  onClick={() => handleBalloonPop(balloon)}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    top: '73%',
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    top: `${balloon.y}%`,
                    y: [0, -12, 0],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    rotate: 220,
                    transition: { duration: 0.25 },
                  }}
                  transition={{
                    opacity: { duration: 0.25, delay: 0.45 + index * 0.08 },
                    scale: { duration: 0.35, delay: 0.45 + index * 0.08 },
                    top: { duration: 0.9, delay: 0.45 + index * 0.08, ease: 'easeOut' },
                    y: {
                      duration: 2 + index * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.2,
                    },
                  }}
                  className="absolute z-20 cursor-pointer"
                  style={{
                    left: `${balloon.x}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {balloon.type === 'heart' ? (
                    <div className="relative">
                      <Heart
                        className="w-24 h-24 drop-shadow-md"
                        fill={balloon.color}
                        stroke={balloon.color}
                        strokeWidth={1}
                      />
                      <div className="absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-12 bg-gray-400" />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-24 rounded-full relative drop-shadow-md"
                      style={{ backgroundColor: balloon.color }}
                    >
                      <div className="absolute top-4 left-4 w-6 h-8 rounded-full bg-white/40" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-400" />
                    </div>
                  )}
                </motion.button>
              ) : null
            )}
        </AnimatePresence>

        {/* 메시지 말풍선 */}
        <div className="absolute inset-0 pointer-events-none z-40">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 220 }}
                className="absolute"
                style={{
                  left: `${msg.x}%`,
                  top: `calc(${msg.y}% - 92px)`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="relative inline-block max-w-[260px] sm:max-w-[320px] md:max-w-[360px]">
                  {/* 말풍선 본체 */}
                  <div className="bg-white/95 px-5 py-4 rounded-[28px] shadow-lg border border-pink-100">
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-pink-500 text-center leading-relaxed break-words">
                      {msg.message}
                    </p>
                  </div>

                  {/* 말풍선 꼬리 */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full">
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-white/95" />
                      <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-0 h-0 border-l-[13px] border-r-[13px] border-t-[17px] border-l-transparent border-r-transparent border-t-pink-100 -z-10" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 반짝이 */}
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{
                scale: 1,
                x: `${sparkle.x}%`,
                y: `${sparkle.y}%`,
                opacity: 1,
              }}
              animate={{
                scale: 0,
                x: `${sparkle.x + (Math.random() - 0.5) * 18}%`,
                y: `${sparkle.y + (Math.random() - 0.5) * 18}%`,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
              className="absolute z-40"
            >
              <Sparkles className="w-8 h-8 text-yellow-300" fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 선물박스 */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30"
      >
        <button
          type="button"
          onClick={handleOpenBox}
          className="relative cursor-pointer"
          disabled={isOpened}
        >
          <div className="relative w-[320px] h-[250px]">
            {/* 바닥 그림자 */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[260px] h-[28px] rounded-full bg-pink-200/60 blur-xl" />

            {/* 뚜껑 */}
            <motion.div
              animate={
                isOpened
                  ? {
                      rotate: -28,
                      x: -42,
                      y: -26,
                    }
                  : {
                      rotate: [0, -2, 2, 0],
                    }
              }
              transition={
                isOpened
                  ? { duration: 0.55, ease: 'easeInOut' }
                  : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              }
              className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom-right z-20"
            >
              <div className="relative w-[300px] h-[72px] rounded-xl shadow-lg bg-pink-400">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-yellow-300" />
                <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                  <Gift className="w-14 h-14 text-yellow-200 drop-shadow-sm" strokeWidth={1.8} />
                </div>
              </div>
            </motion.div>

            {/* 박스 안쪽 */}
            <div className="absolute bottom-[118px] left-1/2 -translate-x-1/2 w-[270px] h-[55px] rounded-t-2xl bg-pink-200 z-10 overflow-hidden">
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/20"
                />
              )}
            </div>

            {/* 박스 본체 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[170px] rounded-2xl shadow-2xl bg-pink-500 overflow-hidden">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-yellow-300" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-yellow-300" />
              <div className="absolute inset-0 bg-white/10" />
            </div>

            {/* 클릭 안내 */}
            <AnimatePresence>
              {!isOpened && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2"
                >
                  <div className="bg-white px-5 py-2 rounded-full shadow-sm border border-pink-100">
                    <p className="text-pink-500 font-medium whitespace-nowrap">
                      클릭해서 열기 ✨
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </motion.div>

      {/* 진행률 */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-pink-100">
            <p className="text-lg font-semibold text-pink-500">
              {poppedBalloons.length} / {balloons.length}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}