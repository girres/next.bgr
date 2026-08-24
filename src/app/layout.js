import Script from 'next/script';

// CSS
import '@/styles/globals.scss';

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SnowProvider from '@/components/SnowEffect';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'Bryan Girado / Product Designer & AI Builder',
  description:
    "I'm Bryan — a Product Designer & AI Builder. I specialize in end-to-end product construction, using AI to transform deep customer insights into production-ready software.",
  image: '/SEO.jpg',
  metadataBase: new URL('https://www.bryangr.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_EN',
    site_name: 'Bryan G',
    title: 'Bryan Girado / Product Designer & AI Builder',
    description:
      "I'm Bryan — a Product Designer & AI Builder. I specialize in end-to-end product construction, using AI to transform deep customer insights into production-ready software.",
    images: [
      {
        url: '/SEO.jpg',
        width: 1200,
        height: 630,
        alt: 'Bryan Girado - Product Designer & AI Builder',
      },
    ],
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
        </SnowProvider>
      </body>
      <Script src='//madremia.s3.us-west-2.amazonaws.com/signature.js' />
    </html>
  );
}
