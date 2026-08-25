import Script from 'next/script';

// CSS
import '@/styles/globals.scss';

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SnowProvider from '@/components/SnowEffect';
import SmoothScroll from '@/components/SmoothScroll';

const siteUrl = 'https://www.bryangr.com';
const siteTitle = 'Bryan Girado — End-to-End Product Designer & Front-End Builder';
const siteDescription =
  'Madrid-based end-to-end product designer and front-end builder. I design and ship digital products — from strategic discovery and UX/UI to modular front-end development.';

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Bryan Girado',
    'Product Designer',
    'Front-End Builder',
    'End-to-End Product Design',
    'UX/UI Designer',
    'Madrid',
    'Design Systems',
    'SaaS Product Design',
    'In-Flight Entertainment UX',
    'Front-End Development',
  ],
  authors: [{ name: 'Bryan Girado', url: siteUrl }],
  creator: 'Bryan Girado',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Bryan Girado',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/SEO.jpg',
        width: 1200,
        height: 630,
        alt: 'Bryan Girado — End-to-End Product Designer & Front-End Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/SEO.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <SnowProvider>
          <SmoothScroll />
          <CustomCursor />
          <Header />
          {children}
          <Footer />
          <Script src='//madremia.s3.us-west-2.amazonaws.com/signature.js' strategy='lazyOnload' />
        </SnowProvider>
      </body>
    </html>
  );
}
