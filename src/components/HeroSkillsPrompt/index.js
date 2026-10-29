'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { useHeroFaceReveal } from '@/components/HeroFaceRevealContext';
import HeroAgentAnimation from '@/components/home/HeroAgentAnimation';

const FACE_SRC = '/images/home/profile-hero.jpg';
export const HERO_CONTACT_EMAIL = 'hello@bryangr.com';

export default function HeroSkillsPrompt() {
  const {
    faceRevealed,
    emailRevealed,
    overlayDismissProgress,
    overlayDismissActive,
    scheduleOverlayDismiss,
    pauseOverlayDismiss,
  } = useHeroFaceReveal();
  const [preferStill, setPreferStill] = useState(false);
  const [swapOnPrompt, setSwapOnPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPreferStill(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setSwapOnPrompt(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!emailRevealed) setCopied(false);
  }, [emailRevealed]);

  const showFaceInPrompt = swapOnPrompt && faceRevealed && !preferStill;
  const showEmailInPrompt = swapOnPrompt && emailRevealed && !preferStill;
  const hideAnimation = showFaceInPrompt || showEmailInPrompt;
  const showDismissRing =
    (showFaceInPrompt || showEmailInPrompt) &&
    (overlayDismissActive || (overlayDismissProgress < 1 && overlayDismissProgress > 0));

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(HERO_CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const dismissRing = showDismissRing ? (
    <span
      className='home-hero__prompt-email-ring'
      style={{ '--email-dismiss-progress': overlayDismissProgress }}
      aria-hidden='true'
    />
  ) : null;

  return (
    <div
      className={clsx(
        'home-hero__prompt',
        showFaceInPrompt && 'home-hero__prompt--face-active',
        showEmailInPrompt && 'home-hero__prompt--email-active'
      )}
      data-no-cursor-text={!showEmailInPrompt}
    >
      <HeroAgentAnimation obscured={hideAnimation} />
      {showFaceInPrompt ? (
        <div
          className='home-hero__prompt-face'
          onPointerEnter={pauseOverlayDismiss}
          onPointerLeave={() => scheduleOverlayDismiss()}
        >
          {dismissRing}
          <div className='home-hero__prompt-face-image'>
            <Image
              src={FACE_SRC}
              alt=''
              fill
              sizes='(min-width: 1024px) 23rem, 78vw'
              quality={90}
              className='home-hero__prompt-media home-hero__prompt-media--face'
              priority
            />
          </div>
        </div>
      ) : null}
      {showEmailInPrompt ? (
        <div
          className='home-hero__prompt-email'
          onPointerEnter={pauseOverlayDismiss}
          onPointerLeave={() => scheduleOverlayDismiss()}
        >
          {dismissRing}
          <p className='home-hero__prompt-email-kicker'>Say hello</p>
          <button
            type='button'
            className='home-hero__prompt-email-copy'
            onClick={copyEmail}
            aria-label={`Copy email ${HERO_CONTACT_EMAIL}`}
          >
            <span className='home-hero__prompt-email-text'>{HERO_CONTACT_EMAIL}</span>
            <span className='home-hero__prompt-email-hint'>
              {copied ? 'Copied' : 'Click to copy'}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
