import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsapClient';

export function revealOnScroll(element, { y = 80, lag = 0 } = {}) {
  if (!element) return;

  gsap.fromTo(
    element,
    { autoAlpha: 0, y: y + lag },
    {
      autoAlpha: 1,
      y: 0,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: (self) =>
          Math.min(self.start + window.innerHeight * 0.42, ScrollTrigger.maxScroll(window)),
        scrub: 0.7,
      },
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
          const lagAttr = Number(node.dataset?.revealLag);
          const lag = Number.isFinite(lagAttr) && lagAttr > 0 ? lagAttr : index * 28;
          revealOnScroll(node, { lag });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );
}
