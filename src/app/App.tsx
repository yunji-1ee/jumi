import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GiftBox } from './components/GiftBox';
import { BalloonsStage } from './components/BalloonsStage';
import { VideoMessage } from './components/VideoMessage';
import { FinalGift } from './components/FinalGift';

type Stage = 'gift-box' | 'balloons' | 'video' | 'final';

export default function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('balloons');
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // 생일 선물 이미지 URL (Unsplash에서 가져온 이미지)
  const giftImageUrl = "https://images.unsplash.com/photo-1764183298040-6859fef0b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGdpZnQlMjBzdXJwcmlzZSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3NjY3MjU5Nnww&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <div className="w-full h-screen overflow-hidden">
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
            <FinalGift giftImageUrl={giftImageUrl} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
