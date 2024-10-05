import Link from 'next/link';

const Component = () => {
  return (
    <footer>
      <div className='site-container py-10 border-t-2 border-t-main-gray/70 text-main-gray'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-end'>
          <p className='order-2 lg:order-1 textLight text-center lg:text-left mt-5 lg:mt-0'>
            {new Date().getFullYear()} &copy; bryangr
          </p>
          <div className='order-1 lg:order-2'>
            <nav className='flex items-center justify-center lg:justify-end space-x-8 text-2xl lg:text-4xl'>
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
