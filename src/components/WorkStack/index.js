'use client';

import { useRef } from 'react';
import workProjects from '@/data/workProjects';
import WorkCard from '@/components/WorkStack/WorkCard';
import { gsap, useGSAP } from '@/lib/gsapClient';
import { revealOnScroll } from '@/lib/scrollParallax';

export default function WorkStack() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.work-stack__item');
      if (!items.length) return undefined;

      const mm = gsap.matchMedia();

      const title = rootRef.current?.querySelector('.work-section__title');

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([title, ...items].filter(Boolean), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealOnScroll(title, { y: 48 });

        items.forEach((item, index) => {
          const columnLag = index % 2 === 0 ? 0 : 36;
          revealOnScroll(item, { lag: columnLag });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div id='projects' ref={rootRef}>
      <h2 className='work-section__title'>Selected Projects</h2>

      <div className='work-stack' role='list'>
        {workProjects.map((project) => (
          <div key={project.title} className='work-stack__item' role='listitem'>
            <WorkCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
