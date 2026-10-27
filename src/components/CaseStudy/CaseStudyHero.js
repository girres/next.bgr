import { MdChevronRight } from 'react-icons/md';
import Button from '@/components/Button';
import { MediaFrame } from './CaseStudyMedia';
import { CaseStudyFacts } from './CaseStudyHiringMeta';

export default function CaseStudyHero({ study }) {
  const { title, client, year, heroMedia, listing, website } = study;
  const headline = listing?.headline?.replace(/\s*\n+\s*/g, ' ').trim();

  return (
    <header className='case-study__hero'>
      <div className='case-study__hero-copy' data-reveal data-reveal-lag='20'>
        <p className='case-study__eyebrow'>
          {client} · {year}
        </p>
        <h1 className='case-study__title'>{title}</h1>
        {headline ? <p className='case-study__lead'>{headline}</p> : null}
      </div>

      <div className='case-study__hero-grid' data-reveal data-reveal-lag='40'>
        {heroMedia ? (
          <div className='case-study__hero-media'>
            <MediaFrame
              block={heroMedia}
              alt={heroMedia.alt || title}
              ratio='hero'
              sizes='(min-width: 1024px) 50vw, 100vw'
              priority
            />
            {website ? (
              <Button
                as='link'
                href={website}
                variant='accent'
                size='sm'
                target='_blank'
                rel='noopener noreferrer'
                className='case-study__hero-site'
              >
                Visit Website
                <MdChevronRight className='h-4 w-4' aria-hidden='true' />
              </Button>
            ) : null}
          </div>
        ) : null}
        <CaseStudyFacts study={study} />
      </div>
    </header>
  );
}
