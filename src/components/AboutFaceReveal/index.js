'use client';

import FaceReveal from '@/components/FaceReveal';

export default function AboutFaceReveal() {
  return (
    <FaceReveal
      label='Hover to reveal'
      className='about-face-reveal face-reveal'
      triggerClassName='hero-badge hero-badge--reveal face-reveal__trigger'
      activeClassName='hero-badge--reveal-active face-reveal__trigger--active'
      showDot={false}
      ariaLabel='Hover to reveal my face'
    />
  );
}
