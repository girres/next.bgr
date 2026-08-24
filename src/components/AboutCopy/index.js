'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function ScrollHighlight({ children, index, total, scrollYProgress }) {
  const reduceMotion = useReducedMotion();
  const start = 0.06 + (index / total) * 0.88;
  const end = Math.min(start + 0.08, 0.98);

  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['rgb(120, 130, 140)', 'rgb(208, 219, 224)']
  );

  if (reduceMotion) {
    return <span className='text-main-white'>{children}</span>;
  }

  return (
    <motion.span className='about-highlight inline' style={{ color }}>
      {children}
    </motion.span>
  );
}

export default function AboutCopy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.35'],
  });

  const highlights = [
    'user experiences (UX)',
    'interfaces (UI)',
    'digital products',
    'business strategy',
    'End-to-End Product Design',
    'SaaS/B2B',
    'In-Flight Entertainment (IFE)',
    'UX research',
    'UI design',
    'Front-End Development',
    'engineering teams',
    'product quality',
    'functional, scalable systems',
  ];

  let highlightIndex = 0;

  const nextHighlight = (text) => {
    const current = highlightIndex;
    highlightIndex += 1;
    return (
      <ScrollHighlight
        key={`${text}-${current}`}
        index={current}
        total={highlights.length}
        scrollYProgress={scrollYProgress}
      >
        {text}
      </ScrollHighlight>
    );
  };

  return (
    <div
      ref={containerRef}
      className='about-copy'
    >
      <p>
        Since 2019, I&apos;ve been designing intuitive {nextHighlight('user experiences (UX)')},
        crafting polished {nextHighlight('interfaces (UI)')}, and building{' '}
        {nextHighlight('digital products')} that bridge user needs,{' '}
        {nextHighlight('business strategy')}, and technical execution. With over 5+ years in the
        industry, my path has evolved into {nextHighlight('End-to-End Product Design')}, creating
        solutions across {nextHighlight('SaaS/B2B')} platforms, B2C products, e-commerce, and
        complex environments like {nextHighlight('In-Flight Entertainment (IFE)')}.
      </p>
      <p>
        My approach goes beyond delivering static design files. By combining deep{' '}
        {nextHighlight('UX research')} and {nextHighlight('UI design')} with hands-on{' '}
        {nextHighlight('Front-End Development')}, I write modular code and work alongside{' '}
        {nextHighlight('engineering teams')} to eliminate handoff friction and ensure top-tier{' '}
        {nextHighlight('product quality')} in production.
      </p>
      <p>
        I don&apos;t just design interfaces — I build{' '}
        {nextHighlight('functional, scalable systems')}.
      </p>
    </div>
  );
}
