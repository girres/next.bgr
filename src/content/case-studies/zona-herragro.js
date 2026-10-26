/** @type {import('./types').CaseStudy} */
const zonaHerragro = {
  slug: 'zona-herragro',
  title: 'Zona Herragro',
  client: 'Zona Herragro',
  year: 2023,
  website: 'https://www.zonaherragro.com',
  listing: {
    number: '04',
    headline: 'A private B2B marketplace built to streamline agricultural supply',
    description:
      'End-to-end marketplace experience connecting agricultural suppliers with streamlined ordering, catalog management, and logistics.',
    image: '/images/projects/zonaHerragro/1.jpg',
    tags: ['B2B E-Commerce', 'Logistics UX', 'Web & App'],
  },
  hiring: {
    role: 'Product Designer (UX/UI)',
    projectType: 'Private B2B e-commerce, web & app',
    responsibilities: [
      'UX/UI for a closed marketplace for customers and internal teams',
      'Catalog, ordering, and logistics flows tuned to agricultural supply chains',
      'Motion and visual design supporting brand trust in a technical category',
      'Alignment with engineering on a responsive, operations-ready product',
    ],
  },
  tags: [
    'E-commerce',
    'User Research',
    'User Experience Design',
    'Interaction Design',
    'Graphics Design',
  ],
  overview:
    'Outdated tooling was slowing sales and logistics. We designed a private web and app platform so customers and staff could order, coordinate, and operate from one coherent experience.',
  heroMedia: {
    type: 'image',
    src: '/images/projects/zonaHerragro/1.jpg',
    alt: 'Zona Herragro marketplace interface',
  },
  sections: [
    {
      id: 'marketplace',
      title: 'B2B marketplace',
      body: 'Ordering and catalog patterns built for repeat B2B buyers — not a repurposed consumer shop.',
      media: {
        type: 'image',
        src: '/images/projects/zonaHerragro/2.jpg',
        alt: 'Catalog and ordering screens',
        layout: 'full',
      },
    },
    {
      id: 'operations',
      title: 'Operations & brand motion',
      body: 'Visual design and motion reinforce reliability in a category where trust drives conversion.',
      media: {
        type: 'image',
        src: '/images/projects/zonaHerragro/3.jpg',
        alt: 'Operations and product views',
        layout: 'full',
      },
    },
  ],
  gallery: [
    '/images/projects/zonaHerragro/1.jpg',
    '/images/projects/zonaHerragro/2.jpg',
    '/images/projects/zonaHerragro/3.jpg',
    '/images/projects/zonaHerragro/4.jpg',
  ],
  outcomes: {
    metrics: [
      { value: 'B2B', label: 'Private platform', detail: 'Customers & employees' },
      { value: 'Web + App', label: 'Delivery', detail: 'Unified UX' },
    ],
    lessons: [
      'B2B marketplaces need clarity on roles and permissions early — IA is the product.',
      'Motion can humanize industrial categories without sacrificing professionalism.',
    ],
    conclusion:
      'Zona Herragro now presents a modern digital front door for supply operations — easier to buy, easier to run, and aligned with how the business actually works.',
  },
  navigation: { nextSlug: 'nuela' },
};

export default zonaHerragro;
