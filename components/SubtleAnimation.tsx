'use client';
import { motion } from 'framer-motion';

export function ConnectionSuccessAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-96 h-96 rounded-full border-8 border-black opacity-10"
          initial={{ scale: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
            repeat: 1,
            repeatDelay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}
