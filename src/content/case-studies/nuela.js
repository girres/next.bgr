/** @type {import('./types').CaseStudy} */
const nuela = {
  slug: 'nuela',
  title: 'Nuela AI',
  client: 'Nuela',
  year: 2024,
  website: 'https://www.nuela.ai/',
  listing: {
    number: '05',
    headline: 'Unifying SIS, ERP and LMS\nin one AI-native school ecosystem',
    description:
      'AI-native EdTech platform integrating school information, ERP, and learning management for educators and administrators.',
    image: '/images/projects/nuela/app-showcase.jpg',
    imageFit: 'cover',
    imagePosition: 'center center',
    showcase: true,
    tags: ['EdTech SaaS', 'SIS + ERP + LMS', 'Native AI'],
  },
  hiring: {
    role: 'Product Designer',
    projectType: 'EdTech SaaS, AI-native workflows',
    responsibilities: [
      'Product UX for unified school operations across SIS, ERP, and LMS surfaces',
      'Information architecture for admin, teacher, and leadership roles',
      'AI-assisted workflows with clear human oversight and trust patterns',
      'Design system and UI patterns for a complex multi-module platform',
    ],
  },
  tags: ['EdTech', 'SaaS', 'AI', 'B2B', 'Design Systems'],
  overview:
    'Schools juggle disconnected systems for records, finance, and learning. Nuela brings those capabilities into one AI-native ecosystem so teams spend less time switching tools and more time supporting students.',
  heroMedia: {
    type: 'image',
    src: '/images/projects/nuela/app-showcase.jpg',
    alt: 'Nuela AI school platform showcase',
  },
  sections: [
    {
      id: 'ecosystem',
      title: 'One ecosystem, many modules',
      body: 'Shared navigation and patterns connect modules that used to live in separate products.',
      media: {
        type: 'image',
        src: '/images/projects/nuela/1.png',
        alt: 'Nuela module overview',
        layout: 'full',
      },
    },
  ],
  gallery: ['/images/projects/nuela/app-showcase.jpg', '/images/projects/nuela/1.png'],
  outcomes: {
    metrics: [
      { value: '3', label: 'Core systems', detail: 'SIS, ERP, LMS' },
      { value: 'AI', label: 'Native workflows', detail: 'Assistant-led tasks' },
    ],
    lessons: [
      'EdTech UX must respect role-based permissions — teachers and admins see different truths.',
      'AI features need explicit affordances so users know what is automated vs. editable.',
    ],
    conclusion:
      'Nuela is built for schools that outgrew patchwork software — a single place to run operations with AI where it actually saves time.',
  },
  navigation: { nextSlug: 'saudia-airlines' },
};

export default nuela;
