'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { gsap } from '@/lib/gsapClient';

const CURSOR_GAP = 20;
const FOLLOW_DURATION = 0.45;

function clampX(x, cardWidth) {
  const pad = 16;
  return Math.min(
    Math.max(x, pad + cardWidth / 2),
    window.innerWidth - pad - cardWidth / 2
  );
}

export default function WordHoverPreview({ config }) {
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const positionCard = (x, y, immediate = false) => {
    const card = cardRef.current;
    if (!card) return;

    const width = config?.width ?? 300;
    const targetX = clampX(x, width);
    const targetY = y - CURSOR_GAP;

    if (immediate || !quickX.current || !quickY.current) {
      gsap.set(card, { x: targetX, y: targetY });
      return;
    }

    quickX.current(targetX);
    quickY.current(targetY);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    gsap.set(card, {
      xPercent: -50,
      yPercent: -100,
      autoAlpha: 0,
      scale: 0.94,
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const follow = reduceMotion ? 0 : FOLLOW_DURATION;

    quickX.current = gsap.quickTo(card, 'x', { duration: follow, ease: 'power3' });
    quickY.current = gsap.quickTo(card, 'y', { duration: follow, ease: 'power3' });

    return undefined;
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    if (!config) {
      activeRef.current = false;
      gsap.to(card, {
        autoAlpha: 0,
        scale: 0.94,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
      });
      return undefined;
    }

    activeRef.current = true;
    positionCard(config.initialX, config.initialY, true);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(card, {
      autoAlpha: 1,
      scale: 1,
      duration: reduceMotion ? 0.01 : 0.32,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    const onMove = (event) => {
      if (!activeRef.current) return;
      positionCard(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      activeRef.current = false;
      window.removeEventListener('mousemove', onMove);
    };
  }, [config]);

  if (!isMounted) return null;

  const width = config?.width ?? 300;
  const height = config?.height ?? 188;
  const src = config?.src;

  return createPortal(
    <div
      ref={cardRef}
      className='text-generate-peek'
      style={{ width }}
      role='presentation'
      aria-hidden={!config}
    >
      {src ? (
        <div className='text-generate-peek__frame' style={{ aspectRatio: `${width} / ${height}` }}>
          <Image
            src={src}
            alt={config.alt ?? ''}
            width={width}
            height={height}
            className='text-generate-peek__image'
            sizes={`${width}px`}
          />
        </div>
      ) : null}
    </div>,
    document.body
  );
}
