'use client';

import { clsx } from 'clsx';
import FaceReveal from '@/components/FaceReveal';
import HeroBadgeCharge from '@/components/HeroBadgeCharge';
import { useHeroFaceReveal } from '@/components/HeroFaceRevealContext';

export default function HeroBadges({ className = '', showReveal = true }) {
  const { setFaceRevealed } = useHeroFaceReveal();
  const isDesktopBadges = className.includes('badges--desktop');

  return (
    <div className={clsx('home-hero__badges', className)}>
      {isDesktopBadges ? (
        <HeroBadgeCharge
          label='Available for work'
          className='hero-available-charge face-reveal'
          triggerClassName='hero-badge hero-badge--available face-reveal__trigger'
          activeClassName='hero-badge--available-active'
          showDot
          ariaLabel='Available for work — hover to reveal email'
        />
      ) : (
        <span className='hero-badge hero-badge--available'>
          <span className='hero-badge__dot' aria-hidden='true' />
          Available for work
        </span>
      )}

      {showReveal ? (
        <FaceReveal
          label='Hover to reveal'
          className='hero-face-reveal face-reveal'
          triggerClassName='hero-badge hero-badge--reveal face-reveal__trigger'
          activeClassName='hero-badge--reveal-active face-reveal__trigger--active'
          showDot={false}
          ariaLabel='Hover to reveal my face'
          onRevealChange={isDesktopBadges ? setFaceRevealed : undefined}
          swapInPrompt={isDesktopBadges}
        />
      ) : null}
    </div>
  );
}
