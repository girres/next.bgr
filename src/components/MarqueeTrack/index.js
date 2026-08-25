'use client';

import { useMemo } from 'react';
import { clsx } from 'clsx';

export default function MarqueeTrack({
  children,
  className = '',
  speed = 40,
  direction = 'left',
  pauseOnHover = false,
}) {
  const duration = useMemo(() => Math.max(20, speed), [speed]);

  return (
    <div
      className={clsx(
        'marquee-track',
        direction === 'right' && 'marquee-track--reverse',
        pauseOnHover && 'marquee-track--pause-hover',
        className
      )}
      style={{ '--marquee-duration': `${duration}s` }}
    >
      <div className='marquee-track__group' aria-hidden='false'>
        {children}
      </div>
      <div className='marquee-track__group' aria-hidden='true'>
        {children}
      </div>
    </div>
  );
}
