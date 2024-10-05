import Image from 'next/image';
import Link from 'next/link';
import { ImLocation } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';

const Component = () => {
  return (
    <header className='fixed w-full z-50 py-3'>
      <div className='site-container flex items-center justify-between'>
        <div className='lg:flex items-center space-x-4'>
          <Link href='/'>
            <Image src='/logo.svg' alt='Logo' width={50} height={50} />
          </Link>
          <div className='hidden lg:flex fontMedium items-center lg:pl-[200px]'>
            <ImLocation className='w-4 h-4 mr-1' />
            Based in Madrid, Spain
          </div>
        </div>
        <nav className='flex items-center space-x-4'>
          <Link href='/#projects'>Projects</Link>
          <Link
            className='btn-gradient-dark flex'
            href='mailto:hello@bryangr.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MdEmail className='w-4 h-4' />
            hello@bryangr.com
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Component;
