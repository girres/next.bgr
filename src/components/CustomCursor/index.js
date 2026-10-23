'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsapClient';
import { isTextCursorPoint } from './textHighlight';
import { isViewProjectPoint } from './viewProject';
import './cursor.scss';

const CURSOR_SQUARE = 13;

function resolveCursorMode(x, y) {
  if (isTextCursorPoint(x, y)) return 'text';
  if (isViewProjectPoint(x, y)) return 'view-project';
  return 'default';
}

export default function CustomCursor() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useGSAP(
    () => {
      if (!isEnabled) return undefined;

      const track = trackRef.current;
      const cursor = cursorRef.current;
      const label = labelRef.current;
      if (!track || !cursor || !label) return undefined;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.documentElement.classList.add('has-custom-cursor');

      let mode = 'default';
      let frame = 0;

      gsap.set(track, {
        x: -100,
        y: -100,
        xPercent: 0,
        yPercent: -50,
        autoAlpha: 0,
      });

      gsap.set(cursor, {
        width: CURSOR_SQUARE,
        height: CURSOR_SQUARE,
        autoAlpha: 1,
      });

      gsap.set(label, { autoAlpha: 0 });

      const moveDuration = reduceMotion ? 0 : 0.14;
      const morphDuration = reduceMotion ? 0 : 0.22;

      const posX = gsap.quickTo(track, 'x', { duration: moveDuration, ease: 'power3' });
      const posY = gsap.quickTo(track, 'y', { duration: moveDuration, ease: 'power3' });

      const setMode = (next) => {
        if (mode === next) return;
        mode = next;

        const isText = next === 'text';
        const isViewProject = next === 'view-project';

        gsap.to(cursor, {
          width: isText ? 2 : CURSOR_SQUARE,
          height: isText ? 24 : CURSOR_SQUARE,
          duration: morphDuration,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        gsap.to(label, {
          autoAlpha: isViewProject ? 1 : 0,
          duration: isViewProject ? 0.2 : 0.14,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        cursor.classList.toggle('custom-cursor--text', isText);
        track.classList.toggle('custom-cursor-track--view-project', isViewProject);
      };

      const update = (clientX, clientY) => {
        posX(clientX + 6);
        posY(clientY);
        gsap.to(track, { autoAlpha: 1, duration: 0.18, overwrite: 'auto' });
        setMode(resolveCursorMode(clientX, clientY));
      };

      const onMove = (event) => {
        const { clientX, clientY } = event;
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          update(clientX, clientY);
        });
      };

      const onLeave = () => {
        gsap.to(track, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
      };

      window.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mouseleave', onLeave);

      return () => {
        if (frame) cancelAnimationFrame(frame);
        document.documentElement.classList.remove('has-custom-cursor');
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: rootRef, dependencies: [isEnabled] }
  );

  if (!isEnabled) return null;

  return (
    <div ref={rootRef} className='custom-cursor-root' aria-hidden='true'>
      <div ref={trackRef} className='custom-cursor-track'>
        <div ref={cursorRef} className='custom-cursor' />
        <span ref={labelRef} className='custom-cursor__label'>View project</span>
      </div>
    </div>
  );
}
