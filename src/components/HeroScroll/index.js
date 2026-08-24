'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';
import { scrollToTarget } from '@/lib/smoothScroll';

export default function HeroScroll() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const line = rootRef.current?.querySelector('.home-hero__scroll-line');
      if (!line) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(line, { transformOrigin: 'top center' });
        gsap.to(line, {
          scaleY: 0.42,
          duration: 1.35,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <button
      ref={rootRef}
      type='button'
      className='home-hero__scroll hidden lg:flex'
      aria-label='Scroll to selected work'
      onClick={() => scrollToTarget('projects')}
    >
      <span className='home-hero__scroll-line' />
      <span className='home-hero__scroll-text'>Scroll</span>
    </button>
  );
}
