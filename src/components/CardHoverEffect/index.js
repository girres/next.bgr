'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default function CardHoverEffect({ items }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="content">
      {items.map((item, idx) => (
        <ScrollReveal key={item.title} delay={idx * 0.15}>
          <div
            className="relative group block h-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-slate-800/[0.4] block rounded-2xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="effort relative h-full flex flex-col z-10">
              <div className="heading">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  sizes="50px"
                  quality={75}
                  loading="lazy"
                />
                <h3>{item.title}</h3>
              </div>
              <p className="text-sm lg:text-lg flex-1">{item.text}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
