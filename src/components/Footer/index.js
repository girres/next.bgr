import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const socialLinks = [
  {
    label: 'Email',
    href: 'mailto:hello@bryangr.com',
    icon: MdEmail,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bryan-giraldo-restrepo-9522521a4/',
    icon: FaLinkedin,
  },
];

export default function Footer() {
  return (
    <footer className='site-footer'>
      <section className='site-footer__cta site-container'>
        <p className='site-footer__cta-label'>Let&apos;s work together</p>
        <a href='mailto:hello@bryangr.com' className='site-footer__cta-email group'>
          <span className='site-footer__cta-email-text'>
            hello@
            <br className='lg:hidden' />
            bryangr.com
          </span>
          <span className='site-footer__cta-email-line' aria-hidden='true' />
        </a>
      </section>

      <div className='site-footer__bar site-container'>
        <div className='site-footer__meta'>
          <span>Designed and built by Bryan Giraldo</span>
          <span>Madrid, Spain</span>
        </div>

        <div className='site-footer__social'>
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='site-footer__pill'
            >
              <span className='site-footer__pill-icon' aria-hidden='true'>
                <Icon />
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
