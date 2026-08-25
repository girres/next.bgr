'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';
import { scrollToTarget } from '@/lib/smoothScroll';

const SCROLL_LABEL = 'Scroll Down';
const TYPE_STEP = 0.09;
const HOLD_FULL = 0.85;
const LOOP_DELAY = 0.7;

export default function HeroScroll() {
  const rootRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const text = textRef.current;
      if (!text) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        text.textContent = SCROLL_LABEL;
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        text.textContent = '';

        const timeline = gsap.timeline({ repeat: -1 });

        SCROLL_LABEL.split('').forEach((_, index) => {
          timeline.call(
            () => {
              text.textContent = SCROLL_LABEL.slice(0, index + 1);
            },
            null,
            index * TYPE_STEP
          );
        });

        timeline.call(
          () => {
            text.textContent = '';
          },
          null,
          SCROLL_LABEL.length * TYPE_STEP + HOLD_FULL
        );

        timeline.to({}, { duration: LOOP_DELAY });

        return () => timeline.kill();
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
      <span className='home-hero__scroll-text' ref={textRef} />
      <span className='home-hero__scroll-caret' aria-hidden='true' />
    </button>
  );
}
