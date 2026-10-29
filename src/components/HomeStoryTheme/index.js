'use client';

import { useGSAP, ScrollTrigger } from '@/lib/gsapClient';

const DARK_CLASS = 'home-story-dark';

/** Fast ramp in, then stay at full dark for the rest of the zone */
function themeStrength(scrollProgress) {
  const p = Math.min(1, Math.max(0, scrollProgress));
  const ramp = 0.05;
  if (p <= ramp) return p / ramp;
  return 1;
}

let darkModeActive = false;

function applyStoryTheme(scrollProgress) {
  const t = themeStrength(scrollProgress);
  document.documentElement.style.setProperty('--story-t', String(t));

  if (t >= 0.55) darkModeActive = true;
  else if (t <= 0.15) darkModeActive = false;

  document.documentElement.classList.toggle(DARK_CLASS, darkModeActive);
}

export default function HomeStoryTheme() {
  useGSAP(() => {
    const section = document.querySelector('#home-about-section');
    const footer = document.querySelector('.site-footer');
    if (!section || !footer) return undefined;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      endTrigger: footer,
      // Stay in the dark zone through the footer; avoid forward leave at page bottom
      end: 'bottom bottom+=1px',
      scrub: 0.12,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyStoryTheme(self.progress),
      onLeaveBack: () => {
        darkModeActive = false;
        applyStoryTheme(0);
      },
    });

    return () => {
      darkModeActive = false;
      applyStoryTheme(0);
      st.kill();
    };
  }, []);

  return null;
}
