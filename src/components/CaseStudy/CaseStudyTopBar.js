'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { MdChevronLeft } from 'react-icons/md';
import { LiaArrowLeftSolid, LiaArrowRightSolid } from 'react-icons/lia';

const SOLID_AFTER = 24;

export default function CaseStudyTopBar({ prev, next, index, total }) {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const sync = () => setIsSolid(window.scrollY > SOLID_AFTER);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  const current =
    index >= 0 ? String(index + 1).padStart(2, '0') : null;
  const totalLabel = total ? String(total).padStart(2, '0') : null;

  return (
    <div className={clsx('case-study-bar', isSolid && 'case-study-bar--solid')}>
      <Link href='/#projects' className='project-page__back case-study-bar__back'>
        <span className='case-study-bar__back-icon' aria-hidden='true'>
          <MdChevronLeft className='h-5 w-5' />
        </span>
        Back to work
      </Link>

      <nav className='case-study-bar__nav' aria-label='Browse projects'>
        {current && totalLabel ? (
          <span className='case-study-bar__count' aria-label={`Project ${current} of ${totalLabel}`}>
            <span className='case-study-bar__count-current'>{current}</span>
            <span className='case-study-bar__count-sep' aria-hidden='true'> / </span>
            <span className='case-study-bar__count-total'>{totalLabel}</span>
          </span>
        ) : null}
        {prev ? (
          <Link
            href={`/${prev.slug}`}
            className='case-study-bar__arrow'
            aria-label={`Previous project: ${prev.title}`}
            title={prev.title}
          >
            <LiaArrowLeftSolid aria-hidden='true' />
          </Link>
        ) : null}
        {next ? (
          <Link
            href={`/${next.slug}`}
            className='case-study-bar__arrow'
            aria-label={`Next project: ${next.title}`}
            title={next.title}
          >
            <LiaArrowRightSolid aria-hidden='true' />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
