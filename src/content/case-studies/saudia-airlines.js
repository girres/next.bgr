/** @type {import('./types').CaseStudy} */
const saudiaAirlines = {
  slug: 'saudia-airlines',
  title: 'Saudia Airlines',
  client: 'Saudia Airlines',
  year: '2022–2024',
  listing: {
    number: '01',
    headline: 'Award-winning IFE — discovery, ordering and entertainment at 35,000 ft',
    description:
      'Panasonic and Thales in-flight systems redesigned for clearer discovery, onboard ordering, and entertainment across long-haul fleets.',
    image: '/images/projects/saudiaAirlines/card-poster.jpg',
    gif: '/images/projects/saudiaAirlines/card.gif',
    tags: ['In-Flight Entertainment', 'Panasonic × Thales', 'UX/UI Systems'],
    award: {
      title: 'Best Onboard Entertainment',
      source: 'Onboard Hospitality Awards',
      href: 'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
    },
  },
  hiring: {
    role: 'UX/UI Product Designer',
    projectType: 'UX/UI, IFE-C systems, passenger experience',
    team: [
      { name: 'Panasonic & Thales', role: 'OEM implementation partner' },
      { name: 'Julian Harris', role: 'UX Director' },
      { name: 'Catherine Grey', role: 'Creative Director' },
      { name: 'Eduarda Zacaro', role: 'Product designer' },
      { name: 'Bryan Giraldo (Me)', role: 'Product designer' },
      { name: 'Arif Saeed', role: 'PM' },
    ],
    responsibilities: [
      'Designed UX/UI for next-generation seat-back IFE on Panasonic and Thales hardware, from discovery to delivery.',
      'Improved and extended the SaudiaBEYOND design system to cover new entertainment and service patterns.',
      'Redesigned entertainment sections for movies, series, videos, and games, improving hierarchy, discovery, and navigation.',
      'Designed seat-to-seat communication features.',
      'Improved the touch device experience so it mirrors and complements what passengers see on the main screen.',
      'Ran the full design process: research, data analysis, ideation, prototyping, and iteration.',
      "Maintained constant alignment with Panasonic's development team to translate designs into buildable flows and components.",
      'Applied accessibility, contrast, and legibility standards for cabin viewing conditions.',
    ],
  },
  tags: [
    'User Research',
    'Interaction Design',
    'User Experience Design',
    'Inflight Entertainment (IFE-C)',
    'Design Systems',
    'Creative & Experience Design',
  ],
  overview:
    'I extended the SaudiaBEYOND brand system onto next-generation IFE-C platforms from Panasonic and Thales. The challenge was to replace an outdated navigation with an experience that keeps passengers engaged for long flights, and that feels unmistakably Saudia at scale across the long-haul fleet.',
  challenge: [
    "Saudia's previous in-flight navigation was outdated and did little to encourage passengers to explore content during long flights. Many travelers arrived already prepared, with downloaded music and videos, which meant the onboard system was not competing for their attention. The goal was to transform the seat-back experience into a reason to stay engaged, and to shift the relationship with onboard content so passengers see it as part of the journey.",
    'The strategy went beyond the screen. Passengers were encouraged to download additional audiovisual content before boarding, extending the experience from the airport to the cabin.',
  ],
  userTesting:
    'I conducted in-person usability testing with approximately 40 participants. Each participant received a device and was given tasks to complete, ranging from individual goals to group scenarios. Alongside direct observation and feedback, we used an internal analytics tool to track heatmaps and dead clicks, which helped us identify friction points that participants did not always verbalize.',
  userTestingMedia: {
    type: 'video',
    src: '/images/projects/saudiaAirlines/user-testing.mp4',
    alt: 'Usability testing of the in-flight entertainment prototype',
    aspect: '1068 / 1540',
  },
  heroMedia: {
    type: 'image',
    src: '/images/projects/saudiaAirlines/1.jpg',
    alt: 'Saudia Airlines in-flight entertainment interface on seat-back display',
  },
  sections: [
    {
      id: 'discovery',
      kicker: 'Scope & Primary Journey',
      title: 'Content Discovery & AVOD',
      body:
        "Movie and series discovery needed to work at arm's length, in variable lighting, and without friction. I restructured hierarchy, artwork, and metadata so passengers find what they want in fewer steps.",
      media: {
        type: 'video',
        src: '/images/projects/saudiaAirlines/1.mp4',
        alt: 'IFE interaction prototype',
        layout: 'full',
      },
    },
    {
      id: 'ordering',
      title: 'Onboard Ordering & Services',
      body:
        'Seat-back shopping and food ordering share patterns with entertainment so the cabin feels like one product, not a stack of separate apps.',
      media: [
        {
          type: 'video',
          src: '/images/projects/saudiaAirlines/2.mp4',
          alt: 'IFE system walkthrough video',
          layout: 'contained',
        },
        {
          type: 'image',
          src: '/images/projects/saudiaAirlines/3.jpg',
          alt: 'AVOD browsing and content discovery screens',
          layout: 'contained',
        },
      ],
    },
    {
      id: 'oem',
      title: 'OEM Collaboration',
      body:
        'Design only ships when engineering can build it. I worked weekly with the Panasonic team to align flows, business rules, and component constraints.',
      mediaRotate: 3000,
      media: [
        {
          type: 'image',
          src: '/images/projects/saudiaAirlines/5.jpg',
          alt: 'Annotated Seat Chat specification reviewed with the Panasonic team',
          layout: 'pair',
        },
        {
          type: 'image',
          src: '/images/projects/saudiaAirlines/6.jpg',
          alt: 'Design workshop with the implementation team',
          layout: 'pair',
        },
        {
          type: 'image',
          src: '/images/projects/saudiaAirlines/2.jpg',
          alt: 'Video call with the implementation team',
          layout: 'pair',
        },
        {
          type: 'image',
          src: '/images/projects/saudiaAirlines/4.jpg',
          alt: 'Workshop sorting content categories on the wall',
          layout: 'pair',
        },
      ],
    },
  ],
  gallery: [
    '/images/projects/saudiaAirlines/1.jpg',
    '/images/projects/saudiaAirlines/2.jpg',
    '/images/projects/saudiaAirlines/3.jpg',
    '/images/projects/saudiaAirlines/4.jpg',
    '/images/projects/saudiaAirlines/5.jpg',
    '/images/projects/saudiaAirlines/6.jpg',
  ],
  videos: [
    '/images/projects/saudiaAirlines/1.mp4',
    '/images/projects/saudiaAirlines/2.mp4',
    '/images/projects/saudiaAirlines/user-testing.mp4',
  ],
  awards: [
    {
      title: 'Best Onboard Entertainment',
      href: 'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
      image: '/images/home/cabinConcept.png',
    },
  ],
  outcomes: {
    metrics: [
      { value: '63%', label: 'Usage increase', detail: 'Onboard device usage' },
      { value: '22%', label: 'Conversion', detail: 'In-flight purchase conversion' },
      { value: '2', label: 'OEM platforms', detail: 'Panasonic & Thales IFE-C' },
    ],
    lessons: [
      'Cabin contrast and type size matter as much as visual polish. Design for the seat, not the Figma frame.',
      'Shared patterns between entertainment and commerce reduce cognitive load when passengers are tired.',
      'A consistent rhythm with OEM partners (weekly reviews, recorded walkthroughs) prevented late-stage rework.',
    ],
    conclusion:
      'SaudiaBEYOND gave Saudia a coherent voice. This program showed it could scale through complex hardware constraints without diluting hospitality or clarity. The result is an experience passengers can navigate intuitively, and an award-winning benchmark for onboard entertainment.',
  },
  navigation: { nextSlug: 'reteki' },
};

export default saudiaAirlines;
