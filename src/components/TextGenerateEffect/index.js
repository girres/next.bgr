'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';

export default function TextGenerateEffect({
  words,
  className = '',
  duration = 0.5,
  filter = true,
  highlightWords = [],
}) {
  const rootRef = useRef(null);
  const wordsArray = words.split(' ');

  const isHighlighted = (word) => {
    const cleanWord = word.replace(/[.,!?;:]$/, '').toLowerCase();
    return highlightWords.some((item) => item.toLowerCase() === cleanWord);
  };

  useGSAP(
    () => {
      const wordNodes = rootRef.current?.querySelectorAll('.text-generate__word');
      if (!wordNodes?.length) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(wordNodes, { autoAlpha: 1, y: 0, filter: 'none' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(wordNodes, {
          autoAlpha: 0,
          y: 10,
          filter: filter ? 'blur(8px)' : 'none',
          duration,
          stagger: 0.045,
          ease: 'power2.out',
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [words, duration, filter] }
  );

  return (
    <div ref={rootRef} className={className}>
      {wordsArray.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`text-generate__word inline-block${isHighlighted(word) ? ' text-main-white' : ''}`}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
}
