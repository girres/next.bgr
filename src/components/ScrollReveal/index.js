'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsapClient';

export default function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(element, { opacity: 1, y: 0, clearProps: 'transform' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete: () => {
              gsap.set(element, { clearProps: 'transform' });
            },
          }
        );

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const fallback = window.setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    }, 1500);

    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
