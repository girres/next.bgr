'use client';

import { clsx } from 'clsx';
import FaceReveal from '@/components/FaceReveal';

export default function HeroBadges({ className = '' }) {
  return (
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
    </div>
  );
}
