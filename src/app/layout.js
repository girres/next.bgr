// CSS
import '@/styles/globals.scss';

// Components
import Header from '@/components/Header';

export const metadata = {
  title: 'Bryan G',
  description: 'Bryan G',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
        <footer>
          <p>Footer goes here</p>
        </footer>
      </body>
    </html>
  );
}
