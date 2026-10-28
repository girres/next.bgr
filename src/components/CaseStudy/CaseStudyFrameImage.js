'use client';

import { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

export default function CaseStudyFrameImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  placeholderLabel,
}) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className={clsx('case-study__frame-media', 'case-study__frame-placeholder')} role='img' aria-label={alt}>
        <span className='case-study__frame-placeholder-label'>{placeholderLabel || alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      quality={85}
      priority={priority}
      onError={() => setMissing(true)}
    />
  );
}
