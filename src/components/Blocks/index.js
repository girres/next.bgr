import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { clsx } from 'clsx';
import { LiaChevronCircleRightSolid } from 'react-icons/lia';
import AnimatedTooltip from '@/components/AnimatedTooltip';
import ScrollReveal from '@/components/ScrollReveal';
// import projects from '@/projectsData';

const clients = [
  {
    title: 'carbonbox',
    image: '/images/myclients/carbonbox.png',
  },
  {
    title: 'esd',
    image: '/images/myclients/esd.png',
  },
  {
    title: 'espaciocontinuo',
    image: '/images/myclients/espaciocontinuo.png',
  },
  {
    title: 'fp',
    image: '/images/myclients/fp.png',
  },
  {
    title: 'panasonic',
    image: '/images/myclients/panasonic.png',
  },
  {
    title: 'reteki',
    image: '/images/myclients/reteki.png',
  },
  {
    title: 'saudia',
    image: '/images/myclients/saudia.png',
  },
];

const projects = [
  {
    title: 'Nuela',
    caption: 'B2B SaaS Platform - 2024',
    image: '/test1.png',
    class: 'col-span-12 lg:col-span-6',
    link: 'https://www.nuela.ai/',
    confidential: true,
    external: true,
  },
  {
    title: 'Reteki',
    caption: 'Web & App - 2022',
    image: '/images/projects/reteki/2.jpg',
    class: 'col-span-12 lg:col-span-6',
    link: '/reteki',
  },
  {
    title: 'SaudiaBEYOND',
    caption: 'Branding, Web & App - 2024',
    image: '/images/projects/saudiaBeyond/6.jpg',
    class: 'col-span-12 lg:col-span-6',
    link: '/saudia-beyond',
  },
  {
    title: 'Zona Herragro',
    caption: 'E-Commerce - 2023',
    image: '/images/projects/zonaHerragro/1.jpg',
    class: 'col-span-12 lg:col-span-6',
    link: '/zona-herragro',
  },
  {
    title: 'Saudia Airlines',
    caption: 'IFE, UX/UI & Branding Design - 2024',
    image: '/images/projects/saudiaAirlines/1.jpg',
    class: 'col-span-12',
    cabinConcept: true,
    link: '/saudia-airlines',
  },

];

const efforts = [
  {
    title: 'Product Discovery & AI Insight',
    text: 'I leverage AI-driven workflows to transform raw user data into actionable product strategies. By automating feedback synthesis and deep research, I identify customer pain points with precision, ensuring every design decision is backed by data and aligned with business goals.',
    image: '/images/home-icons/UX.png',
  },
  {
    title: 'Functional Prototyping',
    text: 'I bridge the gap between static design and real interaction. Using advanced tools like Lovable and Figma, I build high-fidelity, logic-based prototypes that allow for rapid testing and validation of complex features before they ever reach the development phase.',
    image: '/images/home-icons/UI.png',
  },
  {
    title: 'Product Building & Deployment',
    text: "I take full ownership of the implementation process. Utilizing Antigravity and modern coding frameworks, I translate visual systems into production-ready software. I don't just hand over assets; I ship functional components that ensure a pixel-perfect final product.",
    image: '/images/home-icons/Branding_more.png',
  },
];


const tools = [
  {
    id: 1,
    title: 'Figma',
    image: '/images/tools/figma-new.png',
  },
  {
    id: 2,
    title: 'Lovable',
    image: '/images/tools/lovable.png',
  },
  {
    id: 3,
    title: 'Adobe Creative Cloud',
    image: '/images/tools/creative-cloud.png',
  },
  {
    id: 4,
    title: 'Claude',
    image: '/images/tools/claude.png',
  },
  {
    id: 5,
    title: 'Google Antigravity',
    image: '/images/tools/arc.png',
  },
];

