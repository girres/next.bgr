import Image from 'next/image';

import {
  Clients,
  Projects,
  Efforts,
  Tools,
  Experience,
} from '@/components/Blocks';

export default function Home() {
  return (
    <main className='min-h-screen pt-28 pb-20'>
      <h1 className='hidden'>Home Page</h1>
      <div className='site-container'>
        <div className='max-w-[300px]'>
          <Image
            src='/images/home/bgr.png'
            alt='BGR'
            width={500}
            height={500}
          />
          <div className='tag-available flex items-center justify-center max-w-[250px] mx-auto'>
            <Image
              src='/images/home-icons/available.png'
              alt='Available'
              width={30}
              height={30}
              className='mr-2'
            />
            Available for work
          </div>
        </div>
        <p className='text-5xl mt-20 text-main-gray fontTitles'>
          I'm Bryan — a{' '}
          <span className='text-main-white'>
            User Experience & User Interface Designer
          </span>{' '}
          from Spain, dedicated to making digital interactions{' '}
          <span className='text-main-white'>smoother, smarter</span>, and{' '}
          <span className='text-main-white'>unforgettable.</span>
        </p>
      </div>
      <div className='py-28 site-container'>
        <Clients />
      </div>
      <div className='site-container'>
        <Projects />
      </div>
      <div className='py-28 site-container'>
        <Efforts />
      </div>
      <div className='bg-[#2B3138] py-5'>
        <div className='site-container'>
          <Tools />
        </div>
      </div>
      <div className='py-28 site-container'>
        <Experience />
      </div>
    </main>
  );
}
