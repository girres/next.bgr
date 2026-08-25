import Image from 'next/image';
import Link from 'next/link';
import AnimatedTooltip from '@/components/AnimatedTooltip';
import WorkStack from '@/components/WorkStack';
import AboutCopy from '@/components/AboutCopy';
import AboutFaceReveal from '@/components/AboutFaceReveal';
import ClientsMarquee from '@/components/ClientsMarquee';
import EffortCards from '@/components/EffortCards';
import skills from '@/data/skills';

const efforts = [
  {
    title: 'Strategic Product Discovery',
    text: 'I combine user research, competitive analysis, and data-informed insights to define product roadmaps and validate core hypotheses, ensuring every feature aligns with business goals and user needs.',
    image: '/images/home-icons/UX.png',
  },
  {
    title: 'Interactive & Logic Prototyping',
    text: 'I bridge the gap between static wireframes and real interaction. Using modern prototyping workflows, I build high-fidelity, logic-based prototypes to rapidly test and validate complex flows before development.',
    image: '/images/home-icons/UI.png',
  },
  {
    title: 'Front-End Building & Technical Quality',
    text: 'I take ownership of the UI implementation. By writing clean, modular front-end code (Tailwind CSS, UI components), I collaborate directly with engineering teams to ensure pixel-perfect delivery and zero handoff friction.',
    image: '/images/home-icons/Branding_more.png',
  },
];


const tools = [
  {
    id: 1,
    title: 'Figma',
    image: '/images/tools/figma.svg',
  },
  {
    id: 2,
    title: 'Adobe Creative Cloud',
    image: '/images/tools/adobe-cc.svg',
  },
  {
    id: 3,
    title: 'Magnific',
    image: '/images/tools/magnific.svg',
  },
  {
    id: 4,
    title: 'Claude Code',
    image: '/images/tools/claude.svg',
  },
  {
    id: 5,
    title: 'Cursor',
    image: '/images/tools/cursor.svg',
  },
  {
    id: 6,
    title: 'VS Code',
    image: '/images/tools/vscode.svg',
  },
  {
    id: 7,
    title: 'GitHub',
    image: '/images/tools/github.svg',
  },
  {
    id: 8,
    title: 'Vercel',
    image: '/images/tools/vercel.svg',
  },
  {
    id: 9,
    title: 'Tailwind CSS',
    image: '/images/tools/tailwindcss.svg',
  },
];

export const Clients = () => {
  return (
    <div id='clients' className='lg:flex lg:items-center lg:gap-8'>
      <h2 className='lg:w-[20%] flex-shrink-0'>
        Worked <span className='text-main-gray'>with:</span>
      </h2>
      <div className='w-full lg:flex-1 mt-5 lg:mt-0'>
        <ClientsMarquee />
      </div>
    </div>
  );
};

export const Projects = () => {
  return <WorkStack />;
};


export const Efforts = () => {
  return (
    <div id='efforts' className='text-main-gray'>
      <h2>
        How can I align my efforts to{' '}
        <span className='text-main-white'>better meet</span> your{' '}
        <span className='text-main-white'>business needs?</span>
      </h2>
      <EffortCards items={efforts} />
    </div>
  );
};

export const Tools = () => {
  return (
    <div id='tools' className='text-main-gray'>
      <h2 className='max-w-3xl'>
        Tools & technologies I use to{' '}
        <span className='text-main-white'>design</span>,{' '}
        <span className='text-main-white'>prototype</span>, and{' '}
        <span className='text-main-white'>build digital products</span>
      </h2>
      <div className='tools-row mt-10 lg:mt-12'>
        <AnimatedTooltip items={tools} />
      </div>
    </div>
  );
};

export const Experience = () => {
  const jobs = [
    {
      title: 'Performanze',
      position: 'End-to-end Product Designer',
      date: '2026 - Current',
      href: 'https://www.performanze.com/en',
    },
    {
      title: 'Nuela',
      position: 'End-to-end Product Designer',
      date: '2024 - 2026',
    },
    {
      title: 'Future Provenance',
      position: 'UX/UI & Digital Product Designer',
      date: '2022 - 2024',
    },
    {
      title: 'MadreMía',
      position: 'Lead Product Designer',
      date: '2022 - 2024',
    },
    {
      title: 'GR Development',
      position: 'UI & Digital Product Designer',
      date: '2020 - 2023',
    },
    {
      title: 'Freelancer',
      position: 'Product designer & AI Builder',
      date: '2020 - Current',
    },
  ];

  const awards = [
    {
      title: 'Best Onboard Entertainment',
      href: 'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
    },
  ];

  return (
    <div id='experience'>
      <section className='about-story'>
        <h2 className='about-story__title'>My Story</h2>
        <div className='about-story__rule' aria-hidden='true' />

        <div className='about-story__body'>
          <div className='about-story__copy'>
            <AboutCopy />
          </div>
          <aside className='about-story__meta'>
            <p className='about-story__name'>Bryan Girado</p>
            <p>End-to-End Product Designer</p>
          </aside>
          <AboutFaceReveal />
        </div>

        <div className='about-story__rule' aria-hidden='true' />
      </section>

      <div className='experience-panels'>
        <section className='experience-panels__section'>
          <h3 className='experience-panels__heading'>Experience</h3>
          <ul className='experience-list space-y-0'>
            {jobs.map((job) => (
              <li
                key={job.title}
                className='experience-list__item flex items-start justify-between gap-4 py-4 lg:py-5 border-b border-main-gray/25 last:border-b-0'
              >
                <div className='min-w-0'>
                  {job.href ? (
                    <Link
                      href={job.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group inline-block'
                    >
                      <span className='experience-list__company group-hover:underline'>{job.title}</span>
                    </Link>
                  ) : (
                    <span className='experience-list__company'>{job.title}</span>
                  )}
                  <p className='experience-list__role'>{job.position}</p>
                </div>
                <span className='experience-list__date'>{job.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className='experience-panels__section'>
          <h3 className='experience-panels__heading'>Awards</h3>
          <ul className='awards-list space-y-0'>
            {awards.map((award) => (
              <li
                key={award.title}
                className='awards-list__item py-4 lg:py-5 border-b border-main-gray/25 last:border-b-0'
              >
                <Link
                  href={award.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='awards-list__link hover:underline inline-flex items-center gap-2'
                >
                  <Image
                    src='/images/home/cabinConcept.png'
                    alt='Cabin Concept'
                    width={40}
                    height={40}
                    className='flex-shrink-0 rounded-lg'
                  />
                  <span>{award.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className='experience-panels__section'>
          <h3 className='experience-panels__heading'>Skills</h3>
          <ul className='about-skills-list'>
            {skills.map((skill) => (
              <li key={skill} className='about-skills-list__tag'>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
