import Image from 'next/image';
import Link from 'next/link';
import { LiaChevronCircleRightSolid } from 'react-icons/lia';
import { clsx } from 'clsx';

export default function WorkCard({ project }) {
  const {
    confidential = false,
    external = false,
    deviceMockup = false,
    award = null,
  } = project;

  const media = (
    <div className={clsx('work-card__media', deviceMockup && 'work-card__media--device')}>
      {deviceMockup ? (
        <div className='work-card__laptop'>
          <div className='work-card__laptop-lid'>
            <span className='work-card__laptop-camera' aria-hidden='true' />
            <div className='work-card__laptop-screen'>
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'contain' }}
                sizes='(min-width: 1024px) 540px, 100vw'
                quality={95}
                loading='lazy'
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
            objectFit: 'cover',
            objectPosition: project.imagePosition || 'center',
          }}
          sizes='(min-width: 1024px) 45vw, 100vw'
          quality={80}
          loading='lazy'
        />
      )}

      {confidential && (
        <div className='work-card__confidential'>
          <div className='space-y-3 text-center'>
            <div className='px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block'>
              <span className='text-xs font-medium text-white uppercase tracking-wider'>
                {project.tags?.[0] || 'SaaS B2B'}
              </span>
            </div>
            <p className='text-gray-300 text-sm'>Visítenos la web para más información</p>
          </div>
        </div>
      )}

      <span className='work-card__arrow' aria-hidden='true'>
        <LiaChevronCircleRightSolid className='w-8 h-8 lg:w-10 lg:h-10' />
      </span>
    </div>
  );

  const content = (
    <article
      className={clsx(
        'work-card glass-card',
        confidential && 'work-card--confidential',
        deviceMockup && 'work-card--device'
      )}
    >
      <div className='work-card__grid'>
        <div className='work-card__content'>
          <span className='work-card__number'>{project.number}</span>
          <p className='work-card__caption'>{project.caption}</p>
          <h3 className='work-card__headline'>{project.headline}</h3>

          {award && (
            <a
              href={award.href}
              target='_blank'
              rel='noopener noreferrer'
              className='work-card__award-badge'
            >
              <span className='work-card__award-badge-icon' aria-hidden='true'>
                <Image
                  src='/images/home/cabinConcept.png'
                  alt=''
                  width={40}
                  height={40}
                  className='rounded-md'
                />
              </span>
              <span className='work-card__award-badge-copy'>
                <span className='work-card__award-badge-kicker'>Award Winner</span>
                <span className='work-card__award-badge-title'>{award.title}</span>
                {award.source && (
                  <span className='work-card__award-badge-source'>{award.source}</span>
                )}
              </span>
            </a>
          )}

          <div className='work-card__tags'>
            {project.tags?.map((tag) => (
              <span key={tag} className='work-card__tag'>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {media}
      </div>

      {external ? (
        <a
          href={project.link}
          target='_blank'
          rel='noopener noreferrer'
          className='work-card__overlay'
          aria-label={`View ${project.title}`}
        />
      ) : (
        <Link href={project.link} className='work-card__overlay' aria-label={`View ${project.title}`} />
      )}
    </article>
  );

  return <div className='work-card-link block'>{content}</div>;
}
