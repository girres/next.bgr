'use client';

import { motion } from 'framer-motion';
import { ImLocation } from 'react-icons/im';

export default function LocationBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className='hidden lg:flex fixed top-6 left-6 z-50 items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors duration-300 cursor-default'
    >
      <ImLocation className='w-3.5 h-3.5' />
      <span>Madrid, Spain</span>
    </motion.div>
  );
}
