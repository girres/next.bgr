'use client';

import Image from 'next/image';
import { clsx } from 'clsx';
import { LiaArrowRightSolid } from 'react-icons/lia';
import Button from '@/components/Button';
import { useAwardModal } from '@/components/AwardModalProvider';

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

  const handleAwardClick = (event) => {
    event.stopPropagation();
    if (!award) return;
    openAward({
      title: award.title,
      awardHref: award.href,
      projectHref: project.link,
    });
  };

  const media = (
    <div
      className={clsx(
        'work-card__media',
        deviceMockup && 'work-card__media--device',
        showcase && 'work-card__media--showcase'
      )}
    >
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
          sizes='(min-width: 1024px) 50vw, 100vw'
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
  );

  return (
    <article
      className={clsx(
        'work-card glass-card',
        confidential && 'work-card--confidential',
        deviceMockup && 'work-card--device',
        showcase && 'work-card--showcase'
      )}
    >
      <header className='work-card__header'>
        <p className='work-card__brand'>{project.title}</p>
        <h3 className='work-card__headline'>{project.headline}</h3>
      </header>

      {media}

      <div className='work-card__body'>
        {description && <p className='work-card__description'>{description}</p>}
        {project.caption && <p className='work-card__caption'>{project.caption}</p>}

        <div className='work-card__meta'>
          {project.metrics?.length > 0 && (
            <dl className='work-card__metrics'>
              {project.metrics.map((metric) => (
                <div key={metric.label} className='work-card__metric'>
                  <dt className='work-card__metric-value'>{metric.value}</dt>
                  <dd className='work-card__metric-label'>{metric.label}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.tags?.length > 0 && (
            <div className='work-card__tags'>
              {project.tags.map((tag) => (
                <span key={tag} className='work-card__tag'>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='work-card__actions'>
          {external ? (
            <Button as='link' href={project.link} size='sm' target='_blank' rel='noopener noreferrer'>
              View live
            </Button>
          ) : (
            <Button as='link' href={project.link} size='sm'>
              View case study
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
