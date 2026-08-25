'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(element, { autoAlpha: 1, y: 0, clearProps: 'transform' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.fromTo(
          element,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            delay,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              once: true,
            },
            onComplete: () => {
              gsap.set(element, { clearProps: 'transform' });
            },
          }
        );

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
