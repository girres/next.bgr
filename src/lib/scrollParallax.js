import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsapClient';

const REVEAL_DEFAULTS = {
  duration: 0.85,
  ease: 'power3.out',
  y: 72,
  start: 'top 88%',
};

function clearRevealTransform(targets) {
  gsap.set(targets, { clearProps: 'transform' });
}

function revealDelayFromDataset(node, index) {
  const lagAttr = node.dataset?.revealLag;
  if (lagAttr !== undefined && lagAttr !== '') {
    const parsed = Number(lagAttr);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed / 1000;
    }
  }
  return index * 0.07;
}

function revealYFromDataset(node, index) {
  const yAttr = node.dataset?.revealY;
  if (yAttr !== undefined && yAttr !== '') {
    const parsed = Number(yAttr);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  const lagAttr = Number(node.dataset?.revealLag);
  if (Number.isFinite(lagAttr) && lagAttr > 0) {
    return REVEAL_DEFAULTS.y + lagAttr * 0.35;
  }
  return REVEAL_DEFAULTS.y + (index % 3) * 12;
}

/**
 * Enter animation when the element scrolls into view (once — not scrubbed to scroll).
 */
export function revealOnScroll(
  element,
  {
    y = REVEAL_DEFAULTS.y,
    delay = 0,
    start = REVEAL_DEFAULTS.start,
    duration = REVEAL_DEFAULTS.duration,
  } = {}
) {
  if (!element) return;

  gsap.fromTo(
    element,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      ease: REVEAL_DEFAULTS.ease,
      scrollTrigger: {
        trigger: element,
        start,
        once: true,
        invalidateOnRefresh: true,
      },
      onComplete: () => clearRevealTransform(element),
    }
  );
}

/**
 * Reveal each element when it enters the viewport (best for tall grids / card stacks).
 */
export function revealEachInView(
  elements,
  {
    start = 'top 92%',
    duration = REVEAL_DEFAULTS.duration,
    yEven = 88,
    yOdd = 108,
    delayOdd = 0.06,
  } = {}
) {
  const targets = gsap.utils.toArray(elements).filter(Boolean);
  if (!targets.length) return;

  gsap.set(targets, { autoAlpha: 0 });

  ScrollTrigger.batch(targets, {
    start,
    once: true,
    invalidateOnRefresh: true,
    onEnter: (batch) => {
      batch.forEach((el) => {
        const index = targets.indexOf(el);
        const isOddColumn = index % 2 === 1;

        gsap.fromTo(
          el,
          { autoAlpha: 0, y: isOddColumn ? yOdd : yEven },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay: isOddColumn ? delayOdd : 0,
            ease: REVEAL_DEFAULTS.ease,
            overwrite: 'auto',
            onComplete: () => clearRevealTransform(el),
          }
        );
      });
    },
  });
}

/** Staggered reveal for a group sharing one scroll trigger (short groups only). */
export function revealBatch(
  elements,
  {
    trigger,
    y = 80,
    stagger = 0.11,
    start = 'top 86%',
    duration = REVEAL_DEFAULTS.duration,
  } = {}
) {
  const targets = gsap.utils.toArray(elements).filter(Boolean);
  if (!targets.length) return;

  const triggerEl = trigger || targets[0];

  gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      ease: REVEAL_DEFAULTS.ease,
      scrollTrigger: {
        trigger: triggerEl,
        start,
        once: true,
        invalidateOnRefresh: true,
      },
      onComplete: () => clearRevealTransform(targets),
    }
  );
}

export function useScrollReveal(rootRef) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return undefined;

      const marked = gsap.utils.toArray('[data-reveal]', root);
      const nodes = marked.length ? marked : [root];

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(nodes, { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        nodes.forEach((node, index) => {
          const delay = revealDelayFromDataset(node, index);
          const y = revealYFromDataset(node, index);
          revealOnScroll(node, { delay, y });
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === 'complete') {
        requestAnimationFrame(refresh);
      } else {
        window.addEventListener('load', refresh, { once: true });
      }

      return () => mm.revert();
    },
    { scope: rootRef }
  );
}
