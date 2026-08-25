'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';
import './cursor.scss';

export default function CustomCursor() {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useGSAP(
    () => {
      if (!isEnabled) return undefined;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return undefined;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.documentElement.classList.add('has-custom-cursor');

      gsap.set([dot, ring], {
        x: -100,
        y: -100,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 1,
      });

      const duration = reduceMotion ? 0 : undefined;
      const dotX = gsap.quickTo(dot, 'x', { duration: duration ?? 0.12, ease: 'power3' });
      const dotY = gsap.quickTo(dot, 'y', { duration: duration ?? 0.12, ease: 'power3' });
      const ringX = gsap.quickTo(ring, 'x', { duration: duration ?? 0.45, ease: 'power3' });
      const ringY = gsap.quickTo(ring, 'y', { duration: duration ?? 0.45, ease: 'power3' });

      const onMove = (event) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
      };

      const onLeave = () => {
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
      };

      const onOver = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const isHovering = Boolean(
          target.closest('a, button, [role="button"], input, textarea, select, label')
        );
        gsap.to(ring, {
          scale: isHovering ? 1.45 : 1,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mouseleave', onLeave);
      document.addEventListener('mouseover', onOver, { passive: true });

      return () => {
        document.documentElement.classList.remove('has-custom-cursor');
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseleave', onLeave);
        document.removeEventListener('mouseover', onOver);
      };
    },
    { scope: rootRef, dependencies: [isEnabled] }
  );

  if (!isEnabled) return null;

  return (
    <div ref={rootRef} className='custom-cursor-root' aria-hidden='true'>
      <div ref={ringRef} className='custom-cursor-ring' />
      <div ref={dotRef} className='custom-cursor-dot' />
    </div>
  );
}
