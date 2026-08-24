'use client';

import { gsap } from '@/lib/gsapClient';

const DEFAULT_DURATION = 1.15;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getHeaderOffset() {
  const header = document.querySelector('.site-header');
  if (!header) return 96;

  const styles = window.getComputedStyle(header);
  const top = Number.parseFloat(styles.top) || 0;
  return Math.round(header.getBoundingClientRect().height + top + 16);
}

export function scrollToTarget(target, { duration = DEFAULT_DURATION } = {}) {
  const reduceMotion = prefersReducedMotion();
  const vars = {
    duration: reduceMotion ? 0.01 : duration,
    ease: 'power3.inOut',
    overwrite: true,
  };

  if (target === 0 || target === 'top') {
    vars.scrollTo = { y: 0, autoKill: true };
    return gsap.to(window, vars);
  }

  const element =
    typeof target === 'string'
      ? document.getElementById(target.replace(/^#/, ''))
      : target;

  if (!element) return undefined;

  vars.scrollTo = {
    y: element,
    offsetY: getHeaderOffset(),
    autoKill: true,
  };

  return gsap.to(window, vars);
}
