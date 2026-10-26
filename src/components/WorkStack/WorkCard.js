'use client';

import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { LiaArrowRightSolid } from 'react-icons/lia';
import { useAwardModal } from '@/components/AwardModalProvider';

function projectYear(project) {
  return project.caption?.match(/\b20\d{2}\b/)?.[0] ?? null;
}

export default function WorkCard({ project }) {
  const { openAward } = useAwardModal();

  const {
    confidential = false,
    external = false,
    deviceMockup = false,
    award = null,
    imageFit = 'cover',
    showcase = false,
    description = '',
  } = project;

  const year = projectYear(project);
  const summary = (description || project.headline || '').replace(/\s*\n+\s*/g, ' ').trim();

  const handleAwardClick = (event) => {
    event.stopPropagation();
    if (!award) return;
    openAward({
      title: award.title,
      awardHref: award.href,
      projectHref: project.link,
    });
  };

  const mediaClassName = clsx(
    'work-card__media',
    deviceMockup && 'work-card__media--device',
    showcase && 'work-card__media--showcase'
  );

  const mediaAriaLabel = external
    ? `View live: ${project.title}`
    : `View case study: ${project.title}`;

  const mediaHit = external ? (
    <a
      className='work-card__media-hit'
      href={project.link}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={mediaAriaLabel}
    />
  ) : (
    <Link className='work-card__media-hit' href={project.link} aria-label={mediaAriaLabel} />
  );

  return (
    <article
      className={clsx(
        'work-card',
        confidential && 'work-card--confidential',
        deviceMockup && 'work-card--device',
        showcase && 'work-card--showcase'
      )}
    >
      <div className={mediaClassName}>
        {mediaHit}
        {deviceMockup ? (
          <div className='work-card__laptop'>
            <div className='work-card__laptop-lid'>
              <span className='work-card__laptop-camera' aria-hidden='true' />
              <div className='work-card__laptop-screen'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className='work-card__laptop-image'
                  loading='lazy'
                  decoding='async'
                  draggable={false}
                />
              </div>
            </div>
            <div className='work-card__laptop-base' aria-hidden='true'>
              <span className='work-card__laptop-notch' />
            </div>
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{
              objectFit: imageFit,
              objectPosition: project.imagePosition || 'center',
            }}
            sizes='(min-width: 1024px) 42vw, 100vw'
            quality={80}
            loading='lazy'
          />
        )}

        {confidential && (
          <div className='work-card__confidential'>
            <div className='text-center'>
              <span className='work-card__confidential-tag'>{project.tags?.[0] || 'SaaS B2B'}</span>
              <p className='work-card__confidential-copy'>Visítenos la web para más información</p>
            </div>
          </div>
        )}

        {award && (
          <button
            type='button'
            className='work-card__award-badge'
            onClick={handleAwardClick}
            aria-haspopup='dialog'
            aria-label={`Award: ${award.title}`}
          >
            <span className='work-card__award-badge-icon' aria-hidden='true'>
              <Image
                src='/images/home/cabinConcept.png'
                alt=''
                width={22}
                height={22}
                className='work-card__award-badge-image'
              />
            </span>
            <span className='work-card__award-badge-copy'>
              <span className='work-card__award-badge-kicker'>Award Winner</span>
              <span className='work-card__award-badge-title'>{award.title}</span>
            </span>
            <span className='work-card__award-badge-arrow' aria-hidden='true'>
              <LiaArrowRightSolid />
            </span>
          </button>
        )}
      </div>

      <div className='work-card__body'>
        <h3 className='work-card__title-row'>
          <span className='work-card__title-name'>{project.title}</span>
          {year ? (
            <>
              <span className='work-card__title-sep' aria-hidden='true'> / </span>
              <span className='work-card__title-year'>{year}</span>
            </>
          ) : null}
        </h3>
        {summary ? <p className='work-card__description text-body'>{summary}</p> : null}
      </div>
    </article>
  );
}
