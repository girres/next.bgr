import Image from 'next/image';
import Link from 'next/link';

const Component = () => {
  return (
    <header className='flex items-center justify-between p-8'>
      <div className='flex items-center space-x-4'>
        <Image src='/logo.svg' alt='Logo' width={40} height={40} />
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
    </header>
  );
};

export default Component;
