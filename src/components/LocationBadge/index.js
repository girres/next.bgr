'use client';

import { motion } from 'framer-motion';
import { ImLocation } from 'react-icons/im';

export default function LocationBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className='fixed top-6 left-6 z-50 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-gray-300 shadow-lg'
    >
      <ImLocation className='w-3.5 h-3.5' />
      <span>Madrid, Spain</span>
    </motion.div>
  );
}
