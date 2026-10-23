'use client';

import { useRef } from 'react';
import { useScrollReveal } from '@/lib/scrollParallax';

export default function ScrollReveal({ children, className }) {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
