'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';

const FAVICON = [
  { x: 10, y: 0 },
  { x: 0, y: 10 },
  { x: 10, y: 20 },
];

const STACK = [
  { x: 0, y: 0 },
  { x: 0, y: 10 },
  { x: 0, y: 20 },
];

function setNameReveal(nameEl, progress) {
  const hidden = Math.max(0, Math.min(100, (1 - progress) * 100));
  const clip = `inset(0 ${hidden}% 0 0)`;
  gsap.set(nameEl, { clipPath: clip, WebkitClipPath: clip });
}

function measureLayout(track, name) {
  gsap.set(name, { clipPath: 'none', WebkitClipPath: 'none' });
  const nameWidth = Math.ceil(name.getBoundingClientRect().width);
  setNameReveal(name, 0);
  const width = Math.max(nameWidth, 72);
  gsap.set(track, { width });
  return width;
}

export default function SiteLogoMark({ className = '' }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const iconRef = useRef(null);
  const nameRef = useRef(null);
  const squaresRef = useRef([]);

  useGSAP(
    () => {
      const track = trackRef.current;
      const icon = iconRef.current;
      const name = nameRef.current;
      const squares = squaresRef.current.filter(Boolean);
      if (!track || !icon || !name || squares.length !== 3) return undefined;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(icon, { autoAlpha: 0 });
        gsap.set(track, { width: 'auto' });
        setNameReveal(name, 1);
        return undefined;
      }

      const nameWidth = measureLayout(track, name);
      const revealState = { t: 0 };

      gsap.set(icon, { x: 0, force3D: true });
      setNameReveal(name, 0);
      squares.forEach((sq, index) => {
        gsap.set(sq, { x: FAVICON[index].x, y: FAVICON[index].y, force3D: true });
      });

      /** Palo = cortina: x recorre todo el ancho del nombre; el clip avanza igual */
      const syncCurtain = () => {
        const x = revealState.t * nameWidth;
        gsap.set(icon, { x });
        setNameReveal(name, revealState.t);
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.55 });

      tl.to({}, { duration: 0.55 })
        .to(squares, {
          x: (index) => STACK[index].x,
          y: (index) => STACK[index].y,
          duration: 0.52,
          stagger: 0.03,
          ease: 'power2.inOut',
        })
        .to({}, { duration: 0.12 })
        .to(revealState, {
          t: 1,
          duration: 1.05,
          ease: 'power2.inOut',
          onUpdate: syncCurtain,
        })
        .to({}, { duration: 1.1 })
        .to(revealState, {
          t: 0,
          duration: 0.82,
          ease: 'power2.inOut',
          onUpdate: syncCurtain,
        })
        .to({}, { duration: 0.1 })
        .to(squares, {
          x: (index) => FAVICON[index].x,
          y: (index) => FAVICON[index].y,
          duration: 0.52,
          stagger: 0.03,
          ease: 'power2.inOut',
        })
        .to({}, { duration: 0.45 });

      return () => {
        tl.kill();
        gsap.killTweensOf(revealState);
      };
    },
    { scope: rootRef }
  );

  return (
    <span ref={rootRef} className={`site-logo-mark ${className}`.trim()}>
      <span ref={trackRef} className='site-logo-mark__track'>
        <span ref={nameRef} className='site-logo-mark__name'>
          Bryan Girado
        </span>
        <span ref={iconRef} className='site-logo-mark__icon' aria-hidden='true'>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              ref={(el) => {
                squaresRef.current[index] = el;
              }}
              className='site-logo-mark__sq'
            />
          ))}
        </span>
      </span>
    </span>
  );
}
