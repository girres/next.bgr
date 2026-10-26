import { MediaFrame } from './CaseStudyMedia';
import { CaseStudyFacts } from './CaseStudyHiringMeta';

export default function CaseStudyHero({ study }) {
  const { title, client, year, heroMedia, listing } = study;
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
          <MediaFrame
            block={heroMedia}
            alt={heroMedia.alt || title}
            ratio='hero'
            sizes='(min-width: 1024px) 50vw, 100vw'
            priority
          />
        ) : null}
        <CaseStudyFacts study={study} />
      </div>
    </header>
  );
}
