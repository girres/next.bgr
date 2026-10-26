'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { MediaFrame } from './CaseStudyMedia';

const SLIDE_MS = 600;
const VISIBLE = 2;

export default function CaseStudyPairRotator({ blocks, title, interval = 3000 }) {
  const stageRef = useRef(null);
  const [page, setPage] = useState(0);
  const [instant, setInstant] = useState(false);
  const [step, setStep] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const loopSlides = [...blocks, ...blocks.slice(0, VISIBLE)];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion) return undefined;

    const measure = () => {
      const slide = stage.querySelector('.case-study__pair-slide');
      const track = stage.querySelector('.case-study__pair-track');
      if (!slide || !track) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setStep(slide.getBoundingClientRect().width + gap);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [reduceMotion, blocks.length]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(motion.matches);
    sync();
    motion.addEventListener('change', sync);

    if (motion.matches || blocks.length <= VISIBLE) {
      return () => motion.removeEventListener('change', sync);
    }

    let timer = 0;

    const queue = (delay, run) => {
      timer = window.setTimeout(run, delay);
    };

    const schedule = (delay, index) => {
      queue(delay, () => {
        const next = index + 1;
        setInstant(false);
        setPage(next);

        if (next >= blocks.length) {
          queue(SLIDE_MS, () => {
            setInstant(true);
            setPage(0);
            schedule(Math.max(interval - SLIDE_MS, 0), 0);
          });
          return;
        }

        schedule(interval, next);
      });
    };

    schedule(interval, 0);

    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener('change', sync);
    };
  }, [interval, blocks.length]);

  if (reduceMotion) {
    return (
      <div className='case-study__media case-study__media--grid'>
        {blocks.map((block, index) => (
          <MediaFrame
            key={block.src}
            block={block}
            alt={block.alt || `${title} visual ${index + 1}`}
            ratio='standard'
            sizes='(min-width: 768px) 45vw, 50vw'
          />
        ))}
      </div>
    );
  }

  return (
    <div className='case-study__pair-stage' ref={stageRef}>
      <div
        className={clsx('case-study__pair-track', instant && 'case-study__pair-track--instant')}
        style={{ transform: `translateX(-${page * step}px)` }}
      >
        {loopSlides.map((block, index) => (
          <div
            className='case-study__pair-slide'
            key={`${block.src}-${index}`}
            aria-hidden={index !== page && index !== page + 1}
          >
            <MediaFrame
              block={block}
              alt={block.alt || `${title} visual ${(index % blocks.length) + 1}`}
              ratio='standard'
              sizes='(min-width: 768px) 45vw, 50vw'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
