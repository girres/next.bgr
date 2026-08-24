'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

const HOLD_MS = 1300;
const DRAIN_MS = 280;

const PRESS_LABEL_QUERY = '(hover: none), (max-width: 1023px)';

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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [usePressLabel, setUsePressLabel] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const progressElRef = useRef(null);
  const progressRef = useRef(0);
  const hoveringRef = useRef(false);
  const revealingRef = useRef(false);
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

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: none)');
    const pressQuery = window.matchMedia(PRESS_LABEL_QUERY);

    const syncPointer = () => setIsTouchDevice(hoverQuery.matches);
    const syncLabel = () => setUsePressLabel(pressQuery.matches);

    syncPointer();
    syncLabel();
    hoverQuery.addEventListener('change', syncPointer);
    pressQuery.addEventListener('change', syncLabel);

    return () => {
      hoverQuery.removeEventListener('change', syncPointer);
      pressQuery.removeEventListener('change', syncLabel);
    };
  }, []);

  useEffect(() => {
    revealingRef.current = isRevealing;
  }, [isRevealing]);

  useEffect(() => {
    if ((!isRevealing && !isHovering) || isTouchDevice) return;

    const handleMouseMove = (event) => {
      if (!containerRef.current || !imageContainerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      imageContainerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isRevealing, isHovering, isTouchDevice]);

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
    if (isTouchDevice || usePressLabel) return;
    hoveringRef.current = true;
    setIsHovering(true);
    startLoop();
  };

  const hideFace = () => {
    if (isTouchDevice || usePressLabel) return;
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
    if (!isTouchDevice && !usePressLabel) return;
    setIsRevealing((current) => {
      const next = !current;
      revealingRef.current = next;
      setProgressVisual(next ? 1 : 0);
      return next;
    });
  };

  useEffect(() => {
    if (!isRevealing || (!isTouchDevice && !usePressLabel)) return;

    const closeOnOutsidePress = (event) => {
      if (triggerRef.current?.contains(event.target)) return;
      hidePressReveal();
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, [isRevealing, isTouchDevice, usePressLabel]);

  return (
    <div ref={containerRef} className={className} onMouseLeave={hideFace}>
      <button
        ref={triggerRef}
        type='button'
        className={clsx(
          triggerClassName,
          isHovering && 'face-reveal__trigger--charging',
          isRevealing && activeClassName
        )}
        onMouseEnter={showFace}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) {
            setProgressVisual(1);
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
          isTouchDevice && 'face-reveal__photo--static'
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
