'use client';

import { useEffect, useRef } from 'react';

export default function CaseStudyVideo({ src, type, alt, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return undefined;

    const play = () => {
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      muted
      playsInline
      preload='metadata'
      aria-label={alt}
    >
      <source src={src} type={type} />
    </video>
  );
}
