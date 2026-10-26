import CaseStudyMedia from './CaseStudyMedia';

export default function CaseStudySection({ section, title }) {
  const headingId = `section-${section.id}`;

  return (
    <section className='case-study__block case-study__split' aria-labelledby={headingId} data-reveal>
      <div className='case-study__split-copy'>
        {section.kicker ? <p className='case-study__label'>{section.kicker}</p> : null}
        <h2 id={headingId} className='case-study__block-title'>
          {section.title}
        </h2>
        {section.body ? <p className='case-study__block-body'>{section.body}</p> : null}
      </div>
      <CaseStudyMedia media={section.media} title={title} rotateMs={section.mediaRotate} />
    </section>
  );
}
