'use client';

import { createContext, useContext, useMemo, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';

const SnowContext = createContext(null);

export function useSnow() {
  const context = useContext(SnowContext);
  if (!context) {
    throw new Error('useSnow must be used within SnowProvider');
  }
  return context;
}

function Snowflakes() {
  const { isActive } = useSnow();
  const rootRef = useRef(null);
  const [flakes] = useState(() =>
    Array.from({ length: 64 }, (_, index) => ({
      id: index,
      size: 3 + Math.random() * 5,
    }))
  );

  useGSAP(
    () => {
      const nodes = rootRef.current?.querySelectorAll('.snow-flake');
      if (!nodes?.length) return undefined;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isActive) {
        gsap.to(nodes, { autoAlpha: 0, duration: 0.4, overwrite: true });
        return undefined;
      }

      if (reduceMotion) {
        gsap.set(nodes, { autoAlpha: 0.35 });
        return undefined;
      }

      nodes.forEach((node, index) => {
        const startX = gsap.utils.random(0, 100);
        const drift = gsap.utils.random(-16, 16);
        const duration = gsap.utils.random(9, 16);

        gsap.set(node, {
          x: `${startX}vw`,
          y: gsap.utils.random(-80, -12),
          autoAlpha: 0,
          rotation: 0,
        });

        gsap.to(node, {
          y: '110vh',
          x: `${startX + drift}vw`,
          rotation: gsap.utils.random(-280, 280),
          duration,
          delay: index * 0.06,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(node, {
          keyframes: [
            { autoAlpha: 0.75, duration: 0.8 },
            { autoAlpha: 0.75, duration: duration - 1.6 },
            { autoAlpha: 0, duration: 0.8 },
          ],
          delay: index * 0.06,
          repeat: -1,
          ease: 'none',
        });
      });

      return undefined;
    },
    { scope: rootRef, dependencies: [isActive] }
  );

  return (
    <div
      ref={rootRef}
      className='fixed inset-0 pointer-events-none z-40 overflow-hidden'
      aria-hidden='true'
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className='snow-flake absolute rounded-full bg-white'
          style={{
            width: flake.size,
            height: flake.size,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
          }}
        />
      ))}
    </div>
  );
}

export default function SnowProvider({ children }) {
  const [isActive, setIsActive] = useState(false);

  const value = useMemo(
    () => ({
      isActive,
      toggle: () => setIsActive((current) => !current),
    }),
    [isActive]
  );

  return (
    <SnowContext.Provider value={value}>
      {children}
      <Snowflakes />
    </SnowContext.Provider>
  );
}
