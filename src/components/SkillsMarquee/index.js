'use client';

import MarqueeTrack from '@/components/MarqueeTrack';
import skills from '@/data/skills';

export default function SkillsMarquee() {
  return (
    <div className='skills-marquee border-y border-main-gray/20 py-4 lg:py-5'>
      <MarqueeTrack speed={36}>
        {skills.map((skill) => (
          <span
            key={skill}
            className='skills-marquee__item text-sm lg:text-base text-main-gray whitespace-nowrap'
          >
            {skill}
          </span>
        ))}
      </MarqueeTrack>
    </div>
  );
}
