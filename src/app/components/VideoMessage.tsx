import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface VideoMessageProps {
  onVideoEnd: () => void;
}

export function VideoMessage({ onVideoEnd }: VideoMessageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black/20"
      />

      <div className="relative z-10 w-full max-w-4xl px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4">
            <div className="w-full h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="max-w-full max-h-full object-contain"
                onEnded={onVideoEnd}
                onError={() => setVideoError(true)}
                controls
                playsInline
                muted
              >
                <source src="/birthday-video.MP4" type="video/mp4" />
              </video>
            </div>

            {videoError && (
              <div className="text-center mt-4 text-white/80">
                영상을 불러오지 못했어요. 파일 경로를 확인해주세요.
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <p className="text-white/80 text-lg">
              💝 박쥬니 생일축하한당!! 💝
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}