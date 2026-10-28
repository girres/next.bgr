'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useHeroFaceReveal } from '@/components/HeroFaceRevealContext';

const HOLD_MS = 1300;
const DRAIN_MS = 280;

const HOVER_REVEAL_QUERY = '(hover: hover) and (pointer: fine)';

export default function HeroBadgeCharge({
  label,
  className = 'face-reveal',
  triggerClassName = 'face-reveal__trigger',
  activeClassName = 'face-reveal__trigger--active',
  showDot = false,
  ariaLabel,
}) {
  const {
    setEmailRevealed,
    scheduleEmailDismiss,
    cancelEmailDismiss,
    emailRevealed,
    overlay,
    overlayDismissProgress,
    overlayDismissActive,
  } = useHeroFaceReveal();
  const [isRevealing, setIsRevealing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverRevealEnabled, setHoverRevealEnabled] = useState(true);
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

  const resetChargeUi = useCallback(() => {
    revealingRef.current = false;
    setIsRevealing(false);
    setProgressVisual(0);
  }, []);

  const dismissRunning =
    overlayDismissActive || (overlayDismissProgress < 1 && overlayDismissProgress > 0);

  const emailDismissCountdown =
    emailRevealed &&
    overlay === 'email' &&
    isRevealing &&
    dismissRunning;

  useEffect(() => {
    if (!emailRevealed) {
      resetChargeUi();
      return;
    }
    if (!isRevealing) return;
    if (overlay !== 'email') return;
    if (dismissRunning) {
      setProgressVisual(overlayDismissProgress);
    } else if (!hoveringRef.current) {
      setProgressVisual(1);
    }
  }, [
    emailRevealed,
    isRevealing,
    overlay,
    dismissRunning,
    overlayDismissProgress,
    resetChargeUi,
  ]);

  const syncInteractionMode = useCallback(() => {
    const canHoverReveal = window.matchMedia(HOVER_REVEAL_QUERY).matches;
    hoverRevealEnabledRef.current = canHoverReveal;
    setHoverRevealEnabled(canHoverReveal);
  }, []);

  useEffect(() => {
    syncInteractionMode();
    const hoverRevealQuery = window.matchMedia(HOVER_REVEAL_QUERY);
    hoverRevealQuery.addEventListener('change', syncInteractionMode);
    return () => hoverRevealQuery.removeEventListener('change', syncInteractionMode);
  }, [syncInteractionMode]);

  useEffect(
    () => () => {
      stopLoop();
      cancelEmailDismiss();
    },
    [cancelEmailDismiss]
  );

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
      const next = reduceMotion ? 1 : Math.min(1, progressRef.current + dt / HOLD_MS);
      setProgressVisual(next);
      if (next >= 1) {
        if (!revealingRef.current) {
          revealingRef.current = true;
          setIsRevealing(true);
          setEmailRevealed(true);
        }
        stopLoop();
        return;
      }
    } else if (!revealingRef.current) {
      const next = reduceMotion ? 0 : Math.max(0, progressRef.current - dt / DRAIN_MS);
      setProgressVisual(next);
      if (next <= 0) {
        stopLoop();
        return;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const show = () => {
    if (!hoverRevealEnabledRef.current) return;
    hoveringRef.current = true;
    setIsHovering(true);

    if (overlay === 'face' && dismissRunning) return;
    if (revealingRef.current && overlay === 'email' && dismissRunning) return;
    if (revealingRef.current && overlay === 'email') {
      setProgressVisual(overlayDismissProgress < 1 ? overlayDismissProgress : 1);
      return;
    }

    cancelEmailDismiss();
    startLoop();
  };

  const hide = () => {
    if (!hoverRevealEnabledRef.current) return;
    hoveringRef.current = false;
    setIsHovering(false);

    if (revealingRef.current && overlay === 'email') {
      if (!dismissRunning) {
        scheduleEmailDismiss();
      }
      return;
    }

    startLoop();
  };

  return (
    <div className={className}>
      <button
        type='button'
        className={clsx(
          triggerClassName,
          (isHovering || emailDismissCountdown) && 'face-reveal__trigger--charging',
          (isRevealing || emailDismissCountdown) && activeClassName
        )}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') show();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') hide();
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={(event) => {
          if (!hoverRevealEnabled) return;
          if (event.currentTarget.matches(':focus-visible')) {
            setProgressVisual(1);
            revealingRef.current = true;
            setIsRevealing(true);
            setEmailRevealed(true);
          }
        }}
        onBlur={hide}
        aria-pressed={isRevealing}
        aria-label={ariaLabel || label}
      >
        <span ref={progressElRef} className='face-reveal__progress' aria-hidden='true' />
        {showDot ? <span className='hero-badge__dot' aria-hidden='true' /> : null}
        <span className='face-reveal__label'>{label}</span>
      </button>
    </div>
  );
}
