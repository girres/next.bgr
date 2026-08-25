'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsapClient';

const CONFETTI_COLORS = ['#4f7cff', '#5b8cff', '#ffc857', '#33fe00', '#ffffff', '#d0dbe0'];

function burstConfetti(container, origin) {
  const isMobile = window.innerWidth < 768;
  const burstCount = isMobile ? 52 : 88;
  const rainCount = isMobile ? 24 : 40;
  const pieces = [];
  const fragment = document.createDocumentFragment();

  const createPiece = (isRain) => {
    const piece = document.createElement('span');
    const isRound = Math.random() > 0.68;
    const width = gsap.utils.random(5, 13);
    const height = isRound ? width : gsap.utils.random(4, 9);

    piece.className = `award-modal__confetti-piece${isRain ? ' is-rain' : ''}`;
    piece.style.width = `${width}px`;
    piece.style.height = `${height}px`;
    piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.borderRadius = isRound ? '50%' : '1px';
    fragment.appendChild(piece);
    pieces.push(piece);
    return piece;
  };

  for (let index = 0; index < burstCount; index += 1) createPiece(false);
  for (let index = 0; index < rainCount; index += 1) createPiece(true);

  container.appendChild(fragment);

  const timeline = gsap.timeline({
    onComplete: () => {
      pieces.forEach((piece) => piece.remove());
    },
  });

  pieces.forEach((piece, index) => {
    const isRain = piece.classList.contains('is-rain');
    const duration = isRain ? gsap.utils.random(5.4, 7.6) : gsap.utils.random(4.4, 6.4);
    const delay = isRain ? gsap.utils.random(0.12, 0.6) : index * 0.005;
    const fadeAt = duration * 0.58;

    gsap.set(piece, {
      x: isRain ? gsap.utils.random(0, window.innerWidth) : origin.x,
      y: isRain ? gsap.utils.random(-90, -24) : origin.y,
      xPercent: -50,
      yPercent: -50,
      rotation: gsap.utils.random(0, 360),
      autoAlpha: 1,
      force3D: true,
    });

    timeline.to(
      piece,
      {
        duration,
        physics2D: {
          velocity: isRain ? gsap.utils.random(70, 210) : gsap.utils.random(340, 980),
          angle: isRain ? gsap.utils.random(78, 102) : gsap.utils.random(0, 360),
          gravity: isRain ? gsap.utils.random(260, 440) : gsap.utils.random(500, 820),
          friction: isRain ? 0.04 : 0.07,
        },
        rotation: `+=${gsap.utils.random(480, 1120) * (Math.random() > 0.5 ? 1 : -1)}`,
        ease: 'none',
      },
      delay
    );

    timeline.to(
      piece,
      {
        autoAlpha: 0,
        duration: duration - fadeAt,
        ease: 'power1.in',
      },
      delay + fadeAt
    );
  });

  return () => {
    timeline.kill();
    pieces.forEach((piece) => piece.remove());
  };
}

export default function AwardCelebrationModal({
  isOpen,
  onClose,
  title = 'Best Onboard Entertainment',
  logo = '/images/home/cabinConcept.png',
  projectHref = '/saudia-airlines',
  awardHref = 'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
}) {
  const rootRef = useRef(null);
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);
  const logoRef = useRef(null);
  const confettiRef = useRef(null);
  const closeButtonRef = useRef(null);
  const stopConfettiRef = useRef(() => {});
  const [isRendered, setIsRendered] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) setIsRendered(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isRendered) return undefined;

    const html = document.documentElement;
    html.classList.add('award-modal-open');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      html.classList.remove('award-modal-open');
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });
    };
  }, [isRendered, handleClose]);

  useGSAP(
    (context, contextSafe) => {
      if (!isRendered) return undefined;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const backdrop = backdropRef.current;
      const dialog = dialogRef.current;
      const finishClose = contextSafe(() => setIsRendered(false));

      if (isOpen) {
        closeButtonRef.current?.focus();

        gsap.set(backdrop, { autoAlpha: 0 });
        gsap.set(dialog, { autoAlpha: 0, scale: 0.9, y: 36 });

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        intro.to(backdrop, { autoAlpha: 1, duration: reduceMotion ? 0.01 : 0.4 }, 0);
        intro.to(
          dialog,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: reduceMotion ? 0.01 : 0.7,
            ease: 'back.out(1.5)',
          },
          0.06
        );

        if (!reduceMotion && confettiRef.current && logoRef.current) {
          gsap.delayedCall(0.18, () => {
            const rect = logoRef.current?.getBoundingClientRect();
            if (!rect || !confettiRef.current) return;
            stopConfettiRef.current = burstConfetti(confettiRef.current, {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          });
        }
      } else {
        stopConfettiRef.current();
        stopConfettiRef.current = () => {};

        if (!backdrop || !dialog) {
          finishClose();
          return undefined;
        }

        const outro = gsap.timeline({
          defaults: { ease: 'power2.in' },
          onComplete: finishClose,
        });
        outro.to(dialog, { autoAlpha: 0, scale: 0.96, y: 16, duration: reduceMotion ? 0.01 : 0.28 }, 0);
        outro.to(backdrop, { autoAlpha: 0, duration: reduceMotion ? 0.01 : 0.22 }, 0);
        if (confettiRef.current) {
          outro.to(confettiRef.current, { autoAlpha: 0, duration: reduceMotion ? 0.01 : 0.24 }, 0);
        }
      }

      return () => {
        stopConfettiRef.current();
      };
    },
    { dependencies: [isOpen, isRendered, handleClose], scope: rootRef }
  );

  if (typeof document === 'undefined' || !isRendered) return null;

  return createPortal(
    <div ref={rootRef} className='award-modal' role='presentation'>
      <button
        ref={backdropRef}
        type='button'
        className='award-modal__backdrop'
        aria-label='Close award celebration'
        onClick={handleClose}
      />

      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby='award-modal-title'
        className='award-modal__dialog'
      >
        <button
          ref={closeButtonRef}
          type='button'
          className='award-modal__close'
          aria-label='Close'
          onClick={handleClose}
        >
          ×
        </button>

        <div ref={logoRef} className='award-modal__logo-wrap'>
          <Image
            src={logo}
            alt='Cabin Concept award'
            width={120}
            height={120}
            className='award-modal__logo'
            priority
          />
        </div>

        <p className='award-modal__kicker'>Award Winner</p>
        <h2 id='award-modal-title' className='award-modal__title'>
          {title}
        </h2>

        <div className='award-modal__actions'>
          <Link href={projectHref} className='award-modal__btn award-modal__btn--primary' onClick={handleClose}>
            View project
          </Link>
          <a
            href={awardHref}
            target='_blank'
            rel='noopener noreferrer'
            className={clsx('award-modal__btn', 'award-modal__btn--secondary')}
            onClick={handleClose}
          >
            View award
          </a>
        </div>
      </div>

      <div ref={confettiRef} className='award-modal__confetti' aria-hidden='true' />
    </div>,
    document.body
  );
}
