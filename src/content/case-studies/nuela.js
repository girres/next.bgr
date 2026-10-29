/** @type {import('./types').CaseStudy} */
const nuela = {
  slug: 'nuela',
  title: 'Nuela AI',
  client: 'Nuela',
  year: 2024,
  website: 'https://www.nuela.ai/',
  seo: {
    description:
      'Lead Product Designer for Nuela AI, an AI-native school platform that cut timetable creation from 1–2 months to under 6 minutes.',
    canonical: 'https://www.bryangr.com/nuela',
    keywords: [
      'Bryan Girado',
      'Lead Product Designer',
      'Product Design',
      'EdTech',
      'SaaS',
      'AI-native',
      'Design Systems',
      'Timetable',
      'School Management',
      'Front-End Builder',
    ],
    image: {
      url: 'https://www.bryangr.com/SEO.jpg',
      width: 1200,
      height: 630,
      alt: 'Bryan Girado — End-to-End Product Designer & Front-End Builder',
    },
  },
  listing: {
    number: '05',
    headline:
      'From months of manual timetables to minutes — one AI-native platform to run and manage the whole school.',
    description:
      'From months of manual timetables to minutes — one AI-native platform to run and manage the whole school.',
    image: '/images/projects/nuela/app-showcase.jpg',
    gif: '/images/projects/nuela/card.gif',
    imageFit: 'cover',
    imagePosition: 'center bottom',
    showcase: true,
    tags: ['EdTech SaaS', 'AI-native', 'Product Design'],
  },
  hiring: {
    role: 'Lead Product Designer',
    projectType: 'EdTech SaaS, AI-native workflows',
    team: [
      { name: 'Engineers', role: '5' },
      { name: 'Designers', role: '2' },
    ],
    responsibilities: [
      'Led product design for the platform, from discovery and information architecture to UX, UI, and interaction design.',
      'Built the design processes, the design system, and the collaboration workflow with the engineering team.',
      'Hired, trained, and guided the design team as it grew, after the first seven to eight months of working alone.',
      'Designed and developed the website in code, using AI-assisted development tools such as Cursor and Claude Code.',
      'Shaped the brand and marketing so the product and its messaging reflected the same identity.',
      'Designed the web platform, the teacher app, and role-specific tools across the product — adapting flows, density, and onboarding to how administrators, coordinators, and teachers actually work.',
      'Partnered with pilot schools on continuous testing — using weekly feedback from teachers and coordinators to refine releases and prioritize what we built next.',
    ],
  },
  tags: [
    'Product Design',
    'Lead Design',
    'UX/UI Design',
    'Design Systems',
    'User Research',
    'Information Architecture',
    'Interaction Design',
    'Front-End Development',
    'AI Product Design',
    'Brand & Marketing',
  ],
  overview:
    'I joined Nuela as the fifth employee to lead product design. The company was building an AI-native platform for schools, starting with timetables. Timetables are the core data of a school: they define teacher workloads, free slots, and class assignments. Once that core existed, it became the foundation for a wider ecosystem of tools that help school leaders make better decisions and run daily operations from one place.',
  challenge: [
    'Heads of Studies and school administrators spent one to two months every summer building timetables by hand, on paper and in spreadsheets. Their work was slow, error-prone, and largely disconnected from the technology they used every day. Beyond saving time, the challenge was to earn their trust: they needed to see that AI was there to help them and guide them, not to replace their judgment or add more work.',
    'The business goal was to prove that a reliable timetable generator could become the entry point to a larger product. From that core, we could build tools such as teacher substitutions, workload visibility, and optimization of slots and subject assignments.',
    'Working as a startup meant time was the main constraint. Every decision had to be prioritized, and some of the choices I believed were right had to be tested against real users before they became final. The biggest constraint of all was the time of the school staff themselves: busy professionals who are often reluctant to change the way they work.',
  ],
  research: [
    'Research was direct and close to the users. I interviewed teachers, students, and administrators to understand how they planned timetables, where the process broke down, and how they felt about new tools. We visited schools to observe how teachers and coordinators used computers, tablets, and phones in their daily work, and how much they relied on paper.',
    'We also analyzed existing ERP and LMS tools that offered similar capabilities, to understand what they did well and where they fell short for this kind of user.',
    'Validation was continuous. We tested with real users, many of them from pilot schools whose teachers gave weekly feedback. That feedback shaped what we improved before each release and which new features we built next.',
  ],
  userTesting:
    'Testing was continuous and based on real users. Pilot schools gave weekly feedback from teachers and coordinators, and that feedback was used to improve existing tools before they reached production and to define new features. Validation came from daily work in schools, not from isolated test sessions.',
  heroMedia: {
    type: 'image',
    src: '/images/projects/nuela/1.jpg',
    alt: 'Nuela AI school platform showcase',
  },
  sections: [
    {
      id: 'timetable',
      kicker: 'Scope & Primary Journey',
      title: 'The Timetable Generator',
      body:
        'The timetable is the foundation of the platform. The generator builds a complete school timetable in under 6 minutes, a task that used to take one to two months of manual work each summer. Every generated schedule feeds the rest of the platform, including teacher workloads and free slots.',
      media: {
        type: 'image',
        src: '/images/projects/nuela/2.jpg',
        alt: 'The Timetable Generator',
        layout: 'full',
      },
    },
    {
      id: 'substitutions',
      title: 'Real-Time Substitutions & AI Assistant',
      body:
        'The visuals show substitutions as they happen in real time through the app — and the AI assistant at the center of the tool, where teachers and coordinators request cover, ask questions, and move requests forward in one place instead of phone chains and paper.',
      mediaRotate: 3000,
      media: [
        {
          type: 'image',
          src: '/images/projects/nuela/substitutions.jpg',
          alt: 'Real-time teacher substitutions in the Nuela mobile app',
          layout: 'contained',
        },
        {
          type: 'image',
          src: '/images/projects/nuela/substitutions-2.jpg',
          alt: 'Nuela AI assistant for substitution requests and staff queries',
          layout: 'contained',
        },
        {
          type: 'image',
          src: '/images/projects/nuela/substitutions-mobile.png',
          alt: 'Substitution request detail on the Nuela teacher app',
          layout: 'contained',
        },
      ],
    },
    {
      id: 'onboarding',
      title: 'Interactive Onboarding for Low-Tech Users',
      body:
        'Many of our users had spent years working with paper and spreadsheets. The onboarding had to be intuitive and reliable, guiding users step by step until they felt confident with the product. Activation was one of the hardest design problems in the project.',
      media: {
        type: 'image',
        src: '/images/projects/nuela/3.jpg',
        alt: 'Interactive onboarding flow for school staff',
        layout: 'full',
      },
    },
    {
      id: 'mental-models',
      title: 'Excel-Style Clarity for School Data',
      body:
        'Our users were used to reading data in Excel, with bright color coding and dense tables. Instead of imposing a new visual language, we adapted the interface to what they already knew, so the change to Nuela would feel natural rather than radical. Dense, complex data had to be readable at a glance.',
      media: {
        type: 'image',
        src: '/images/projects/nuela/4.jpg',
        alt: 'Excel-style clarity for school data',
        layout: 'full',
      },
    },
    {
      id: 'design-system',
      title: 'Design System, Team & Brand',
      body:
        'As the team grew, I built the design system and the processes that let designers and engineers work together. I also made sure the brand and marketing reflected the product, so every touchpoint told the same story.',
      media: {
        type: 'image',
        src: '/images/projects/nuela/5.jpg',
        alt: 'Design System, Team & Brand',
        layout: 'full',
      },
    },
  ],
  outcomes: {
    metrics: [
      {
        value: '100%',
        label: 'Regulatory compliance',
      },
      {
        value: '30s',
        label: 'Clock-in time',
      },
      {
        value: '0',
        label: 'Paper required',
      },
      {
        value: '95%',
        label: 'Reduction in time to build schedules',
      },
      {
        value: '0',
        label: 'Overlap conflicts',
      },
      {
        value: '+30%',
        label: 'Better space utilization',
      },
    ],
    lessons: [
      'Understanding the user goes beyond knowing who they are. You also need to know how, when, and with which devices they use technology, and what habits they already have.',
      "Good design is not always the one that looks best to the designer. It is the one the user can adopt. Adapting to users' existing mental models, even in visual choices like color coding, makes change much easier.",
      'Onboarding is part of the product. For users with years of manual work, onboarding has to build trust step by step, not just explain features.',
      'In a startup, time is the scarcest resource. Core data, such as the timetable, unlocks the rest of the ecosystem, so getting the foundation right matters most.',
    ],
    conclusion:
      'Nuela gives schools one AI-native place to run their operations. Starting with a timetable generator that saves months of work, the platform grew into a connected ecosystem built around trust, familiarity, and the real needs of the people who run schools every day.',
  },
  navigation: { nextSlug: 'saudia-beyond' },
};

export default nuela;
