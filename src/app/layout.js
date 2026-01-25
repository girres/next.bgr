import Script from 'next/script';

// CSS
import '@/styles/globals.scss';

// Components
import FloatingDock from '@/components/FloatingDock';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SnowEffect from '@/components/SnowEffect';
import LocationBadge from '@/components/LocationBadge';

export const metadata = {
  title: 'Bryan Girado / UX & UI Designer',
  description:
    "I'm Bryan — a User Experience & User Interface Designer from Spain, dedicated to making digital experiences more intuitive and engaging.",
  image: '/SEO.jpg',
  metadataBase: new URL('https://www.bryangr.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_EN',
    site_name: 'Bryan G',
    images: [
      {
        url: '/SEO.jpg',
        width: 1200,
        height: 630,
        alt: 'Bryan G',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <CustomCursor />
        <FloatingDock />
        <LocationBadge />
        <SnowEffect />
        {children}
        <Footer />
      </body>
      <Script src='//madremia.s3.us-west-2.amazonaws.com/signature.js' />
    </html>
  );
}