export const Clients = () => {
  return (
    <div id='clients' className='lg:flex lg:items-center lg:gap-8 overflow-hidden'>
      <h2 className='lg:w-[20%] flex-shrink-0'>
        Worked <span className='text-main-gray'>with:</span>
      </h2>
      <div className='flex-1 mt-4 lg:mt-0 overflow-hidden'>
        <Marquee
          speed='70'
          autoFill
          direction='left'
          gradient
          gradientColor='#151B21'
          gradientWidth={50}
        >
          {clients.map((client) => (
            <div
              key={client.title}
              className='client relative w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] mx-8 lg:mx-10'
            >
              <Image
                src={client.image}
                alt={client.title}
                fill
                sizes='(min-width: 1024px) 140px, 120px'
                quality={75}
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <div id='projects' className=''>
      <h2 className='lg:text-5xl mb-8 lg:mb-12'>
        <span className='text-main-gray'>Latest</span> Projects
      </h2>
      <div className='grid grid-cols-12 gap-4 lg:gap-6'>
        {projects.map((project, index) => {
          const { cabinConcept = false, confidential = false, external = false } = project;

          const content = (
            <div
              className={clsx(
                'project relative',
                'min-h-[400px] lg:min-h-[550px]',
                'rounded-3xl overflow-hidden'
              )}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes='(min-width: 1024px) 50vw, 100vw'
                quality={80}
                loading='lazy'
              />

              {/* Blur overlay for confidential projects */}
              {confidential && (
                <div className='absolute inset-0 backdrop-blur-2xl bg-gray-900/40 flex items-center justify-center p-6 text-center z-10'>
                  <div className='space-y-4'>
                    <div className='px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block'>
                      <span className='text-xs font-medium text-white uppercase tracking-wider'>Saas B2B</span>
                    </div>
                    <h3 className='text-2xl lg:text-3xl font-bold text-white'>Nuela AI</h3>
                    <p className='text-gray-300 text-sm lg:text-base max-w-[280px] mx-auto'>
                      Visítenos la web para más información
                    </p>
                    <div className='inline-flex items-center gap-2 text-white font-medium'>
                      <span>Visit Website</span>
                      <LiaChevronCircleRightSolid className='w-5 h-5' />
                    </div>
                  </div>
                </div>
              )}


              {!confidential && (
                <div className='caption project-info'>
                  <div className='w-full flex items-center justify-between'>
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.caption}</p>
                    </div>
                    <div>
                      <LiaChevronCircleRightSolid className='h-10 w-10' />
                    </div>
                  </div>
                </div>
              )}

              {cabinConcept && (
                <div className='cabinConcept absolute top-5 left-5 h-[80px] w-[80px]'>
                  <Image
                    src='/images/home/cabinConcept.png'
                    alt='Cabin Concept'
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes='80px'
                    quality={75}
                    loading='lazy'
                  />
                </div>
              )}
            </div>
          );

          const wrapperClass = project?.class || '';

          if (external) {
            return (
              <ScrollReveal key={index} delay={index * 0.1} className={wrapperClass}>
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block h-full'
                >
                  {content}
                </a>
              </ScrollReveal>
            );
          }

          return (
            <ScrollReveal key={index} delay={index * 0.1} className={wrapperClass}>
              <Link
                href={project.link}
                className='block h-full'
              >
                {content}
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};


export const Efforts = () => {
  return (
    <div id='efforts' className='text-main-gray'>
      <h2>
        How can I align my efforts to{' '}
        <span className='text-main-white'>better meet</span> your{' '}
        <span className='text-main-white'>business needs?</span>
      </h2>
      <div className='content'>
        {efforts.map((effort, index) => (
          <ScrollReveal key={effort.title} delay={index * 0.15}>
            <div className='effort glass-card'>
              <div className='heading'>
                <Image
                  src={effort.image}
                  alt={effort.title}
                  width={50}
                  height={50}
                  sizes='50px'
                  quality={75}
                  loading='lazy'
                />
                <h3>{effort.title}</h3>
              </div>
              <p className='text-sm lg:text-lg'>{effort.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export const Tools = () => {
  return (
    <div id='tools' className='text-main-gray'>
      <h2>
        I use <span className='text-main-white'>advanced design tools</span> to
        develop <span className='text-main-white'>seamless</span> and{' '}
        <span className='text-main-white'>engaging visual experiences</span>
      </h2>
      <div className='flex flex-wrap items-center gap-6 lg:gap-8 mt-10 lg:mt-16'>
        <AnimatedTooltip items={tools} />
      </div>
    </div>
  );
};

export const Experience = () => {
  const items = [

    {
      title: 'Nuela',
      position: 'Product designer & AI Builder',
      image: '/images/jobs/nuela.png',
      date: '2024 - Current',
    },
    {
      title: 'MadreMía',
      position: 'Lead Product Designer',
      image: '/images/jobs/MadreMia.png',
      date: '2022 - 2024',
    },
    {
      title: 'Future Provenance',
      position: 'UX/UI & Digital Product Designer',
      image: '/images/jobs/FP.png',
      date: '2023 - 2024',
    },
    {
      title: 'GR Development',
      position: 'UI & Digital Product Designer',
      image: '/images/jobs/GR.png',
      date: '2020 - 2023',
    },
    {
      title: 'Freelancer',
      position: 'Product designer & AI Builder',
      image: '/images/jobs/Bryan_Freelancer.png',
      date: '2020 - Current',
    },
  ];

  const Card = ({ job }) => (
    <div className='job-card glass-card flex items-center justify-between text-main-gray p-4 lg:p-6 rounded-[24px] lg:rounded-[30px]'>
      <div className='flex items-center gap-4 lg:gap-5'>
        <div className='relative w-[45px] h-[45px] lg:w-[50px] lg:h-[50px] flex-shrink-0'>
          <Image
            src={job.image}
            alt={job.title}
            fill
            sizes='(min-width: 1024px) 50px, 45px'
            quality={75}
            loading='lazy'
            className='object-contain rounded-xl'
          />
        </div>
        <div>
          <h3 className='text-main-white text-base lg:text-lg font-medium'>{job.title}</h3>
          <p className='text-xs lg:text-base font-light'>{job.position}</p>
        </div>
      </div>
      <p className='text-xs lg:text-base font-light text-right min-w-fit pl-3 lg:pl-4 opacity-70'>
        {job.date}
      </p>
    </div>
  );
  return (
    <div id='experience' className='grid lg:grid-cols-2 gap-10 lg:gap-12'>
      <div className='heading'>
        <h2 className='lg:text-5xl mb-8 lg:mb-10'>
          <span className='text-main-gray'>My</span> Experience
        </h2>
        <div className='space-y-4 lg:space-y-5 text-sm lg:text-lg'>
          <p>{`Since 2019, I've been building digital experiences that bridge the gap between user needs and business scalability. With over 5 years in the industry, my path has evolved from branding and motion graphics to high-impact Product Design, working across e-commerce, B2B, B2C and complex systems like In-Flight Entertainment (IFE).`}</p>
          <p>{`My approach has shifted from delivering static assets to shipping functional products. I have integrated an AI-augmented workflow that allows me to own the entire cycle: from automating customer pain-point analysis and validating logic with AI tools, to deploying production-ready code.`}</p>
          <p>{`I don't just design interfaces; I build the systems that power them.`}</p>
        </div>
      </div>
      <div className='content'>
        <div className='jobs space-y-3 lg:space-y-4'>
          {items.map((job, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card job={job} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
