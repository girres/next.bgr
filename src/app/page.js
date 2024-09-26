import Image from 'next/image';

import { Clients, Projects, Efforts } from '@/components/Blocks';

export default function Home() {
  return (
    <main className='min-h-screen container mx-auto'>
      <h1 className='hidden'>Home Page</h1>
      <div className='max-w-[300px] pt-20'>
        <Image src='/images/home/bgr.png' alt='BGR' width={500} height={500} />
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
      <div className='py-28'>
        <Clients />
      </div>
      <Projects />
      <div className='py-28'>
        <Efforts />
      </div>
      <div id='tools' className='text-main-gray'>
        <h2>
          I use <span className='text-main-white'>advanced design tools</span>{' '}
          to develop <span className='text-main-white'>seamless</span> and{' '}
          <span className='text-main-white'>engaging visual experiences</span>
        </h2>
      </div>
      <div id='experience' className=''>
        <h2>
          <span className='text-main-gray'>My</span> Experience
        </h2>
      </div>
    </main>
  );
}
