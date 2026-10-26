/** @type {import('./types').CaseStudy} */
const saudiaAirlines = {
  slug: 'saudia-airlines',
  title: 'Saudia Airlines',
  client: 'Saudia Airlines',
  year: 2024,
  listing: {
    number: '01',
    headline: 'Award-winning IFE — discovery, ordering and entertainment at 35,000 ft',
    description:
      'Panasonic and Thales in-flight systems redesigned for clearer discovery, onboard ordering, and entertainment across long-haul fleets.',
    image: '/images/projects/saudiaAirlines/1.jpg',
    video: '/images/projects/saudiaAirlines/1.mp4',
    videoClipEnd: 12,
    tags: ['In-Flight Entertainment', 'Panasonic × Thales', 'UX/UI Systems'],
    award: {
      title: 'Best Onboard Entertainment',
      source: 'Onboard Hospitality Awards',
      href: 'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
    },
  },
  hiring: {
    role: 'Lead Product & Experience Designer',
    projectType: 'UX/UI, IFE-C systems, passenger experience',
    team: [
      { name: 'Panasonic Avionics', role: 'OEM implementation partner' },
      { name: 'Thales', role: 'OEM implementation partner' },
    ],
    responsibilities: [
      'End-to-end UX/UI for next-generation seat-back IFE on Panasonic and Thales hardware',
      'Content discovery, AVOD browsing, and personalized recommendations',
      'Onboard shopping, food ordering, and ancillary service flows',
      'Application of the SaudiaBEYOND design system across touchpoints',
      'Weekly OEM design reviews, walkthroughs, and usability testing',
      'Accessibility, contrast, and legibility standards for cabin viewing conditions',
    ],
  },
  tags: [
    'User Research',
    'Interaction Design',
    'User Experience Design',
    'Inflight Entertainment (IFE-C)',
    'Creative & Experience Design',
  ],
  overview:
    'After defining SaudiaBEYOND as the passenger experience brand, we extended that system onto next-generation IFE-C platforms from Panasonic and Thales. The goal was a best-in-class discovery and ordering experience that feels unmistakably Saudia — at scale across long-haul fleets.',
  heroMedia: {
    type: 'image',
    src: '/images/projects/saudiaAirlines/2.jpg',
    alt: 'Saudia Airlines in-flight entertainment interface on seat-back display',
  },
  sections: [
    {
      id: 'discovery',
      kicker: 'Scope & primary journey',
      title: 'Content discovery & AVOD',
      body:
        'Movie and series discovery needed to work at arm’s length, in variable lighting, and without friction. We structured hierarchy, artwork, and metadata so passengers find what they want in fewer steps.',
      media: {
        type: 'image',
        src: '/images/projects/saudiaAirlines/3.jpg',
        alt: 'AVOD browsing and content discovery screens',
        layout: 'full',
      },
    },
    {
      id: 'ordering',
      title: 'Onboard ordering & services',
      body:
        'Seat-back shopping and food ordering share patterns with entertainment so the cabin feels like one product — not a stack of separate apps.',
      media: [
        {
          type: 'image',
          src: '/images/projects/saudiaAirlines/4.jpg',
          alt: 'Onboard ordering interface',
          layout: 'contained',
        },
        {
          type: 'video',
          src: '/images/projects/saudiaAirlines/1.mp4',
          alt: 'IFE interaction prototype',
          layout: 'contained',
        },
      ],
    },
    {
      id: 'oem',
      title: 'OEM collaboration',
      body:
        'Design only ships when engineering can build it. We paired weekly with Panasonic and Thales teams to align flows, business rules, and component constraints.',
      media: {
        type: 'video',
        src: '/images/projects/saudiaAirlines/2.mp4',
        alt: 'IFE system walkthrough video',
        layout: 'full',
      },
    },
  ],
  gallery: [
    '/images/projects/saudiaAirlines/1.jpg',
    '/images/projects/saudiaAirlines/2.jpg',
    '/images/projects/saudiaAirlines/3.jpg',
    '/images/projects/saudiaAirlines/4.jpg',
  ],
  videos: ['/images/projects/saudiaAirlines/1.mp4', '/images/projects/saudiaAirlines/2.mp4'],
  awards: [
    {
      title: 'Best Onboard Entertainment',
      href: 'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
      image: '/images/home/cabinConcept.png',
    },
  ],
  outcomes: {
    metrics: [
      { value: 'Award', label: 'Best Onboard Entertainment', detail: 'Onboard Hospitality Awards' },
      { value: '2', label: 'OEM platforms', detail: 'Panasonic & Thales IFE-C' },
      { value: 'Fleet', label: 'Long-haul rollout', detail: 'Passenger-facing seat-back experience' },
    ],
    lessons: [
      'Cabin contrast and type size matter as much as visual polish — design for the seat, not the Figma frame.',
      'Shared patterns between entertainment and commerce reduce cognitive load when passengers are tired.',
      'OEM partnership rhythm (weekly reviews, recorded walkthroughs) prevented late-stage rework.',
    ],
    conclusion:
      'SaudiaBEYOND gave us a coherent voice; this program proved it could scale through complex hardware constraints without diluting hospitality or clarity. The result is an experience passengers can navigate intuitively — and an award-winning benchmark for onboard entertainment.',
  },
  navigation: { nextSlug: 'reteki' },
};

export default saudiaAirlines;
