import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { clsx } from 'clsx';

const clients = [
  {
    title: 'carbonbox',
    image: '/images/clients/carbonbox.png',
  },
  {
    title: 'esd',
    image: '/images/clients/esd.png',
  },
  {
    title: 'espaciocontinuo',
    image: '/images/clients/espaciocontinuo.png',
  },
  {
    title: 'fp',
    image: '/images/clients/fp.png',
  },
  {
    title: 'panasonic',
    image: '/images/clients/panasonic.png',
  },
  {
    title: 'reteki',
    image: '/images/clients/reteki.png',
  },
  {
    title: 'saudia',
    image: '/images/clients/saudia.png',
  },
];

const projects = [
  {
    title: 'Reteki',
    caption: 'Web & App - 2022',
    image: '/images/projects/Reteki/First/2.jpg',
    class: 'col-span-12 lg:col-span-7',
  },
  {
    title: 'SaudiaBEYOND',
    caption: 'Branding, Web & App - 2024',
    image: '/images/projects/SaudiaBEYOND/Second/2.jpg',
    class: 'col-span-12 lg:col-span-5',
  },
  {
    title: 'Zona Herragro',
    caption: 'E-Commerce - 2023',
    image: '/images/projects/Herragro/First/1.jpg',
    class: 'col-span-12 lg:col-span-5',
  },
  {
    title: 'Saudia Airlines',
    caption: 'IFE, UX/UI & Branding Design - 2024',
    image: '/images/projects/SaudiaAirlines/First/1.jpg',
    class: 'col-span-12 lg:col-span-7',
    cabinConcept: true,
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
          speed='20'
          autoFill
          direction='left'
          gradient
          gradientColor='#151B21'
        >
          {clients.map((client) => (
            <div key={client.title} className='client mx-10'>
              <Image
                src={client.image}
                alt={client.title}
                width={150}
                height={150}
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
      <h2 className='text-5xl mb-10'>
        <span className='text-main-gray'>Latest</span> Projects
      </h2>
      <div className='grid grid-cols-12 gap-5'>
        {projects.map((project) => {
          const { cabinConcept = false } = project;
          return (
            <div
              key={project.title}
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
              />
              <div className='caption p-3 px-10 project-info rounded-full w-[90%] absolute bottom-3 left-0 right-0 mx-auto'>
                <h3>{project.title}</h3>
                <p>{project.caption}</p>
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
            <div key={index} className='tool'>
              <Image
                src={tool.image}
                alt={tool.title}
                width={50}
                height={50}
                className='max-h-[50px] w-auto'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Experience = () => {
  return (
    <div id='experience' className=''>
      <h2>
        <span className='text-main-gray'>My</span> Experience
      </h2>
    </div>
  );
};
