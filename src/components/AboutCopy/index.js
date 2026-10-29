'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTextGenerateReveal } from '@/lib/textGenerateAnimation';
import WordHoverPreview from '@/components/TextGenerateEffect/WordHoverPreview';

const PARAGRAPHS = [
  "Since 2019 I've designed products where a bad interface has real consequences: in-flight entertainment at 35,000 feet, a school platform that runs daily operations. Also, creating solutions across SaaS/B2B platforms, B2C products, e-commerce, and complex environments.",
  "What I learned there is that most product problems aren't visual problems. They come from unclear priorities, flows nobody tested with real users, and systems that grew without a plan.",
];

const HIGHLIGHT_WORDS = new Set([
  'since',
  '2019',
  'designed',
  'products',
  'in-flight',
  'entertainment',
  'school',
  'platform',
  'saas/b2b',
  'b2c',
  'e-commerce',
  'problems',
  "aren't",
  'visual',
]);

const HOVER_PREVIEWS = [
  {
    match: 'in-flight',
    src: '/images/projects/saudiaAirlines/3.jpg',
    alt: 'Saudia Airlines in-flight entertainment',
    width: 300,
    height: 169,
  },
  {
    match: 'entertainment',
    src: '/images/projects/saudiaAirlines/3.jpg',
    alt: 'Saudia Airlines in-flight entertainment',
    width: 300,
    height: 169,
  },
  {
    match: 'school',
    src: '/images/home/peeks/school-platform.jpg',
    alt: 'School operations platform',
    width: 300,
    height: 188,
  },
  {
    match: 'platform',
    src: '/images/home/peeks/school-platform.jpg',
    alt: 'School operations platform',
    width: 300,
    height: 188,
  },
];

function normalizeToken(word) {
  return word
    .replace(/^["'“”]+|["'“”]+$/g, '')
    .replace(/[.,!?;:…]+$/g, '')
    .toLowerCase();
}

function isHighlighted(word) {
  return HIGHLIGHT_WORDS.has(normalizeToken(word));
}

function findPreview(word) {
  const token = normalizeToken(word);
  return HOVER_PREVIEWS.find(({ match }) => normalizeToken(match) === token);
}

function CopyParagraph({ text, onOpenPreview, onClosePreview }) {
  return (
    <p>
      {text.split(' ').map((word, wordIndex) => {
        const previewConfig = findPreview(word);
        const highlighted = isHighlighted(word);

        return (
          <span
            key={`${wordIndex}-${word}`}
            className={[
              'text-generate__word inline-block',
              highlighted ? 'about-highlight font-medium' : '',
              previewConfig ? 'text-generate__word--peekable' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onMouseEnter={(event) => {
              if (!previewConfig) return;
              onOpenPreview(previewConfig, event);
            }}
            onMouseLeave={() => {
              if (!previewConfig) return;
              onClosePreview();
            }}
            onFocus={(event) => {
              if (!previewConfig) return;
              const rect = event.currentTarget.getBoundingClientRect();
              onOpenPreview(previewConfig, {
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2,
              });
            }}
            onBlur={() => {
              if (!previewConfig) return;
              onClosePreview();
            }}
            tabIndex={previewConfig ? 0 : undefined}
          >
            {word}&nbsp;
          </span>
        );
      })}
    </p>
  );
}

export default function AboutCopy() {
  const rootRef = useRef(null);
  const [peekConfig, setPeekConfig] = useState(null);

  const openPreview = useCallback((config, event) => {
    setPeekConfig({
      ...config,
      initialX: event.clientX,
      initialY: event.clientY,
    });
  }, []);

  const closePreview = useCallback(() => setPeekConfig(null), []);

  useTextGenerateReveal(rootRef, {
    scrollTrigger: true,
    duration: 0.5,
    filter: true,
  });

  useEffect(() => {
    if (!peekConfig) return undefined;

    const onScroll = () => closePreview();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [peekConfig, closePreview]);

  return (
    <>
      <div className='about-copy' ref={rootRef}>
        {PARAGRAPHS.map((text, index) => (
          <CopyParagraph
            key={index}
            text={text}
            onOpenPreview={openPreview}
            onClosePreview={closePreview}
          />
        ))}
      </div>

      <WordHoverPreview config={peekConfig} />
    </>
  );
}
