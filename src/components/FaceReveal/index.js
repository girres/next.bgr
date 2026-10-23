'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

const HOLD_MS = 1300;
const DRAIN_MS = 280;

const HOVER_REVEAL_QUERY = '(hover: hover) and (pointer: fine)';
const PRESS_LABEL_QUERY = '(hover: none), (pointer: coarse), (max-width: 1023px)';

export default function FaceReveal({
  label,
  pressLabel = 'Press to reveal',
  className = 'face-reveal',
  triggerClassName = 'face-reveal__trigger',
  activeClassName = 'face-reveal__trigger--active',
  showDot = true,
  ariaLabel,
}) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [usePressLabel, setUsePressLabel] = useState(false);
  const [hoverRevealEnabled, setHoverRevealEnabled] = useState(true);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const progressElRef = useRef(null);
  const progressRef = useRef(0);
  const hoveringRef = useRef(false);
  const revealingRef = useRef(false);
  const hoverRevealEnabledRef = useRef(true);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);

  const setProgressVisual = (value) => {
    progressRef.current = value;
    if (progressElRef.current) {
      progressElRef.current.style.transform = `scaleX(${value})`;
    }
  };

  const stopLoop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const syncInteractionMode = useCallback(() => {
    const canHoverReveal = window.matchMedia(HOVER_REVEAL_QUERY).matches;
    hoverRevealEnabledRef.current = canHoverReveal;
    setHoverRevealEnabled(canHoverReveal);
    setUsePressLabel(window.matchMedia(PRESS_LABEL_QUERY).matches);
  }, []);

  useEffect(() => {
    syncInteractionMode();

    const hoverRevealQuery = window.matchMedia(HOVER_REVEAL_QUERY);
    const pressLabelQuery = window.matchMedia(PRESS_LABEL_QUERY);

    hoverRevealQuery.addEventListener('change', syncInteractionMode);
    pressLabelQuery.addEventListener('change', syncInteractionMode);

    return () => {
      hoverRevealQuery.removeEventListener('change', syncInteractionMode);
      pressLabelQuery.removeEventListener('change', syncInteractionMode);
    };
  }, [syncInteractionMode]);

  useEffect(() => {
    revealingRef.current = isRevealing;
  }, [isRevealing]);

  useEffect(() => {
    if ((!isRevealing && !isHovering) || !hoverRevealEnabledRef.current) return;

    const handleMouseMove = (event) => {
      if (!containerRef.current || !imageContainerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      imageContainerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isRevealing, isHovering]);

  useEffect(() => () => stopLoop(), []);

  const startLoop = () => {
    if (rafRef.current) return;
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
  };

  const tick = (now) => {
    const last = lastTsRef.current || now;
    const dt = now - last;
    lastTsRef.current = now;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hoveringRef.current) {
      const next = reduceMotion
        ? 1
        : Math.min(1, progressRef.current + dt / HOLD_MS);
      setProgressVisual(next);
      if (next >= 1) {
        if (!revealingRef.current) {
          revealingRef.current = true;
          setIsRevealing(true);
        }
        stopLoop();
        return;
      }
    } else {
      const next = reduceMotion
        ? 0
        : Math.max(0, progressRef.current - dt / DRAIN_MS);
      setProgressVisual(next);
      if (revealingRef.current) {
        revealingRef.current = false;
        setIsRevealing(false);
      }
      if (next <= 0) {
        stopLoop();
        return;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const showFace = () => {
    if (!hoverRevealEnabledRef.current) return;
    hoveringRef.current = true;
    setIsHovering(true);
    startLoop();
  };

  const hideFace = () => {
    if (!hoverRevealEnabledRef.current) return;
    hoveringRef.current = false;
    setIsHovering(false);
    startLoop();
  };

  const hidePressReveal = () => {
    revealingRef.current = false;
    setIsRevealing(false);
    setProgressVisual(0);
  };

  const toggleFace = () => {
    if (hoverRevealEnabledRef.current) return;
    setIsRevealing((current) => {
      const next = !current;
      revealingRef.current = next;
      setProgressVisual(next ? 1 : 0);
      return next;
    });
  };

  useEffect(() => {
    if (!isRevealing || hoverRevealEnabledRef.current) return;

    const closeOnOutsidePress = (event) => {
      if (triggerRef.current?.contains(event.target)) return;
      hidePressReveal();
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, [isRevealing]);

  return (
    <div ref={containerRef} className={className}>
      <button
        ref={triggerRef}
        type='button'
        className={clsx(
          triggerClassName,
          isHovering && 'face-reveal__trigger--charging',
          isRevealing && activeClassName
        )}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') showFace();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') hideFace();
        }}
        onMouseEnter={showFace}
        onMouseLeave={hideFace}
        onFocus={(event) => {
          if (!hoverRevealEnabledRef.current) return;
          if (event.currentTarget.matches(':focus-visible')) {
            setProgressVisual(1);
            revealingRef.current = true;
            setIsRevealing(true);
          }
        }}
        onBlur={hideFace}
        onClick={toggleFace}
        aria-pressed={isRevealing}
        aria-label={usePressLabel ? pressLabel : ariaLabel || label}
      >
        <span ref={progressElRef} className='face-reveal__progress' aria-hidden='true' />
        {showDot && <span className='face-reveal__dot' aria-hidden='true' />}
        <span className='face-reveal__label'>{usePressLabel ? pressLabel : label}</span>
      </button>

      <div
        ref={imageContainerRef}
        className={clsx(
          'face-reveal__photo pointer-events-none',
          isRevealing && 'face-reveal__photo--visible',
          !hoverRevealEnabled && 'face-reveal__photo--static'
        )}
        aria-hidden={!isRevealing}
      >
        <div className='face-reveal__photo-inner'>
          <Image
            src='/images/home/profile-hero.jpg'
            alt='Bryan Girado'
            width={280}
            height={280}
            quality={90}
            className='h-full w-full rounded-full object-cover'
            style={{ filter: 'brightness(0.92)' }}
          />
        </div>
      </div>
    </div>
  );
}
