import Link from 'next/link';

const Component = () => {
  return (
    <footer>
      <div className='site-container py-20 border-t-2 border-t-main-gray text-main-gray'>
        <div className='grid grid-cols-2 items-end'>
          <p className='textLight'>{new Date().getFullYear()} &copy; bryangr</p>
          <div className=''>
            <nav className='flex items-center justify-end space-x-8 text-4xl'>
              <Link
                href='mailto:hello@bryangr.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:scale-105 transition-all transition-300'
              >
                My <span className='text-main-white'>Contact</span>
              </Link>
              <Link
                href='http://linkedin.com/in/bryan-giraldo-restrepo-9522521a4'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:scale-105 transition-all transition-300'
              >
                My <span className='text-main-white'>LinkedIn</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Component;
