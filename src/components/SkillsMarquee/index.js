'use client';

import MarqueeTrack from '@/components/MarqueeTrack';
import skills from '@/data/skills';

export default function SkillsMarquee() {
  return (
    <div
      className='skills-marquee border-y border-black/10 py-4 lg:py-5'
      data-no-cursor-text
    >
      <MarqueeTrack speed={36}>
        {skills.map((skill) => (
          <span
            key={skill}
            className='skills-marquee__item text-bs-18 text-ink-muted whitespace-nowrap'
          >
            {skill}
          </span>
        ))}
      </MarqueeTrack>
    </div>
  );
}
