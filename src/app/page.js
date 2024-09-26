import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const clients = [
  {
    title: 'carbonbox',
    image: '/images/clients/carbonbox.png',
  },
  {
    title: 'esd',
    image: '/images/clients/esd.png',
  },
  {
    title: 'espaciocontinuo',
    image: '/images/clients/espaciocontinuo.png',
  },
  {
    title: 'fp',
    image: '/images/clients/fp.png',
  },
  {
    title: 'panasonic',
    image: '/images/clients/panasonic.png',
  },
  {
    title: 'reteki',
    image: '/images/clients/reteki.png',
  },
  {
    title: 'saudia',
    image: '/images/clients/saudia.png',
  },
];

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
      <p className='text-5xl my-20 text-main-gray fontTitles'>
        I'm Bryan — a{' '}
        <span className='text-main-white'>
          User Experience & User Interface Designer
        </span>{' '}
        from Spain, dedicated to making digital interactions{' '}
        <span className='text-main-white'>smoother, smarter</span>, and{' '}
        <span className='text-main-white'>unforgettable.</span>
      </p>
      <div id='clients' className='lg:flex lg:items-center'>
        <h2 className='lg:w-[20%]'>
          Worked <span className='text-main-gray'>with:</span>
        </h2>
        <div className='lg:w-[80%] mt-3 lg:mt-0'>
          <Marquee
            speed='20'
            autoFill
            direction='left'
            gradient
            gradientColor='#151B21'
          >
            {clients.map((client) => (
              <div key={client.title} className='client mx-10'>
                <Image
                  src={client.image}
                  alt={client.title}
                  width={150}
                  height={150}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <div id='projects' className=''>
        <h2>
          <span className='text-main-gray'>Latest</span> Projects
        </h2>
      </div>
      <div id='efforts' className='text-main-gray'>
        <h2>
          How can I align my efforts to{' '}
          <span className='text-main-white'>better meet</span> your{' '}
          <span className='text-main-white'>business needs?</span>
        </h2>
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
