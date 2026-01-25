'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TextGenerateEffect({
  words,
  className = '',
  duration = 0.5,
  filter = true,
  highlightWords = [],
}) {
  const [mounted, setMounted] = useState(false);
  const wordsArray = words.split(' ');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHighlighted = (word) => {
    // Remove punctuation for comparison
    const cleanWord = word.replace(/[.,!?;:]$/, '').toLowerCase();
    return highlightWords.some((hw) => hw.toLowerCase() === cleanWord);
  };

  const renderWords = () => {
    return (
      <motion.div className={className}>
        {wordsArray.map((word, idx) => {
          const highlighted = isHighlighted(word);
          return (
            <motion.span
              key={word + idx}
              initial={{ opacity: 0, filter: filter ? 'blur(10px)' : 'none' }}
              animate={
                mounted
                  ? { opacity: 1, filter: filter ? 'blur(0px)' : 'none' }
                  : {}
              }
              transition={{
                duration: duration,
                delay: idx * 0.08,
                ease: 'easeOut',
              }}
              className={`inline-block ${
                highlighted ? 'text-main-white' : ''
              }`}
            >
              {word}&nbsp;
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return <div>{renderWords()}</div>;
}
