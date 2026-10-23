import { gsap, useGSAP } from '@/lib/gsapClient';

export const TEXT_GENERATE_DEFAULTS = {
  duration: 0.5,
  stagger: 0.045,
  filter: true,
  scrollStart: 'top 88%',
};

export function useTextGenerateReveal(
  scopeRef,
  {
    duration = TEXT_GENERATE_DEFAULTS.duration,
    stagger = TEXT_GENERATE_DEFAULTS.stagger,
    filter = TEXT_GENERATE_DEFAULTS.filter,
    scrollTrigger = false,
    scrollStart = TEXT_GENERATE_DEFAULTS.scrollStart,
  } = {}
) {
  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return undefined;

      const wordNodes = root.querySelectorAll('.text-generate__word');
      if (!wordNodes.length) return undefined;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(wordNodes, { autoAlpha: 1, y: 0, filter: 'none' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const vars = {
          autoAlpha: 0,
          y: 10,
          filter: filter ? 'blur(8px)' : 'none',
          duration,
          stagger,
          ease: 'power2.out',
        };

        if (scrollTrigger) {
          vars.scrollTrigger = {
            trigger: root,
            start: scrollStart,
            once: true,
          };
        }

        gsap.from(wordNodes, vars);
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );
}
