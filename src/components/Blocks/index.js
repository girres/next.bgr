import AnimatedTooltip from '@/components/AnimatedTooltip';
import WorkStack from '@/components/WorkStack';
import ClientsMarquee from '@/components/ClientsMarquee';
import EffortCards from '@/components/EffortCards';
import ExperienceSection from '@/components/ExperienceSection';

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
      <h3 className='lg:w-[20%] flex-shrink-0 mb-10 lg:mb-0' data-reveal>
        Worked <span className='text-muted'>with:</span>
      </h3>
      <div className='w-full lg:flex-1 mt-5 lg:mt-0' data-reveal data-reveal-lag='28'>
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
    <div id='efforts' className='text-muted'>
      <h2 className='mb-10 lg:mb-14 max-w-3xl text-ink' data-reveal>
        How can I align my efforts to{' '}
        <span className='font-medium'>better meet</span> your{' '}
        <span className='font-medium'>business needs?</span>
      </h2>
      <EffortCards items={efforts} />
    </div>
  );
};

export const Tools = () => {
  return (
    <div id='tools' className='text-muted'>
      <h2 className='max-w-3xl mb-10 lg:mb-14 text-ink' data-reveal>
        Tools & technologies I use to{' '}
        <span className='font-medium'>design</span>,{' '}
        <span className='font-medium'>prototype</span>, and{' '}
        <span className='font-medium'>build digital products</span>
      </h2>
      <div className='tools-row mt-10 lg:mt-12' data-reveal data-reveal-lag='28'>
        <AnimatedTooltip items={tools} />
      </div>
    </div>
  );
};

export const Experience = ExperienceSection;
