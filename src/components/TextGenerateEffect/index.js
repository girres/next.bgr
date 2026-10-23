'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTextGenerateReveal } from '@/lib/textGenerateAnimation';
import WordHoverPreview from './WordHoverPreview';

function normalizeToken(word) {
  return word
    .replace(/^["'“”]+|["'“”]+$/g, '')
    .replace(/[.,!?;:…]+$/g, '')
    .toLowerCase();
}

export default function TextGenerateEffect({
  words,
  className = '',
  duration = 0.5,
  filter = true,
  highlightWords = [],
  hoverPreviews = [],
}) {
  const rootRef = useRef(null);
  const wordsArray = words.split(' ');
  const [peekConfig, setPeekConfig] = useState(null);

  const isHighlighted = (word) => {
    if (/^["'“”]/.test(word)) return false;

    const cleanWord = normalizeToken(word);
    return highlightWords.some((item) => normalizeToken(item) === cleanWord);
  };

  const findPreview = useCallback(
    (word) => {
      if (!hoverPreviews.length) return null;
      const token = normalizeToken(word);
      return hoverPreviews.find(({ match }) => {
        const needle = normalizeToken(match);
        return token === needle || token.startsWith(needle);
      });
    },
    [hoverPreviews]
  );

  const openPreview = useCallback((config, event) => {
    setPeekConfig({
      ...config,
      initialX: event.clientX,
      initialY: event.clientY,
    });
  }, []);

  const closePreview = useCallback(() => setPeekConfig(null), []);

  useEffect(() => {
    if (!peekConfig) return undefined;

    const onScroll = () => closePreview();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [peekConfig, closePreview]);

  useTextGenerateReveal(rootRef, { duration, filter, scrollTrigger: false });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const fallback = window.setTimeout(() => {
      root.querySelectorAll('.text-generate__word').forEach((node) => {
        node.style.opacity = '1';
        node.style.visibility = 'visible';
        node.style.filter = 'none';
        node.style.transform = 'none';
      });
    }, 2000);

    return () => window.clearTimeout(fallback);
  }, [words]);

  return (
    <>
      <div ref={rootRef} className={className}>
        {wordsArray.map((word, index) => {
          const previewConfig = findPreview(word);
          const highlighted = isHighlighted(word);

          return (
            <span
              key={`${word}-${index}`}
              className={[
                'text-generate__word inline-block',
                highlighted ? 'font-medium text-ink' : '',
                previewConfig ? 'text-generate__word--peekable' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={(event) => {
                if (!previewConfig) return;
                openPreview(previewConfig, event);
              }}
              onMouseLeave={() => {
                if (!previewConfig) return;
                closePreview();
              }}
              onFocus={(event) => {
                if (!previewConfig) return;
                const rect = event.currentTarget.getBoundingClientRect();
                openPreview(previewConfig, {
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2,
                });
              }}
              onBlur={() => {
                if (!previewConfig) return;
                closePreview();
              }}
              tabIndex={previewConfig ? 0 : undefined}
            >
              {word}&nbsp;
            </span>
          );
        })}
      </div>

      <WordHoverPreview config={peekConfig} />
    </>
  );
}
