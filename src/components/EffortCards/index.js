'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapClient';

export default function EffortCards({ items }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const cards = rootRef.current?.querySelectorAll('.effort');
      if (!cards?.length) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(cards, {
          autoAlpha: 0,
          y: 14,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 90%',
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className='content'>
      {items.map((effort) => (
        <div key={effort.title} className='effort glass-card'>
          <div className='heading'>
            <Image
              src={effort.image}
              alt={effort.title}
              width={50}
              height={50}
              sizes='50px'
              quality={75}
              loading='eager'
            />
            <h3>{effort.title}</h3>
          </div>
          <p className='text-sm lg:text-lg'>{effort.text}</p>
        </div>
      ))}
    </div>
  );
}
