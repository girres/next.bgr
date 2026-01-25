'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { HiHome } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

export default function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const mouseX = useMotionValue(Infinity);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@bryangr.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const items = [
    {
      title: 'Home',
      icon: <HiHome className='w-5 h-5' />,
      href: '/',
      type: 'link',
    },
    {
      title: 'Projects',
      icon: <Image src='/logo.svg' alt='Bryan G' width={20} height={20} className='w-5 h-5' />,
      href: '/#projects',
      type: 'link',
    },
    {
      title: copiedEmail ? 'Copied!' : 'Email',
      icon: copiedEmail ? <FiCheck className='w-5 h-5' /> : <MdEmail className='w-5 h-5' />,
      onClick: handleCopyEmail,
      type: 'button',
    },
    {
      title: 'LinkedIn',
      icon: <FaLinkedin className='w-5 h-5' />,
      href: 'https://www.linkedin.com/in/bryan-giraldo-restrepo-9522521a4/',
      external: true,
      type: 'link',
    },
  ];

  return (
    <div className='fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none'>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg pointer-events-auto'
      >
        {items.map((item, idx) => (
          <DockItem
            key={item.title}
            item={item}
            mouseX={mouseX}
            setHoveredIndex={setHoveredIndex}
            hoveredIndex={hoveredIndex}
            index={idx}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({ item }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useMotionValue(0);
  const widthSync = useTransform(distance, [-100, 0, 100], [48, 64, 48]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const distanceFromCenter = e.clientX - centerX;
    distance.set(distanceFromCenter);
  };

  const handleMouseLeave = () => {
    distance.set(0);
    setIsHovered(false);
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ width }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className='relative flex items-center justify-center h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer'
    >
      <div className='flex items-center justify-center text-white'>
        {item.icon}
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className='absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-md text-xs text-white whitespace-nowrap'
        >
          {item.title}
        </motion.div>
      )}
    </motion.div>
  );

  if (item.type === 'button') {
    return (
      <div onClick={item.onClick}>
        {content}
      </div>
    );
  }

  if (item.external) {
    return (
      <a
        href={item.href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {content}
      </a>
    );
  }

  return <Link href={item.href}>{content}</Link>;
}
