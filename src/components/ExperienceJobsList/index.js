'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import ScrollReveal from '@/components/ScrollReveal';

const FADE_ZONE = 88;

function JobCard({ job }) {
  const content = (
    <div className='job-card glass-card flex items-start sm:items-center justify-between text-main-gray p-4 lg:p-6 rounded-[24px] lg:rounded-[30px] gap-3'>
      <div className='flex items-center gap-3 lg:gap-5 min-w-0'>
        <div
          className={clsx(
            'relative w-[45px] h-[45px] lg:w-[50px] lg:h-[50px] flex-shrink-0',
            job.image.endsWith('.svg') && 'bg-white rounded-xl overflow-hidden'
          )}
        >
          <Image
            src={job.image}
            alt={job.title}
            fill
            sizes='(min-width: 1024px) 50px, 45px'
            quality={75}
            loading='lazy'
            unoptimized={job.image.endsWith('.svg')}
            className={clsx(
              'object-contain',
              job.image.endsWith('.svg') ? 'p-1' : 'rounded-xl'
            )}
          />
        </div>
        <div>
          <h3 className='text-main-white text-base lg:text-lg font-medium leading-snug'>{job.title}</h3>
          <p className='text-xs lg:text-base font-light'>{job.position}</p>
        </div>
      </div>
      <p className='text-xs lg:text-base font-light text-right min-w-fit pl-3 lg:pl-4 opacity-70'>
        {job.date}
      </p>
    </div>
  );

  if (!job.href) return content;

  return (
    <Link
      href={job.href}
      target='_blank'
      rel='noopener noreferrer'
      className='block'
    >
      {content}
    </Link>
  );
}

function getCardBlurStyle(card, containerRect, reducedMotion, scrollTop) {
  if (reducedMotion) return {};

  const rect = card.getBoundingClientRect();
  const topOverlap = containerRect.top - rect.top;
  const bottomOverlap = rect.bottom - containerRect.bottom;

  let intensity = 0;

  if (scrollTop > 1 && topOverlap > 0) {
    intensity = Math.max(intensity, Math.min(topOverlap / FADE_ZONE, 1));
  }

  if (bottomOverlap > 0) {
    intensity = Math.max(intensity, Math.min(bottomOverlap / FADE_ZONE, 1));
  }

  if (intensity <= 0.02) return {};

  const blur = intensity * 5;
  const opacity = 1 - intensity * 0.55;
  const scale = 1 - intensity * 0.04;

  return {
    filter: `blur(${blur}px)`,
    opacity,
    transform: `scale(${scale})`,
  };
}

export default function ExperienceJobsList({ items }) {
  const scrollRef = useRef(null);
  const [blurStyles, setBlurStyles] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const updateBlur = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    setIsScrolled(scrollTop > 1);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const containerRect = container.getBoundingClientRect();
    const cards = container.querySelectorAll('[data-job-card]');

    setBlurStyles(
      Array.from(cards).map((card) =>
        getCardBlurStyle(card, containerRect, reducedMotion, scrollTop)
      )
    );
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateBlur();

    container.addEventListener('scroll', updateBlur, { passive: true });
    window.addEventListener('resize', updateBlur);

    const resizeObserver = new ResizeObserver(updateBlur);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateBlur);
      window.removeEventListener('resize', updateBlur);
      resizeObserver.disconnect();
    };
  }, [updateBlur, items.length]);

  return (
    <div
      className={clsx(
        'jobs-scroll-shell',
        isScrolled && 'jobs-scroll-shell--scrolled'
      )}
    >
      <div
        ref={scrollRef}
        className='jobs jobs-scroll space-y-3 lg:space-y-4'
      >
        {items.map((job, index) => (
          <div
            key={job.title}
            data-job-card
            style={blurStyles[index]}
            className='origin-center transition-[filter,opacity,transform] duration-200 ease-out motion-reduce:transition-none'
          >
            <ScrollReveal delay={index * 0.1}>
              <JobCard job={job} />
            </ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  );
}
