import Image from 'next/image';
import Link from 'next/link';
import { ImLocation } from 'react-icons/im';

const Component = () => {
  return (
    <header className='bg-main-purple fixed w-full z-50 py-3'>
      <div className='site-container flex items-center justify-between'>
        <div className='lg:flex items-center space-x-4'>
          <Image src='/logo.svg' alt='Logo' width={50} height={50} />
          <div className='hidden lg:flex fontMedium items-center lg:pl-[200px]'>
            <ImLocation className='w-4 h-4 mr-1' />
            Based in Madrid, Spain
          </div>
        </div>
        <nav className='flex items-center space-x-4'>
          <Link href='/#about'>About me</Link>
          <Link href='/#projects'>Projects</Link>
          <Link
            className='btn-gradient-dark'
            href='mailto:bryangr980310@gmail.com'
          >
            bryangr980310@gmail.com
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Component;
