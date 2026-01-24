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
    <main className='min-h-screen pt-[20%] lg:pt-[10%] pb-20'>
      <h1 className='hidden'>Bryan Girado / UX & UI Designer</h1>
      <div className='site-container'>
        <div className='max-w-[300px] mx-auto lg:mx-0'>
          <Image
            src='/images/home/profile-hero.jpg'
            alt='BGR'
            width={500}
            height={500}
            quality={100}
            priority
            className='max-w-[250px] lg:max-w-full mx-auto rounded-full object-cover aspect-square border-4 border-main-gray/30 neon-border'
          />
          <div className='tag-available flex items-center justify-center max-w-[250px] mx-auto mt-8'>
            <Image
              src='/images/home-icons/available.png'
              alt='Available'
              width={30}
              height={30}
              className='mr-2 blink'
            />
            Available for work
          </div>
        </div>
        <p className='text-5xl lg:text-7xl mt-20 text-main-gray fontTitles leading-tight'>
          I’m Bryan — a{' '}
          <span className='text-main-white'>Product Designer & AI Builder.</span>{' '}
          I specialize in end-to-end product construction, using AI to transform
          deep customer insights into{' '}
          <span className='text-main-white'>production-ready software.</span>
        </p>
      </div>
      {/* Clients Section */}
      <div className='pt-4 lg:pt-6 pb-40 lg:pb-64 site-container'>
        <Clients />
      </div>

      {/* Section Divider */}
      <div className='site-container my-16 lg:my-24'>
        <div className='h-[2px] bg-gradient-to-r from-transparent via-main-gray/30 to-transparent'></div>
      </div>

      {/* Projects Section */}
      <div className='py-40 lg:py-64 site-container'>
        <Projects />
      </div>

      {/* Section Divider */}
      <div className='site-container my-16 lg:my-24'>
        <div className='h-[2px] bg-gradient-to-r from-transparent via-main-gray/30 to-transparent'></div>
      </div>

      {/* Efforts Section with subtle background */}
      <div className='py-40 lg:py-64 bg-[#1A1F25]'>
        <div className='site-container'>
          <Efforts />
        </div>
      </div>

      {/* Tools Section with contrasting background */}
      <div className='bg-[#2B3138] py-40 lg:py-64'>
        <div className='site-container'>
          <Tools />
        </div>
      </div>

      {/* Section Divider */}
      <div className='site-container my-16 lg:my-24'>
        <div className='h-[2px] bg-gradient-to-r from-transparent via-main-gray/30 to-transparent'></div>
      </div>

      {/* Experience Section */}
      <div className='py-40 lg:py-64 site-container'>
        <Experience />
      </div>
    </main>
  );
}
