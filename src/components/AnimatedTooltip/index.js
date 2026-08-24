'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedTooltip({ items }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className='tools-row__items'>
      {items.map((item, idx) => (
        <div
          className='tools-row__item relative flex-shrink-0'
          key={item.id || item.title}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => {
            setHoveredIndex(null);
            x.set(0);
          }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 16,
                  },
                }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                style={{
                  translateX,
                  rotate,
                  whiteSpace: 'nowrap',
                }}
                className='tools-tooltip pointer-events-none absolute left-1/2 top-full z-[70] mt-3 -translate-x-1/2 rounded-full border border-main-gray/25 bg-main-dark/95 px-4 py-2 text-xs font-medium text-main-white shadow-xl backdrop-blur-md'
              >
                {item.title}
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={handleMouseMove}
            className='flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-2xl border border-main-gray/20 bg-[#2B3138]/50 backdrop-blur-sm transition-all duration-300 hover:border-main-gray/40 lg:h-[100px] lg:w-[100px]'
            aria-label={item.title}
          >
            <img
              src={item.image}
              alt=''
              width={50}
              height={50}
              loading='lazy'
              decoding='async'
              className='mx-auto h-auto max-h-[50px] w-auto object-contain opacity-80 brightness-0 invert'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
