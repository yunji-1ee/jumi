import { motion } from 'motion/react';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onOpen: () => void;
}

export function GiftBox({ onOpen }: GiftBoxProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.2 
        }}
        className="mb-8"
      >
        <motion.h1 
          className="text-5xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          🎉 주은님께 🎉
        </motion.h1>
        <motion.p 
          className="text-2xl text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          특별한 선물이 준비되어 있어요
        </motion.p>
      </motion.div>

      <motion.button
        onClick={onOpen}
        className="relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-3xl shadow-2xl cursor-pointer"
        >
          <Gift className="w-32 h-32 text-white" strokeWidth={1.5} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <p className="text-white text-xl font-semibold">클릭해서 열어보세요! 🎁</p>
        </motion.div>
      </motion.button>
    </div>
  );
}
