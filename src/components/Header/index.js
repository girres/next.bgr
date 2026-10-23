'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useGSAP, ScrollTrigger } from '@/lib/gsapClient';

const navLinks = [
  { label: 'Work', href: '/#projects', section: 'projects' },
  { label: 'About', href: '/#experience', section: 'experience' },
  { label: 'Email', href: 'mailto:hello@bryangr.com', external: true },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bryan-giraldo-restrepo-9522521a4/',
    external: true,
  },
];

const MOBILE_NAV_QUERY = '(max-width: 1023px)';
const SCROLL_COMPACT_ON = 96;
const SCROLL_COMPACT_OFF = 40;

export default function Header() {
  const headerRef = useRef(null);
  const compactRef = useRef(false);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    let raf = 0;

    const syncCompact = () => {
      const y = window.scrollY;
      let next = compactRef.current;
      if (!next && y > SCROLL_COMPACT_ON) next = true;
      else if (next && y < SCROLL_COMPACT_OFF) next = false;
      if (next === compactRef.current) return;
      compactRef.current = next;
      setIsCompact(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        syncCompact();
      });
    };

    syncCompact();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    const onResize = () => {
      if (!window.matchMedia(MOBILE_NAV_QUERY).matches) closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen, closeMenu]);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return undefined;

      const workLink = header.querySelector('[data-nav="projects"]');
      const aboutLink = header.querySelector('[data-nav="experience"]');
      const projects = document.getElementById('projects');
      const experience = document.getElementById('experience');

      const triggers = [];

      if (projects && workLink) {
        triggers.push(
          ScrollTrigger.create({
            trigger: projects,
            start: 'top 42%',
            endTrigger: experience || projects,
            end: experience ? 'top 42%' : 'bottom bottom',
            onToggle: (self) => workLink.classList.toggle('is-active', self.isActive),
          })
        );
      }

      if (experience && aboutLink) {
        triggers.push(
          ScrollTrigger.create({
            trigger: experience,
            start: 'top 42%',
            end: 'bottom bottom',
            onToggle: (self) => aboutLink.classList.toggle('is-active', self.isActive),
          })
        );
      }

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: headerRef, dependencies: [pathname] }
  );

  return (
    <header
      ref={headerRef}
      className={clsx(
        'site-header',
        isMenuOpen && 'site-header--menu-open',
        isCompact && 'site-header--solid'
      )}
    >
      <div className='site-header__inner'>
        <Link href='/' className='site-header__logo' aria-label='Bryan Girado - Home' onClick={closeMenu}>
          <span className='site-header__logo-text'>Bryan Girado</span>
        </Link>

        {isMenuOpen ? (
          <button
            type='button'
            className='site-header__nav-backdrop'
            aria-label='Close menu'
            onClick={closeMenu}
            tabIndex={-1}
          />
        ) : null}

        <nav
          id='site-header-nav'
          className={clsx('site-header__nav', isMenuOpen && 'is-open')}
          aria-label='Main navigation'
          aria-hidden={!isMenuOpen}
        >
          <div className='site-header__nav-panel'>
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className='site-header__link'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  data-nav={link.section}
                  className='site-header__link'
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>

        <button
          type='button'
          className={clsx('site-header__menu-btn', isMenuOpen && 'is-open')}
          aria-expanded={isMenuOpen}
          aria-controls='site-header-nav'
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span className='sr-only'>{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>
    </header>
  );
}
