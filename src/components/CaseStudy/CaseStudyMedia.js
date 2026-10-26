import Image from 'next/image';
import { clsx } from 'clsx';
import CaseStudyPairRotator from './CaseStudyPairRotator';
import CaseStudyVideo from './CaseStudyVideo';

function normalizeMedia(media) {
  if (!media) return [];
  return Array.isArray(media) ? media : [media];
}

function videoMimeType(src = '') {
  const path = src.split('?')[0].toLowerCase();
  if (path.endsWith('.mov')) return 'video/quicktime';
  if (path.endsWith('.webm')) return 'video/webm';
  return 'video/mp4';
}

export function MediaFrame({ block, alt, sizes, priority = false, ratio = 'wide' }) {
  const isGif = block.type === 'gif' || block.src?.endsWith('.gif');

  return (
    <figure className='case-study__figure'>
      <div
        className={clsx('case-study__frame', `case-study__frame--${ratio}`)}
        style={block.aspect ? { aspectRatio: block.aspect } : undefined}
      >
        {block.type === 'video' ? (
          <CaseStudyVideo
            className={clsx('case-study__frame-media', block.aspect && 'case-study__frame-media--contain')}
            src={block.src}
            type={videoMimeType(block.src)}
            alt={alt}
          />
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

export default function CaseStudyMedia({ media, title = 'Project', rotateMs = 0, frame = 'auto' }) {
  const blocks = normalizeMedia(media);
  if (!blocks.length) return null;

  if (rotateMs > 0 && blocks.length > 2) {
    return <CaseStudyPairRotator blocks={blocks} title={title} interval={rotateMs} />;
  }

  const isGrid = frame === 'auto' && blocks.length > 1;
  const isHalf = frame === 'half';

  return (
    <div className={clsx('case-study__media', isGrid && 'case-study__media--grid', isHalf && 'case-study__media--half')}>
      {blocks.map((block, index) => (
        <MediaFrame
          key={`${block.src}-${index}`}
          block={block}
          alt={block.alt || `${title} visual ${index + 1}`}
          ratio={isGrid || isHalf ? 'standard' : 'wide'}
          sizes={isGrid || isHalf ? '(min-width: 768px) 45vw, 100vw' : '(min-width: 1280px) 1200px, 100vw'}
        />
      ))}
    </div>
  );
}
