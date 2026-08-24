'use client';

import { usePathname } from 'next/navigation';
import { gsap, useGSAP } from '@/lib/gsapClient';
import { scrollToTarget } from '@/lib/smoothScroll';

function getAnchor(event) {
  const target = event.target;
  if (!(target instanceof Element)) return null;
  return target.closest('a[href]');
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useGSAP(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = getAnchor(event);
      if (!anchor || anchor.target === '_blank') return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const isSamePath = url.pathname === window.location.pathname;
      if (!isSamePath) return;

      if (url.hash) {
        const id = url.hash.slice(1);
        if (!document.getElementById(id)) return;

        event.preventDefault();
        window.history.pushState(null, '', `${url.pathname}${url.hash}`);
        scrollToTarget(id);
        return;
      }

      if (url.pathname === '/' && !url.search) {
        event.preventDefault();
        window.history.pushState(null, '', '/');
        scrollToTarget('top', { duration: 1 });
      }
    };

    document.addEventListener('click', onClick, true);

    const hash = window.location.hash;
    if (hash && document.getElementById(hash.slice(1))) {
      gsap.set(window, { scrollTo: 0 });
      requestAnimationFrame(() => {
        scrollToTarget(hash.slice(1), { duration: 1.05 });
      });
    }

    return () => {
      document.removeEventListener('click', onClick, true);
    };
  }, { dependencies: [pathname] });

  return null;
}
