'use client';

import Image from 'next/image';

export default function EffortCards({ items }) {
  return (
    <div className='content'>
      {items.map((effort, index) => (
        <div
          key={effort.title}
          className='effort glass-card'
          data-reveal
          data-reveal-lag={index * 28}
        >
          <div className='heading'>
            <Image
              src={effort.image}
              alt={effort.title}
              width={50}
              height={50}
              sizes='50px'
              quality={75}
              loading='eager'
            />
            <h3>{effort.title}</h3>
          </div>
          <p className='text-body'>{effort.text}</p>
        </div>
      ))}
    </div>
  );
}
