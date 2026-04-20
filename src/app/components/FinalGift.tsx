import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail } from 'lucide-react';

export function FinalGift() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true);

    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);

    setTimeout(() => {
      setShowContent(true);
    }, 800);
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
  style={{ backgroundColor: '#fc70c0' }}
>
      {/* 배경 하트 애니메이션 */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            opacity: 0.3,
          }}
          animate={{
            y: -100,
            rotate: 360,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          <Heart className="w-8 h-8 text-white/30" fill="currentColor" />
        </motion.div>
      ))}

      {/* 색종이 효과 */}
      <AnimatePresence>
        {envelopeOpened &&
          confetti.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                x: `${item.x}vw`,
                y: -20,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: '100vh',
                rotate: 720,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                delay: item.delay,
                ease: 'easeIn',
              }}
              className="absolute"
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: ['#FF69B4', '#FFD700', '#00CED1', '#FF1493', '#FFA500'][item.id % 5],
                }}
              />
            </motion.div>
          ))}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!envelopeOpened ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.4 },
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="flex flex-col items-center"
            >
              {/* 안내 문구 */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl">
                  <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    💕 편지 도착! 열어보자요 💕
                  </p>
                </div>
              </motion.div>

              {/* 봉투 */}
              <motion.button
                onClick={handleEnvelopeClick}
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                <div className="absolute -inset-8 bg-gradient-to-r from-pink-400 to-purple-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />

                <div className="relative w-96 h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shadow-2xl" />

                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 384 256">
                    <polygon points="0,0 384,0 192,140" fill="#E9D5FF" className="drop-shadow-lg" />
                    <polygon points="0,0 0,256 192,140" fill="#F3E8FF" />
                    <polygon points="384,0 384,256 192,140" fill="#F3E8FF" />
                    <polygon points="0,256 384,256 192,140" fill="#FAE8FF" />
                  </svg>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Mail className="w-20 h-20 text-purple-400" />
                  </div>

                  <div className="absolute top-4 right-4">
                    <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Heart className="w-6 h-6 text-purple-400" fill="currentColor" />
                  </div>

                  <div className="absolute bottom-8 right-8 bg-white/80 px-4 py-2 rounded-lg">
                    <p className="text-sm font-semibold text-purple-600">To. 내 소중한 친구, 주은이</p>
                  </div>
                </div>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <p className="text-white text-lg">✨ 클릭해서 열어보세요 ✨</p>
              </motion.div>
            </motion.div>
          ) : showContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="space-y-8"
            >
              {/* 제목 */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                transition={{ duration: 0.8 }}
                className="relative text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: 3,
                  }}
                >
                  <h1 className="text-7xl font-bold text-white drop-shadow-2xl mb-4">
                    ✨Happy BirthDay✨
                  </h1>
                </motion.div>
                <Sparkles className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-x-16 w-12 h-12 text-yellow-300" fill="currentColor" />
                <Sparkles className="absolute -top-4 left-1/2 -translate-x-1/2 translate-x-16 w-12 h-12 text-yellow-300" fill="currentColor" />
              </motion.div>

              {/* 이미지 + 편지 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* 생일축하 이미지 */}
                <motion.div
                  initial={{ x: -50, opacity: 0, rotate: -5 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute -top-4 left-0 right-0 h-4 bg-white opacity-90" />

                  <div className="relative bg-white p-6 rounded-lg shadow-2xl">
                    <div
                      className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                      style={{
                        clipPath:
                          'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)',
                      }}
                    />

                    <div className="w-full h-[420px] flex items-center justify-center bg-white rounded-md overflow-hidden">
                    <img
                      src="/IMG_6046.PNG"
                      alt="Birthday Image"
                      className="max-w-full max-h-full object-contain rounded-md"
                    />
                  </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500 italic">
                        이걸 보면 빠른 시간 내에 나에게 '쥬니의 주소'를 보내달라!
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 편지지 */}
                <motion.div
                  initial={{ x: 50, opacity: 0, rotate: 5 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative"
                >
                  <div
                    className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                    style={{
                      clipPath:
                        'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)',
                    }}
                  />

                  <div className="bg-white p-8 rounded-lg shadow-2xl h-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 border-b border-blue-300"
                          style={{ marginTop: i === 0 ? '60px' : '0' }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="text-right text-sm text-gray-500">2026년 4월 20일</div>

                      <div className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                        >
                          <p className="text-lg font-semibold text-purple-600 mb-4">
                            사랑하는 주은이에게,
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          className="space-y-3 text-gray-700"
                        >
                          <p>너무 사랑하는 my 쥬니 생일축하해 !!🎂</p>
                          <p>
                            더 일찍 축하한다고 연락하고 생일 축하해주고 싶었는데, 이번 생일은 또 다르게 축하해주고 싶어서 웹 만들어서 배포하다가 아직도 생일을 축하해주지 못하고 있다 ㅠㅠ 기다려줘서 고맙고, 혹시나 내 연락을 기다렸을 너에게 사과할게 ㅠㅠ
                          </p>
                          <p>
                            그치만 우리가 지금 장거리인만큼, 그냥 카톡으로 선물보내는 거 말구 특별하게 쥬니의 생일을 축하해주고 싶어서, 괜히 혼자 욕심을 내게 되었달까,,,ㅎㅎ 쥬니는 원래도 특별하지만, 나에게도 너무 특별한 사람이니깐 !!
                          </p>
                          <p>
                            주은이랑 지금까지 영혼의 단짝으로 살아오고 함께 삶을 보내올 수 있음이 참 감사하고 늘 기뻐!! 4/20 젤루 많이 생일축하하고 너무너무 사랑하구 보고시퍼 !!
                          </p>
                          <p>
                            내가 남은 100년 이상의 시간들도 매년 쥬니생일축하담당하겟다 ~~~!! 남은 모든 날들도 늘 행복하길 바라구 우리 평생보자! ✨
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 }}
                          className="pt-6 text-right"
                        >
                          <p className="text-gray-600">I Love You 💕 Chu~~</p>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.6, type: 'spring' }}
                        className="flex justify-center gap-3 pt-4"
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -8, 0],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: 'easeInOut',
                            }}
                          >
                            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}