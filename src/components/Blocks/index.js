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

export const Clients = () => {
  return (
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
  );
};
