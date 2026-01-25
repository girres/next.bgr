'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className='relative group'
          key={item.id || item.title}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: 'nowrap',
              }}
              className='absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2'
            >
              <div className='absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px ' />
              <div className='absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px ' />
              <div className='font-bold text-white relative z-30 text-base'>
                {item.title}
              </div>
            </motion.div>
          )}
          <div
            onMouseMove={handleMouseMove}
            className='flex items-center justify-center w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-2xl bg-[#2B3138]/50 backdrop-blur-sm border border-main-gray/20 hover:border-main-gray/40 transition-all duration-300 cursor-pointer'
          >
            <Image
              src={item.image}
              alt={item.title}
              width={50}
              height={50}
              sizes='50px'
              quality={75}
              loading='lazy'
              className='max-h-[50px] h-auto w-auto mx-auto'
            />
          </div>
        </div>
      ))}
    </>
  );
}
