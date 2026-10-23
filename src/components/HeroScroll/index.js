'use client';

import { scrollToTarget } from '@/lib/smoothScroll';

const SCROLL_LABEL = 'Scroll Down';

export default function HeroScroll() {
  return (
    <button
      type='button'
      className='home-hero__scroll hidden lg:flex'
      aria-label='Scroll to selected work'
      onClick={() => scrollToTarget('projects')}
    >
      <span className='home-hero__scroll-text'>
        <span className='home-hero__scroll-text-sizer' aria-hidden='true'>
          {SCROLL_LABEL}
        </span>
        <span className='home-hero__scroll-text-inner'>{SCROLL_LABEL}</span>
      </span>
      <span className='home-hero__scroll-caret' aria-hidden='true' />
    </button>
  );
}
