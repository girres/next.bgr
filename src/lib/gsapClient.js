'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

gsap.registerPlugin(useGSAP);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Physics2DPlugin);
}

gsap.defaults({ ease: 'power2.out' });

export { gsap, useGSAP, ScrollTrigger };
