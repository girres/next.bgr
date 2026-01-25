'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TbSnowflake } from 'react-icons/tb';

export default function SnowEffect() {
  const [isActive, setIsActive] = useState(false);
  const [snowflakes] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 7,
      size: 3 + Math.random() * 5,
      opacity: 0.4 + Math.random() * 0.6,
      drift: -15 + Math.random() * 30,
    }))
  );

  return (
    <>
      {/* Snow Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={() => setIsActive(!isActive)}
        className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
          isActive
            ? 'bg-blue-500/30 border-blue-400/50 text-blue-100'
            : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
        } backdrop-blur-md border shadow-lg`}
      >
        <TbSnowflake className={`w-4 h-4 ${isActive ? 'animate-spin' : ''}`} />
        <span className='text-xs font-medium'>Let it snow</span>
      </motion.button>

      {/* Snow Effect */}
      <AnimatePresence>
        {isActive && (
          <div className='fixed inset-0 pointer-events-none z-40 overflow-hidden'>
            {snowflakes.map((flake) => (
              <motion.div
                key={flake.id}
                initial={{
                  x: `${flake.x}vw`,
                  y: '-10px',
                  opacity: 0,
                }}
                animate={{
                  x: [`${flake.x}vw`, `${flake.x + flake.drift}vw`],
                  y: '110vh',
                  opacity: [0, flake.opacity, flake.opacity, 0],
                  rotate: [0, 360],
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.5 },
                }}
                transition={{
                  duration: flake.duration,
                  delay: flake.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  position: 'absolute',
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  background: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
