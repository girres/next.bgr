'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export const OVERLAY_DISMISS_MS = 2300;
/** @deprecated use OVERLAY_DISMISS_MS */
export const EMAIL_DISMISS_MS = OVERLAY_DISMISS_MS;

const HeroFaceRevealContext = createContext(null);

export function HeroFaceRevealProvider({ children }) {
  const [overlay, setOverlay] = useState(null);
  const [overlayDismissProgress, setOverlayDismissProgress] = useState(1);
  const [overlayDismissActive, setOverlayDismissActive] = useState(false);

  const dismissCompleteRef = useRef(null);
  const remainingMsRef = useRef(OVERLAY_DISMISS_MS);
  const totalMsRef = useRef(OVERLAY_DISMISS_MS);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);

  const stopDismissLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const finishDismiss = useCallback(() => {
    stopDismissLoop();
    remainingMsRef.current = 0;
    setOverlayDismissProgress(0);
    setOverlayDismissActive(false);
    setOverlay((current) => (current === 'email' || current === 'face' ? null : current));
    dismissCompleteRef.current?.();
    dismissCompleteRef.current = null;
  }, [stopDismissLoop]);

  const dismissTick = useCallback(
    (now) => {
      const last = lastTsRef.current || now;
      const dt = now - last;
      lastTsRef.current = now;
      remainingMsRef.current = Math.max(0, remainingMsRef.current - dt);
      setOverlayDismissProgress(remainingMsRef.current / totalMsRef.current);

      if (remainingMsRef.current <= 0) {
        finishDismiss();
        return;
      }

      rafRef.current = requestAnimationFrame(dismissTick);
    },
    [finishDismiss]
  );

  const startDismissLoop = useCallback(() => {
    stopDismissLoop();
    lastTsRef.current = 0;
    setOverlayDismissActive(true);
    rafRef.current = requestAnimationFrame(dismissTick);
  }, [dismissTick, stopDismissLoop]);

  /** Pausa el timer; conserva tiempo restante y callback de cierre. */
  const pauseOverlayDismiss = useCallback(() => {
    stopDismissLoop();
    setOverlayDismissActive(false);
  }, [stopDismissLoop]);

  const cancelOverlayDismiss = useCallback(() => {
    stopDismissLoop();
    dismissCompleteRef.current = null;
    remainingMsRef.current = OVERLAY_DISMISS_MS;
    totalMsRef.current = OVERLAY_DISMISS_MS;
    setOverlayDismissProgress(1);
    setOverlayDismissActive(false);
  }, [stopDismissLoop]);

  const scheduleOverlayDismiss = useCallback(
    (onComplete, delayMs) => {
      if (typeof onComplete === 'function') {
        dismissCompleteRef.current = onComplete;
      }

      if (typeof delayMs === 'number') {
        remainingMsRef.current = delayMs;
        totalMsRef.current = delayMs;
      } else if (remainingMsRef.current <= 0) {
        remainingMsRef.current = OVERLAY_DISMISS_MS;
        totalMsRef.current = OVERLAY_DISMISS_MS;
      }

      setOverlayDismissProgress(remainingMsRef.current / totalMsRef.current);
      startDismissLoop();
    },
    [startDismissLoop]
  );

  const setFaceRevealed = useCallback(
    (revealed) => {
      if (revealed) {
        cancelOverlayDismiss();
        setOverlay('face');
        return;
      }
      cancelOverlayDismiss();
      setOverlay((current) => (current === 'face' ? null : current));
    },
    [cancelOverlayDismiss]
  );

  const setEmailRevealed = useCallback(
    (revealed) => {
      if (revealed) {
        cancelOverlayDismiss();
        setOverlay('email');
        return;
      }
      cancelOverlayDismiss();
      setOverlay((current) => (current === 'email' ? null : current));
    },
    [cancelOverlayDismiss]
  );

  useEffect(
    () => () => {
      stopDismissLoop();
    },
    [stopDismissLoop]
  );

  const value = useMemo(
    () => ({
      overlay,
      faceRevealed: overlay === 'face',
      emailRevealed: overlay === 'email',
      overlayDismissProgress,
      overlayDismissActive,
      emailDismissProgress: overlayDismissProgress,
      emailDismissActive: overlayDismissActive,
      setFaceRevealed,
      setEmailRevealed,
      scheduleOverlayDismiss,
      pauseOverlayDismiss,
      cancelOverlayDismiss,
      scheduleEmailDismiss: scheduleOverlayDismiss,
      pauseEmailDismiss: pauseOverlayDismiss,
      cancelEmailDismiss: cancelOverlayDismiss,
      clearEmailDismiss: pauseOverlayDismiss,
      overlayDismissMs: OVERLAY_DISMISS_MS,
      emailDismissMs: OVERLAY_DISMISS_MS,
    }),
    [
      overlay,
      overlayDismissProgress,
      overlayDismissActive,
      setFaceRevealed,
      setEmailRevealed,
      scheduleOverlayDismiss,
      pauseOverlayDismiss,
      cancelOverlayDismiss,
    ]
  );

  return (
    <HeroFaceRevealContext.Provider value={value}>{children}</HeroFaceRevealContext.Provider>
  );
}

export function useHeroFaceReveal() {
  const ctx = useContext(HeroFaceRevealContext);
  if (!ctx) {
    return {
      overlay: null,
      faceRevealed: false,
      emailRevealed: false,
      overlayDismissProgress: 1,
      overlayDismissActive: false,
      emailDismissProgress: 1,
      emailDismissActive: false,
      setFaceRevealed: () => {},
      setEmailRevealed: () => {},
      scheduleOverlayDismiss: () => {},
      pauseOverlayDismiss: () => {},
      cancelOverlayDismiss: () => {},
      scheduleEmailDismiss: () => {},
      pauseEmailDismiss: () => {},
      cancelEmailDismiss: () => {},
      clearEmailDismiss: () => {},
      overlayDismissMs: OVERLAY_DISMISS_MS,
      emailDismissMs: OVERLAY_DISMISS_MS,
    };
  }
  return ctx;
}
