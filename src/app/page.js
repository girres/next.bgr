import Image from 'next/image';

export default function Home() {
  return (
    <main className='min-h-screen container mx-auto'>
      <h1 className='hidden'>Home Page</h1>
      <div className='max-w-[300px] pt-20'>
        <Image src='/images/home/bgr.png' alt='BGR' width={500} height={500} />
        <div className='tag-available flex items-center justify-center max-w-[300px]'>
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
      <p className='text-5xl my-20'>
        I'm Bryan — a User Experience & User Interface Designer from Spain,
        dedicated to making digital interactions smoother, smarter, and
        unforgettable.
      </p>
    </main>
  );
}
