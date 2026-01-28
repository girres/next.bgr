'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ImageReveal() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move image to follow cursor
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative max-w-[320px] mx-auto lg:mx-0 lg:max-w-none'
      style={{ height: '35vh', minHeight: '250px', cursor: 'default' }}
      onMouseMove={handleMouseMove}
    >
      {/* Main visible text */}
      <div className='relative z-10 flex items-center justify-start h-full'>
        <span
          className={`text-xl lg:text-2xl font-bold fontTitles tracking-wide uppercase transition-colors duration-300 ${isHovering ? 'text-gray-600' : 'text-gray-400 animate-pulse'}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Look closer
        </span>
      </div>

      {/* Hover container */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Image container that follows cursor */}
        <div
          ref={imageContainerRef}
          className='absolute z-30 transition-opacity duration-250'
          style={{
            width: '300px',
            height: '300px',
            top: 0,
            left: 0,
            opacity: isHovering ? 1 : 0,
          }}
        >
          <div
            className='absolute'
            style={{
              top: '-150px',
              left: '-150px',
              width: '300px',
              height: '300px',
            }}
          >
            <Image
              src='/images/home/profile-hero.jpg'
              alt='BGR'
              width={300}
              height={300}
              quality={90}
              className='w-full h-full object-cover rounded-full'
              style={{ filter: 'brightness(0.9)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
