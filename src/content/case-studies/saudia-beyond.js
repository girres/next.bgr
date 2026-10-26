/** @type {import('./types').CaseStudy} */
const saudiaBeyond = {
  slug: 'saudia-beyond',
  title: 'SaudiaBEYOND',
  client: 'Saudia Airlines',
  year: 2024,
  website: 'https://entertainment.saudia.com',
  listing: {
    number: '03',
    headline: 'Saudi heritage and future vision\nacross IFE, web and mobile',
    description:
      'Passenger experience brand extending cultural storytelling across IFE, web, and mobile touchpoints for Saudia guests.',
    image: '/images/projects/saudiaBeyond/6.jpg',
    tags: ['Brand Identity', 'Arabic Typography', 'Multi-Platform'],
  },
  hiring: {
    role: 'Brand & Experience Designer',
    projectType: 'Brand identity, IFE, web & app',
    responsibilities: [
      'Multi-platform passenger experience brand for IFE and digital touchpoints',
      'Bilingual typography system: Latin sans serif plus custom Arabic calligraphy',
      'Visual language: brand bar, photography direction, UI component foundations',
      'Entertainment web and app experience aligned with cabin systems',
      'Motion and campaign assets supporting launch narrative',
    ],
  },
  tags: [
    'User Research',
    'Brand Identity Design',
    'Interaction Design',
    'User Experience Design',
    'Inflight Entertainment (IFE-C)',
    'Arabic Design & Typography',
  ],
  overview:
    'Saudia needed a passenger experience brand that reflects Saudi Arabia’s future while honoring tradition. SaudiaBEYOND anchors entertainment, web, and cabin UI in one hospitable, forward-looking system.',
  heroMedia: {
    type: 'image',
    src: '/images/projects/saudiaBeyond/1.jpg',
    alt: 'SaudiaBEYOND brand system overview',
  },
  sections: [
    {
      id: 'identity',
      title: 'Brand identity & typography',
      body: 'Readable Latin type paired with custom Arabic forms — progress symbolized through geometry and photography.',
      media: {
        type: 'image',
        src: '/images/projects/saudiaBeyond/2.jpg',
        alt: 'SaudiaBEYOND typography and brand elements',
        layout: 'full',
      },
    },
    {
      id: 'touchpoints',
      title: 'Across touchpoints',
      body: 'From entertainment portal to seat-back UI, the same hospitality shows up in layout, tone, and imagery.',
      media: [
        {
          type: 'image',
          src: '/images/projects/saudiaBeyond/5.jpg',
          alt: 'Digital touchpoint designs',
          layout: 'pair',
        },
        {
          type: 'image',
          src: '/images/projects/saudiaBeyond/6.jpg',
          alt: 'IFE and web experience',
          layout: 'pair',
        },
      ],
    },
  ],
  gallery: [
    '/images/projects/saudiaBeyond/1.jpg',
    '/images/projects/saudiaBeyond/2.jpg',
    '/images/projects/saudiaBeyond/3.jpg',
    '/images/projects/saudiaBeyond/4.jpg',
    '/images/projects/saudiaBeyond/5.jpg',
    '/images/projects/saudiaBeyond/6.jpg',
    '/images/projects/saudiaBeyond/7.jpg',
  ],
  outcomes: {
    metrics: [
      { value: 'Multi', label: 'Platforms', detail: 'IFE, web, mobile' },
      { value: 'Bi', label: 'Script system', detail: 'Latin & Arabic' },
    ],
    lessons: [
      'Cultural brands need typographic craft in both scripts — not a translated afterthought.',
      'A single design system accelerates every downstream IFE and product sprint.',
    ],
    conclusion:
      'SaudiaBEYOND is the experience layer Saudia shows the world: warm, modern, and unmistakably Saudi — ready to extend into every passenger moment.',
  },
  navigation: { nextSlug: 'zona-herragro' },
};

export default saudiaBeyond;
