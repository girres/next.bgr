import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { clsx } from 'clsx';
import { LiaChevronCircleRightSolid } from 'react-icons/lia';
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
    title: 'Reteki',
    caption: 'Web & App - 2022',
    image: '/images/projects/reteki/2.jpg',
    class: 'col-span-12 lg:col-span-7',
    link: '/reteki',
  },
  {
    title: 'SaudiaBEYOND',
    caption: 'Branding, Web & App - 2024',
    image: '/images/projects/saudiaBeyond/6.jpg',
    class: 'col-span-12 lg:col-span-5',
    link: '/saudia-beyond',
  },
  {
    title: 'Zona Herragro',
    caption: 'E-Commerce - 2023',
    image: '/images/projects/zonaHerragro/1.jpg',
    class: 'col-span-12 lg:col-span-5',
    link: '/zona-herragro',
  },
  {
    title: 'Saudia Airlines',
    caption: 'IFE, UX/UI & Branding Design - 2024',
    image: '/images/projects/saudiaAirlines/1.jpg',
    class: 'col-span-12 lg:col-span-7',
    cabinConcept: true,
    link: '/saudia-airlines',
  },
];

const efforts = [
  {
    title: 'UX Design',
    text: 'I create wireframes, facilitate internal workshops, analyse data, conduct research, develop user personas, and design testing strategies, including A/B testing, to optimise sales performance.',
    image: '/images/home-icons/UX.png',
  },
  {
    title: 'UI Design',
    text: 'Skilled in Figma, Adobe XD, and Sketch, I design and maintain systems, collaborate with developers for precise implementation, analyse user data, and apply my graphic design experience to create modern, engaging interfaces.',
    image: '/images/home-icons/UI.png',
  },
  {
    title: 'Branding & more',
    text: "I love creating unique brand identities that capture a business's essence and resonate with its audience. I craft cohesive visual systems, memorable logos, and compelling brand assets that leave a lasting impression.",
    image: '/images/home-icons/Branding_more.png',
  },
];

const tools = [
  {
    title: 'Sketch',
    image: '/images/tools/sketch.png',
  },
  {
    title: 'Figma',
    image: '/images/tools/figma.png',
  },
  {
    title: 'Adobe XD',
    image: '/images/tools/xd.png',
  },
  {
    title: 'Photoshop',
    image: '/images/tools/ps.png',
  },
  {
    title: 'Illustrator',
    image: '/images/tools/ai.png',
  },
  {
    title: 'After Effects',
    image: '/images/tools/ae.png',
  },
];

export const Clients = () => {
  return (
    <div id='clients' className='lg:flex lg:items-center'>
      <h2 className='lg:w-[20%]'>
        Worked <span className='text-main-gray'>with:</span>
      </h2>
      <div className='lg:w-[80%] mt-3 lg:mt-0'>
        <Marquee
          speed='70'
          autoFill
          direction='left'
          gradient
          gradientColor='#151B21'
        >
          {clients.map((client) => (
            <div
              key={client.title}
              className='client relative w-[150px] h-[150px] mx-10'
            >
              <Image
                src={client.image}
                alt={client.title}
                fill
                sizes='(min-width: 640px) 50vw, 100vw'
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
      <h2 className='lg:text-5xl mb-10'>
        <span className='text-main-gray'>Latest</span> Projects
      </h2>
      <div className='grid grid-cols-12 gap-5'>
        {projects.map((project, index) => {
          const { cabinConcept = false } = project;
          return (
            <Link
              href={project.link}
              key={index}
              className={project?.class || ''}
            >
              <div
                className={clsx(
                  'project relative',
                  'min-h-[350px] lg:min-h-[500px]',
                  'rounded-3xl overflow-hidden',
                  project?.class || ''
                )}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes='(min-width: 640px) 50vw, 100vw'
                  quality={100}
                  priority
                />
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
                {cabinConcept && (
                  <div className='cabinConcept absolute top-5 left-5 h-[80px] w-[80px]'>
                    <Image
                      src='/images/home/cabinConcept.png'
                      alt='Cabin Concept'
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      sizes='(min-width: 640px) 50vw, 100vw'
                    />
                  </div>
                )}
              </div>
            </Link>
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
        {efforts.map((effort) => (
          <div key={effort.title} className='effort'>
            <div className='heading'>
              <Image
                src={effort.image}
                alt={effort.title}
                width={50}
                height={50}
              />
              <h3>{effort.title}</h3>
            </div>
            <p>{effort.text}</p>
          </div>
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
      <div className='content'>
        {tools.map((tool, index) => {
          return (
            <div key={index} className='tool flex items-center justify-center'>
              <Image
                src={tool.image}
                alt={tool.title}
                width={50}
                height={50}
                className='max-h-[50px] h-auto w-auto mx-auto'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Experience = () => {
  const items = [
    {
      title: 'MadreMía',
      position: 'Lead Designer',
      image: '/images/jobs/MadreMia.png',
      date: 'Current',
    },
    {
      title: 'Future Provenance',
      position: 'UX/UI & Digital Product Designer',
      image: '/images/jobs/FP.png',
      date: '2022 - 2024',
    },
    {
      title: 'GR Dev',
      position: 'Graphic & Product Designer',
      image: '/images/jobs/GR.png',
      date: '2020 - 2023',
    },
    {
      title: 'Freelancer',
      position: 'Graphic & UI Designer ',
      image: '/images/jobs/Bryan_Freelancer.png',
      date: '2020',
    },
  ];
  const Card = ({ job }) => (
    <div className='job-card flex items-center justify-between text-main-gray'>
      <div className='flex items-center'>
        <Image src={job.image} alt={job.title} width={50} height={50} />
        <div className='px-5'>
          <h3 className='text-main-white'>{job.title}</h3>
          <p>{job.position}</p>
        </div>
      </div>
      <p>{job.date}</p>
    </div>
  );
  return (
    <div id='experience' className='grid lg:grid-cols-2'>
      <div className='heading mb-10 lg:mb-0 lg:pr-10'>
        <h2 className='lg:text-5xl mb-10'>
          <span className='text-main-gray'>My</span> Experience
        </h2>
        <div className='space-y-5'>
          <p>{`I have over three years of experience as a designer, working in various roles across branding, motion graphics, and UX/UI design. As a UX/UI designer, I've contributed to projects in diverse industries, including e-commerce, B2B, B2C, and in-flight entertainment (IFE).`}</p>
          <p>{`I’m always eager to grow and challenge myself. Recently, I’ve started learning to code — excited to see where this new adventure leads!`}</p>
        </div>
      </div>
      <div className='content'>
        <div className='jobs space-y-3'>
          {items.map((job, index) => (
            <Card key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};
