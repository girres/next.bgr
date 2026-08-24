'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import FaceReveal from '@/components/FaceReveal';
import AwardCelebrationModal from '@/components/AwardCelebrationModal';

export default function HeroBadges({ className = '' }) {
  const [isAwardOpen, setIsAwardOpen] = useState(false);

  return (
    <>
      <div className={clsx('home-hero__badges', className)}>
        <span className='hero-badge hero-badge--available'>
          <span className='hero-badge__dot' aria-hidden='true' />
          Available for work
        </span>

        <FaceReveal
          label='Hover to reveal'
          className='hero-face-reveal face-reveal'
          triggerClassName='hero-badge hero-badge--reveal face-reveal__trigger'
          activeClassName='hero-badge--reveal-active face-reveal__trigger--active'
          showDot={false}
          ariaLabel='Hover to reveal my face'
        />

        <button
          type='button'
          className='hero-badge hero-badge--award'
          onClick={() => setIsAwardOpen(true)}
          aria-haspopup='dialog'
        >
          Best Onboard Entertainment
        </button>
      </div>

      <AwardCelebrationModal isOpen={isAwardOpen} onClose={() => setIsAwardOpen(false)} />
    </>
  );
}
