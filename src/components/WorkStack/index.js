'use client';

import workProjects from '@/data/workProjects';
import WorkCard from '@/components/WorkStack/WorkCard';

export default function WorkStack() {
  return (
    <div id='projects'>
      <p className='text-main-gray text-xs lg:text-sm uppercase tracking-widest mb-3'>
        Selected Projects
      </p>
      <h2 className='mb-8 lg:mb-12'>Work</h2>

      <div className='work-stack'>
        {workProjects.map((project, index) => (
          <div
            key={project.title}
            className='work-stack__item'
            style={{ '--stack-index': index }}
          >
            <WorkCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
