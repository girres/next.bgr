import Image from 'next/image';
import { clsx } from 'clsx';

function normalizeMedia(media) {
  if (!media) return [];
  return Array.isArray(media) ? media : [media];
}

export function MediaFrame({ block, alt, sizes, priority = false, ratio = 'wide' }) {
  const isGif = block.type === 'gif' || block.src?.endsWith('.gif');

  return (
    <figure className='case-study__figure'>
      <div className={clsx('case-study__frame', `case-study__frame--${ratio}`)}>
        {block.type === 'video' ? (
          <video
            className='case-study__frame-media'
            controls
            playsInline
            preload='metadata'
            aria-label={alt}
          >
            <source src={`${block.src}#t=0.1`} type='video/mp4' />
          </video>
        ) : isGif ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.src} alt={alt} className='case-study__frame-media' loading='lazy' decoding='async' />
        ) : (
          <Image
            src={block.src}
            alt={alt}
            fill
            className='case-study__frame-media'
            sizes={sizes}
            quality={85}
            priority={priority}
          />
        )}
      </div>
      {block.caption ? <figcaption className='case-study__caption'>{block.caption}</figcaption> : null}
    </figure>
  );
}

export default function CaseStudyMedia({ media, title = 'Project' }) {
  const blocks = normalizeMedia(media);
  if (!blocks.length) return null;

  const isGrid = blocks.length > 1;

  return (
    <div className={clsx('case-study__media', isGrid && 'case-study__media--grid')}>
      {blocks.map((block, index) => (
        <MediaFrame
          key={`${block.src}-${index}`}
          block={block}
          alt={block.alt || `${title} visual ${index + 1}`}
          ratio={isGrid ? 'standard' : 'wide'}
          sizes={isGrid ? '(min-width: 768px) 45vw, 100vw' : '(min-width: 1280px) 1200px, 100vw'}
        />
      ))}
    </div>
  );
}
