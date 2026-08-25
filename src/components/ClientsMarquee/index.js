'use client';

import MarqueeTrack from '@/components/MarqueeTrack';
import clients from '@/data/clients';

export default function ClientsMarquee() {
  return (
    <div className='clients-marquee w-full'>
      <MarqueeTrack speed={42}>
        {clients.map((client) => (
          <div key={client.title} className='clients-marquee__logo'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.image}
              alt={client.title}
              width={120}
              height={120}
              loading='lazy'
              decoding='async'
              draggable={false}
            />
          </div>
        ))}
      </MarqueeTrack>
    </div>
  );
}
