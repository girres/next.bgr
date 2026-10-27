'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { LiaArrowRightSolid } from 'react-icons/lia';
import { useAwardModal } from '@/components/AwardModalProvider';

function projectYear(project) {
  const range = project.caption?.match(/\b20\d{2}\s*[–-]\s*20\d{2}\b/);
  if (range) return range[0].replace(/\s+/g, '');
  return project.caption?.match(/\b20\d{2}\b/)?.[0] ?? null;
}

export default function WorkCard({ project }) {
  const { openAward } = useAwardModal();

  const {
    confidential = false,
    deviceMockup = false,
    award = null,
    imageFit = 'cover',
    showcase = false,
    description = '',
  } = project;

  const year = projectYear(project);
  const summary = (description || project.headline || '').replace(/\s*\n+\s*/g, ' ').trim();
  const caseStudyHref = project.link;

  const handleAwardClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!award) return;
    openAward({
      title: award.title,
      awardHref: award.href,
      projectHref: caseStudyHref,
    });
  };

  const mediaClassName = clsx(
    'work-card__media',
    deviceMockup && 'work-card__media--device',
    showcase && 'work-card__media--showcase'
  );

  const cardAriaLabel = `View case study: ${project.title}`;
  const [preferStill, setPreferStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPreferStill(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const showVideo = Boolean(project.video) && !preferStill && !deviceMockup;
  const showGif = Boolean(project.gif) && !preferStill && !deviceMockup && !showVideo;
  const videoClipEnd = project.videoClipEnd ?? null;
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoClipEnd || !showVideo) return undefined;

    const onTimeUpdate = () => {
      if (video.currentTime >= videoClipEnd) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [videoClipEnd, showVideo, project.video]);

  return (
    <article
      className={clsx(
        'work-card',
        confidential && 'work-card--confidential',
        deviceMockup && 'work-card--device',
        showcase && 'work-card--showcase'
      )}
    >
      <Link className='work-card__hit' href={caseStudyHref} aria-label={cardAriaLabel} />

      <div className={mediaClassName}>
        {deviceMockup ? (
          <div className='work-card__laptop'>
            <div className='work-card__laptop-lid'>
              <span className='work-card__laptop-camera' aria-hidden='true' />
              <div className='work-card__laptop-screen'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt=''
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
        ) : showVideo ? (
          <video
            ref={videoRef}
            className='work-card__video'
            src={project.video}
            poster={project.image}
            autoPlay
            muted
            loop={!videoClipEnd}
            playsInline
            preload='metadata'
            aria-hidden='true'
          />
        ) : showGif ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.gif}
            alt=''
            className='work-card__gif'
            loading='lazy'
            decoding='async'
            draggable={false}
          />
        ) : (
          <Image
            src={project.image}
            alt=''
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
