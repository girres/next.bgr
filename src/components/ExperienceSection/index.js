'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AboutCopy from '@/components/AboutCopy';
import AboutFaceReveal from '@/components/AboutFaceReveal';
import skills from '@/data/skills';
import { gsap, useGSAP } from '@/lib/gsapClient';
import { revealOnScroll } from '@/lib/scrollParallax';

const jobs = [
  {
    title: 'Performanze',
    position: 'End-to-end Product Designer',
    date: '2026 - Current',
    href: 'https://www.performanze.com/en',
  },
  {
    title: 'Nuela',
    position: 'End-to-end Product Designer',
    date: '2024 - 2026',
  },
  {
    title: 'Future Provenance',
    position: 'UX/UI & Digital Product Designer',
    date: '2022 - 2024',
  },
  {
    title: 'GR Development',
    position: 'UI & Digital Product Designer',
    date: '2020 - 2023',
  },
  {
    title: 'Freelancer',
    position: 'Product designer & AI Builder',
    date: '2020 - Current',
  },
];

const awards = [
  {
    title: 'Best Onboard Entertainment',
    href: 'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
  },
];

export default function ExperienceSection() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const story = rootRef.current?.querySelector('.about-story');
      const experience = rootRef.current?.querySelector(
        '.experience-panels__section--experience'
      );
      const skillsBlock = rootRef.current?.querySelector(
        '.experience-panels__section--skills'
      );
      const awardsBlock = rootRef.current?.querySelector(
        '.experience-panels__section--awards'
      );
      const blocks = [story, experience, skillsBlock, awardsBlock].filter(Boolean);

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(blocks, { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealOnScroll(story, { y: 64 });
        revealOnScroll(experience, { y: 80 });
        revealOnScroll(skillsBlock, { y: 80, lag: 36 });
        revealOnScroll(awardsBlock, { y: 80, lag: 52 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div id='experience' ref={rootRef}>
      <section className='about-story'>
        <h2 className='about-story__title'>My Story</h2>

        <div className='about-story__body'>
          <div className='about-story__copy'>
            <AboutCopy />
          </div>
          <aside className='about-story__meta'>
            <p className='about-story__name'>Bryan Girado</p>
            <p>End-to-End Product Designer</p>
            <AboutFaceReveal />
          </aside>
        </div>
      </section>

      <div className='experience-panels'>
        <section className='experience-panels__section experience-panels__section--experience'>
          <h2 className='experience-panels__heading'>Experience</h2>
          <ul className='experience-list space-y-0'>
            {jobs.map((job) => (
              <li
                key={job.title}
                className='experience-list__item flex items-start justify-between gap-4 py-4 lg:py-6 border-b border-black/10 last:border-b-0'
              >
                <div className='min-w-0'>
                  {job.href ? (
                    <Link
                      href={job.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group inline-block'
                    >
                      <span className='experience-list__company group-hover:underline'>{job.title}</span>
                    </Link>
                  ) : (
                    <span className='experience-list__company'>{job.title}</span>
                  )}
                  <p className='experience-list__role'>{job.position}</p>
                </div>
                <span className='experience-list__date'>{job.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className='experience-panels__aside'>
          <section className='experience-panels__section experience-panels__section--skills'>
            <h2 className='experience-panels__heading'>Skills</h2>
            <ul className='about-skills-list'>
              {skills.map((skill) => (
                <li key={skill} className='about-skills-list__tag'>
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          <section className='experience-panels__section experience-panels__section--awards'>
            <h2 className='experience-panels__heading'>Awards</h2>
            <ul className='awards-list space-y-0'>
              {awards.map((award) => (
                <li
                  key={award.title}
                  className='awards-list__item py-4 lg:py-6 border-b border-black/10 last:border-b-0'
                >
                  <Link
                    href={award.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='awards-list__link hover:underline inline-flex items-center gap-2'
                  >
                    <Image
                      src='/images/home/cabinConcept.png'
                      alt='Cabin Concept'
                      width={40}
                      height={40}
                      className='flex-shrink-0 rounded-lg'
                    />
                    <span>{award.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
