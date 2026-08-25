'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx } from 'clsx';
import { TbSnowflake } from 'react-icons/tb';
import { useSnow } from '@/components/SnowEffect';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsapClient';

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

export default function Header() {
  const headerRef = useRef(null);
  const pathname = usePathname();
  const { isActive: isSnowActive, toggle: toggleSnow } = useSnow();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

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

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(header, {
          y: -28,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(header, { clearProps: 'transform' });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: headerRef }
  );

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return undefined;

      ScrollTrigger.create({
        start: 72,
        onToggle: (self) => {
          header.classList.toggle('site-header--scrolled', self.isActive);
        },
      });

      const workLink = header.querySelector('[data-nav="projects"]');
      const aboutLink = header.querySelector('[data-nav="experience"]');
      const projects = document.getElementById('projects');
      const experience = document.getElementById('experience');

      if (projects && workLink) {
        ScrollTrigger.create({
          trigger: projects,
          start: 'top 42%',
          endTrigger: experience || projects,
          end: experience ? 'top 42%' : 'bottom bottom',
          onToggle: (self) => workLink.classList.toggle('is-active', self.isActive),
        });
      }

      if (experience && aboutLink) {
        ScrollTrigger.create({
          trigger: experience,
          start: 'top 42%',
          end: 'bottom bottom',
          onToggle: (self) => aboutLink.classList.toggle('is-active', self.isActive),
        });
      }
    },
    { scope: headerRef, dependencies: [pathname] }
  );

  return (
    <header
      ref={headerRef}
      className={clsx('site-header', isMenuOpen && 'site-header--menu-open')}
    >
      <div className='site-header__inner'>
        <Link href='/' className='site-header__logo' aria-label='Bryan Girado - Home' onClick={closeMenu}>
          <span className='site-header__logo-text fontTitles'>Bryan Girado</span>
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

            <button
              type='button'
              className={clsx('site-header__pill', isSnowActive && 'site-header__pill--active')}
              onClick={toggleSnow}
              aria-pressed={isSnowActive}
              aria-label='Toggle snow effect'
            >
              <TbSnowflake className={clsx('site-header__pill-icon', isSnowActive && 'is-spinning')} />
              <span className='site-header__pill-label'>Let it snow</span>
            </button>
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
