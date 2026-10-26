import { MdChevronRight } from 'react-icons/md';
import Button from '@/components/Button';
import CaseStudyMedia from './CaseStudyMedia';

export function CaseStudyFacts({ study }) {
  const { hiring, year, website } = study;
  const { role, projectType, team } = hiring ?? {};

  return (
    <div className='case-study__facts-column'>
      <dl className='case-study__facts'>
        {role ? (
          <div className='case-study__fact'>
            <dt>Role</dt>
            <dd>{role}</dd>
          </div>
        ) : null}
        {projectType ? (
          <div className='case-study__fact'>
            <dt>Project type</dt>
            <dd>{projectType}</dd>
          </div>
        ) : null}
        {year ? (
          <div className='case-study__fact'>
            <dt>Year</dt>
            <dd>{year}</dd>
          </div>
        ) : null}
        {team?.length ? (
          <div className='case-study__fact'>
            <dt>Team</dt>
            <dd>
              {team.map((member) => (
                <span key={`${member.name}-${member.role}`} className='case-study__team-member'>
                  {member.name}
                  <span className='case-study__team-role'> · {member.role}</span>
                </span>
              ))}
            </dd>
          </div>
        ) : null}
        {website ? (
          <div className='case-study__fact'>
            <dt>Website</dt>
            <dd>
              <Button
                as='link'
                href={website}
                variant='accent'
                size='sm'
                target='_blank'
                rel='noopener noreferrer'
              >
                Visit site
                <MdChevronRight className='h-4 w-4' aria-hidden='true' />
              </Button>
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}

function Prose({ paragraphs }) {
  if (!paragraphs?.length) return null;

  return (
    <div className='case-study__prose'>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className='case-study__block-body case-study__prose-p'>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function SplitBlock({ id, title, children }) {
  return (
    <section className='case-study__block case-study__split' aria-labelledby={id} data-reveal>
      <div className='case-study__split-copy'>
        <h2 id={id} className='case-study__block-title'>
          {title}
        </h2>
      </div>
      <div className='case-study__split-panel'>{children}</div>
    </section>
  );
}

function ResponsibilitiesContent({ responsibilities, tags }) {
  return (
    <>
      {responsibilities?.length ? (
        <ul className='case-study__list case-study__list--columns'>
          {responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {tags?.length ? (
        <ul className='case-study__tags'>
          {tags.map((tag) => (
            <li key={tag} className='pill'>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default function CaseStudyHiringMeta({ study }) {
  const { hiring, tags, overview, challenge, userTesting } = study;
  const responsibilities = hiring?.responsibilities;
  const challengeParagraphs = Array.isArray(challenge) ? challenge : [];
  const hasResponsibilities = Boolean(responsibilities?.length || tags?.length);
  if (!overview && !hasResponsibilities && !challengeParagraphs.length) return null;

  const narrativeIsSplit = challengeParagraphs.length > 0 || Boolean(userTesting);

  if (!narrativeIsSplit) {
    return (
      <SplitBlock id='case-study-overview' title='Overview'>
        {overview ? <p className='case-study__block-body case-study__overview'>{overview}</p> : null}
        {responsibilities?.length ? (
          <div className='case-study__split-sub'>
            <h3 className='case-study__label'>Responsibilities</h3>
            <ul className='case-study__list case-study__list--columns'>
              {responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {tags?.length ? (
          <ul className='case-study__tags'>
            {tags.map((tag) => (
              <li key={tag} className='pill'>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </SplitBlock>
    );
  }

  return (
    <>
      {overview ? (
        <SplitBlock id='case-study-overview' title='Overview'>
          <p className='case-study__block-body case-study__overview'>{overview}</p>
        </SplitBlock>
      ) : null}

      {challengeParagraphs.length ? (
        <SplitBlock id='case-study-challenge' title='The Challenge'>
          <Prose paragraphs={challengeParagraphs} />
        </SplitBlock>
      ) : null}

      {hasResponsibilities ? (
        <SplitBlock id='case-study-responsibilities' title='Responsibilities'>
          <ResponsibilitiesContent responsibilities={responsibilities} tags={tags} />
        </SplitBlock>
      ) : null}
    </>
  );
}

export function CaseStudyUserTesting({ study }) {
  if (!study?.userTesting && !study?.userTestingMedia) return null;

  return (
    <section className='case-study__block case-study__split' aria-labelledby='case-study-user-testing' data-reveal>
      <div className='case-study__split-copy'>
        <h2 id='case-study-user-testing' className='case-study__block-title'>
          User Testing
        </h2>
        {study.userTesting ? <p className='case-study__block-body'>{study.userTesting}</p> : null}
      </div>
      {study.userTestingMedia ? (
        <CaseStudyMedia media={study.userTestingMedia} title={study.title} frame='half' />
      ) : null}
    </section>
  );
}
