import { MdChevronRight } from 'react-icons/md';
import Button from '@/components/Button';

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

export default function CaseStudyHiringMeta({ study }) {
  const { hiring, tags, overview } = study;
  const responsibilities = hiring?.responsibilities;
  if (!overview && !responsibilities?.length) return null;

  return (
    <section className='case-study__block case-study__split' aria-labelledby='case-study-overview' data-reveal>
      <div className='case-study__split-copy'>
        <h2 id='case-study-overview' className='case-study__block-title'>
          Overview
        </h2>
      </div>

      <div className='case-study__split-panel'>
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
      </div>
    </section>
  );
}
