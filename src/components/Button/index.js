import clsx from 'clsx';
import Link from 'next/link';

export default function Button({
  as = 'button',
  variant = 'primary',
  size,
  className,
  href,
  children,
  ...props
}) {
  const classes = clsx(
    'btn',
    variant === 'secondary' && 'btn--secondary',
    variant === 'accent' && 'btn--accent',
    variant === 'primary' && 'btn--primary',
    size === 'sm' && 'btn--sm',
    className,
  );

  if (as === 'link' && href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type='button' className={classes} {...props}>
      {children}
    </button>
  );
}
