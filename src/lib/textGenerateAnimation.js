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
    instant = false,
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
        gsap.set(wordNodes, { opacity: 1, filter: 'none' });
      });

      if (instant) {
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.set(wordNodes, { opacity: 1, filter: 'none' });
        });
        return () => mm.revert();
      }

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Opacity only — visibility stays visible so the block keeps its height (no scroll jump).
        gsap.set(wordNodes, {
          opacity: 0,
          visibility: 'visible',
          filter: filter ? 'blur(8px)' : 'none',
        });

        const tweenVars = {
          opacity: 1,
          filter: 'none',
          duration,
          stagger,
          ease: 'power2.out',
          clearProps: filter ? 'filter' : '',
        };

        if (scrollTrigger) {
          tweenVars.scrollTrigger = {
            trigger: root,
            start: scrollStart,
            once: true,
          };
        }

        gsap.to(wordNodes, tweenVars);
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );
}
