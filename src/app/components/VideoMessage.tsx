import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface VideoMessageProps {
  onVideoEnd: () => void;
}

export function VideoMessage({ onVideoEnd }: VideoMessageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Auto-play was prevented:', err);
      });
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
    >
      {/* 배경 효과 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30"
      />

      {/* 카드 전체 */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >

          {/* 카드 박스 */}
          <div className="bg-black/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4">

            {/* 영상 영역 */}
            <div className="w-full h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black">
              
              <video
                ref={videoRef}
                className="max-w-full max-h-full object-contain"
                onEnded={onVideoEnd}
                controls
                playsInline
              >
                <source src="/생일축하영상.MP4" type="video/mp4" />
              </video>

            </div>

          </div>

          {/* 아래 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <p className="text-white/80 text-lg">
              💝 랩실이라 소리내서 생일축하 노래를 불러주지는 못하지만 ~~~ <br />
              내가 생일축하 노래를 부르고 있는 거시야 ㅎㅎ 박쥬니 생일축하한당!! 💝
            </p>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}