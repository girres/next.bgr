import Image from 'next/image';

export default function CaseStudyOutcomes({ outcomes, awards }) {
  if (!outcomes) return null;

  const { metrics, lessons, conclusion } = outcomes;

  return (
    <section className='case-study__block case-study__split' aria-labelledby='case-study-outcomes' data-reveal>
      <div className='case-study__split-copy'>
        <h2 id='case-study-outcomes' className='case-study__block-title'>
          Outcomes &amp; lessons learned
        </h2>
        {awards?.length ? (
          <ul className='case-study__awards'>
            {awards.map((award) => (
              <li key={award.title}>
                <a
                  href={award.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='case-study__award-link'
                >
                  {award.image ? (
                    <Image src={award.image} alt='' width={40} height={40} className='case-study__award-icon' />
                  ) : null}
                  <span>
                    <span className='case-study__award-kicker'>Award winner</span>
                    {award.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className='case-study__split-panel'>
        {metrics?.length ? (
          <ul className='case-study__metrics'>
            {metrics.map((metric) => (
              <li key={`${metric.label}-${metric.value}`} className='case-study__metric'>
                <span className='case-study__metric-value'>{metric.value}</span>
                <span className='case-study__metric-label'>{metric.label}</span>
                {metric.detail ? <span className='case-study__metric-detail'>{metric.detail}</span> : null}
              </li>
            ))}
          </ul>
        ) : null}

        {lessons?.length ? (
          <div className='case-study__split-sub'>
            <h3 className='case-study__label'>Lessons</h3>
            <ul className='case-study__list'>
              {lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {conclusion ? (
          <div className='case-study__split-sub'>
            <h3 className='case-study__label'>Summary</h3>
            <p className='case-study__conclusion'>{conclusion}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
