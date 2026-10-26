/** @type {import('./types').CaseStudy} */
const reteki = {
  slug: 'reteki',
  title: 'Reteki',
  client: 'Reteki',
  year: 2022,
  listing: {
    number: '02',
    headline: 'Consumer rentals and corporate sales — two products, one brand',
    description:
      'Dual-audience product strategy unifying consumer rentals and corporate sales under one cohesive digital brand.',
    image: '/images/projects/reteki/2.jpg',
    tags: ['Dual-Audience UX', 'Web & App', 'Motion Design'],
  },
  hiring: {
    role: 'Product Designer (UX/UI)',
    projectType: 'Web, mobile app, motion design',
    responsibilities: [
      'Separate UX flows for consumers and business accounts while preserving one brand system',
      'E-commerce journeys from browse to checkout for rentals and purchases',
      'Corporate capabilities: multi-account management, payments, and analytics views',
      'Motion graphics to support marketing and in-product storytelling',
      'Close collaboration with engineering on responsive implementation',
    ],
  },
  tags: [
    'E-commerce',
    'User Research',
    'User Experience Design',
    'Interaction Design',
    'Motion Graphics & Animation',
  ],
  overview:
    'Reteki rents and sells devices to individuals and companies. I designed distinct web and app experiences for each audience — simple self-serve for consumers, robust tooling for businesses — without fragmenting the brand.',
  heroMedia: {
    type: 'image',
    src: '/images/projects/reteki/1.jpg',
    alt: 'Reteki consumer and business platform overview',
  },
  sections: [
    {
      id: 'consumer',
      title: 'Consumer experience',
      body: 'A streamlined path from catalog to checkout, optimized for mobile and repeat renters.',
      media: {
        type: 'image',
        src: '/images/projects/reteki/2.jpg',
        alt: 'Reteki consumer interface',
        layout: 'full',
      },
    },
    {
      id: 'business',
      title: 'Corporate platform',
      body: 'Advanced account structures and operational views for teams managing fleet-scale orders.',
      media: {
        type: 'image',
        src: '/images/projects/reteki/3.jpg',
        alt: 'Reteki business dashboard',
        layout: 'full',
      },
    },
  ],
  gallery: [
    '/images/projects/reteki/1.jpg',
    '/images/projects/reteki/2.jpg',
    '/images/projects/reteki/3.jpg',
    '/images/projects/reteki/4.jpg',
  ],
  outcomes: {
    metrics: [
      { value: '2', label: 'Audience modes', detail: 'Consumer & corporate' },
      { value: 'Web + App', label: 'Platforms', detail: 'Shared design language' },
    ],
    lessons: [
      'Dual-audience products need shared components but different information architecture — not two unrelated sites.',
      'Motion helped explain rental vs. purchase models faster than static screens alone.',
    ],
    conclusion:
      'Reteki ships as one brand with two tailored experiences — giving each audience the right depth without duplicate design systems.',
  },
  navigation: { nextSlug: 'saudia-beyond' },
};

export default reteki;
