import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GiftBox } from './components/GiftBox';
import { BalloonsStage } from './components/BalloonsStage';
import { VideoMessage } from './components/VideoMessage';
import { FinalGift } from './components/FinalGift';

type Stage = 'gift-box' | 'balloons' | 'video' | 'final';

export default function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('balloons');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.35;
  }, []);

  useEffect(() => {
    const startMusic = async () => {
      if (!audioRef.current || musicStarted) return;

      try {
        await audioRef.current.play();
        setMusicStarted(true);
      } catch (error) {
        console.log('BGM autoplay blocked:', error);
      }
    };

    const handleFirstInteraction = () => {
      startMusic();
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [musicStarted]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setMusicStarted(true);
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    } catch (error) {
      console.log('BGM toggle failed:', error);
    }
  };

  const handleStageChange = (nextStage: Stage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStage(nextStage);
      setIsTransitioning(false);
    }, 500);
  };

  const handleGiftBoxOpen = () => {
    handleStageChange('balloons');
  };

  const handleBalloonsComplete = () => {
    handleStageChange('video');
  };

  const handleVideoEnd = () => {
    handleStageChange('final');
  };

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      {/* 전역 브금 */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/bgm.mp3" type="audio/mpeg" />
      </audio>

      {/* 음악 버튼 */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-[100] bg-white/85 hover:bg-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold text-pink-500"
      >
        {audioRef.current?.paused || isMuted ? '🎵 음악 켜기' : '🔇 음악 끄기'}
      </button>

      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentStage === 'gift-box' && (
          <motion.div
            key="gift-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GiftBox onOpen={handleGiftBoxOpen} />
          </motion.div>
        )}

        {currentStage === 'balloons' && (
          <motion.div
            key="balloons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BalloonsStage onComplete={handleBalloonsComplete} />
          </motion.div>
        )}

        {currentStage === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoMessage onVideoEnd={handleVideoEnd} />
          </motion.div>
        )}

        {currentStage === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalGift />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}