'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

const MOBILE_MEDIA_QUERY = '(max-width: 1023px)';

export default function CaseStudyVideo({ src, type, alt, className }) {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

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

    if (isMobile) {
      video.loop = true;
      video.controls = false;
      video.setAttribute('webkit-playsinline', '');

      const onReady = () => play();
      video.addEventListener('loadeddata', onReady);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) play();
          else video.pause();
        },
        { threshold: 0.1, rootMargin: '0px 0px 8% 0px' }
      );

      observer.observe(video);
      return () => {
        video.removeEventListener('loadeddata', onReady);
        observer.disconnect();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <video
      ref={videoRef}
      className={clsx(className, isMobile && 'case-study__frame-media--locked')}
      src={src}
      controls={!isMobile}
      autoPlay={isMobile}
      loop={isMobile}
      muted
      playsInline
      preload={isMobile ? 'auto' : 'metadata'}
      controlsList={isMobile ? 'nodownload nofullscreen noremoteplayback noplaybackrate' : undefined}
      disablePictureInPicture={isMobile}
      disableRemotePlayback={isMobile}
      tabIndex={isMobile ? -1 : undefined}
      aria-label={alt}
      onContextMenu={isMobile ? (event) => event.preventDefault() : undefined}
    >
      <source src={src} type={type} />
    </video>
  );
}
