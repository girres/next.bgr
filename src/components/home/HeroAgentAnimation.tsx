'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  type HTMLMotionProps,
} from 'framer-motion';
import { clsx } from 'clsx';

type KeywordTransition =
  | 'maskSlideUp'
  | 'charStagger'
  | 'blurScale'
  | 'segmentPop'
  | 'meetCenter'
  | 'rotateIn'
  | 'wordCascade'
  | 'bounceIn'
  | 'typeRewrite'
  | 'makerRewrite';

type SceneBg = 'white' | 'ink';

interface Keyword {
  text: string;
  transition: KeywordTransition;
  bg: SceneBg;
  big?: boolean;
  rewriteTo?: string;
  slotMs?: number;
}

const TYPE_REWRITE_HOLD_MS = 720;
const TYPE_REWRITE_DELETE_CHAR_MS = 34;
const TYPE_REWRITE_EMPTY_MS = 160;
const TYPE_REWRITE_TYPE_CHAR_MS = 42;
const TYPE_REWRITE_END_HOLD_MS = 700;

const TYPE_REWRITE_PRIMARY = 'Design × Code';
const TYPE_REWRITE_SECONDARY = "Coding with AI's help";
const TYPE_REWRITE_SLOT_MS =
  TYPE_REWRITE_PRIMARY.length * TYPE_REWRITE_TYPE_CHAR_MS +
  TYPE_REWRITE_HOLD_MS +
  TYPE_REWRITE_PRIMARY.length * TYPE_REWRITE_DELETE_CHAR_MS +
  TYPE_REWRITE_EMPTY_MS +
  TYPE_REWRITE_SECONDARY.length * TYPE_REWRITE_TYPE_CHAR_MS +
  TYPE_REWRITE_END_HOLD_MS;

const PRODUCT_MAKER_PHRASE = 'Product Maker';
const PRODUCT_MAKER_SUFFIX = 'Maker';
const PRODUCT_BUILDER_WORD = 'Builder';
const PRODUCT_BUILDER_PHRASE = 'Product Builder';
const PRODUCT_WHATEVER = '...or whatever!';

const PRODUCT_MAKER_ENTRANCE_MS = 600;
const PRODUCT_MAKER_HOLD_MS = TYPE_REWRITE_HOLD_MS;
const PRODUCT_BUILDER_HOLD_MS = 900;
const PRODUCT_MAKER_DELETE_SUFFIX_MS =
  PRODUCT_MAKER_SUFFIX.length * TYPE_REWRITE_DELETE_CHAR_MS;
const PRODUCT_MAKER_TYPE_BUILDER_MS =
  PRODUCT_BUILDER_WORD.length * TYPE_REWRITE_TYPE_CHAR_MS;
const PRODUCT_MAKER_DELETE_ALL_MS =
  PRODUCT_BUILDER_PHRASE.length * TYPE_REWRITE_DELETE_CHAR_MS;
const PRODUCT_MAKER_TYPE_FINAL_MS =
  PRODUCT_WHATEVER.length * TYPE_REWRITE_TYPE_CHAR_MS;

const PRODUCT_MAKER_SLOT_MS =
  PRODUCT_MAKER_ENTRANCE_MS +
  PRODUCT_MAKER_HOLD_MS +
  PRODUCT_MAKER_DELETE_SUFFIX_MS +
  PRODUCT_MAKER_TYPE_BUILDER_MS +
  PRODUCT_BUILDER_HOLD_MS +
  PRODUCT_MAKER_DELETE_ALL_MS +
  TYPE_REWRITE_EMPTY_MS +
  PRODUCT_MAKER_TYPE_FINAL_MS +
  TYPE_REWRITE_END_HOLD_MS;

const KEYWORDS: readonly Keyword[] = [
  { text: 'UX & UI Designer', transition: 'maskSlideUp', bg: 'ink' },
  { text: 'AI Enthusiast', transition: 'charStagger', bg: 'ink' },
  {
    text: PRODUCT_MAKER_PHRASE,
    transition: 'makerRewrite',
    bg: 'ink',
    slotMs: PRODUCT_MAKER_SLOT_MS,
  },
  { text: 'B2B', transition: 'segmentPop', bg: 'ink', big: true },
  { text: 'B2C', transition: 'meetCenter', bg: 'ink', big: true },
  { text: '0 → 1', transition: 'rotateIn', bg: 'ink', big: true },
  {
    text: TYPE_REWRITE_PRIMARY,
    rewriteTo: TYPE_REWRITE_SECONDARY,
    transition: 'typeRewrite',
    bg: 'ink',
    slotMs: TYPE_REWRITE_SLOT_MS,
  },
];

const HERO_TOOL_ITEMS = [
  { title: 'Figma', image: '/images/tools/figma.svg' },
  { title: 'Claude Code', image: '/images/tools/claude.svg' },
  { title: 'Magnific', image: '/images/tools/magnific.svg' },
  { title: 'Cursor', image: '/images/tools/cursor.svg' },
  { title: 'GitHub', image: '/images/tools/github.svg' },
  { title: 'Tailwind CSS', image: '/images/tools/tailwindcss.svg' },
] as const;

const DOMAIN = 'bryangr.com';
const ROLE = 'Product designer';
const PERSONAL = 'And... dad of 2 cats! :)';
const SCREEN_READER_SUMMARY =
  'Bryan Girado, Product designer. And... dad of 2 cats!';

const EASE_MORPH = [0.22, 1, 0.36, 1] as const;
const EASE_FADE = [0.4, 0, 0.2, 1] as const;

/* Timeline (ms) */
const TYPE_START = 600;
const CHAR_DELAYS = [52, 44, 49, 55, 41, 47, 53, 43, 50, 46, 54];
const AIM_AT = 1700;
const PRESS_AT = 2200;
const MORPH_AT = 2500;
const KEYWORDS_AT = 2800;
const KEYWORD_SLOT_MS = 1000;
const CROSSFADE_MS = 300;

function keywordSlotMs(index: number): number {
  return KEYWORDS[index]?.slotMs ?? KEYWORD_SLOT_MS;
}

const KEYWORDS_SECTION_MS = KEYWORDS.reduce(
  (sum, kw, i) => sum + keywordSlotMs(i),
  0
);

const LOCKUP_DELETE_CHAR_MS = TYPE_REWRITE_DELETE_CHAR_MS;
const LOCKUP_EMPTY_MS = TYPE_REWRITE_EMPTY_MS;
const LOCKUP_TYPE_CHAR_MS = TYPE_REWRITE_TYPE_CHAR_MS;
const LOCKUP_ROLE_HOLD_MS = 1500;
const LOCKUP_PERSONAL_HOLD_MS = 2000;
const LOCKUP_DELETE_MS = ROLE.length * LOCKUP_DELETE_CHAR_MS;
const LOCKUP_TYPE_MS = PERSONAL.length * LOCKUP_TYPE_CHAR_MS;
const LOCKUP_DURATION_MS =
  LOCKUP_ROLE_HOLD_MS + LOCKUP_DELETE_MS + LOCKUP_EMPTY_MS + LOCKUP_TYPE_MS + LOCKUP_PERSONAL_HOLD_MS;

const TOOL_STAGGER_MS = 520;
const TOOL_LAST_ENTRANCE_MS = 450;
const TOOLS_LAST_APPEAR_MS = (HERO_TOOL_ITEMS.length - 1) * TOOL_STAGGER_MS;
const TOOLS_SCENE_MS = TOOLS_LAST_APPEAR_MS + TOOL_LAST_ENTRANCE_MS + CROSSFADE_MS;
const TOOLS_SCENE_AT = KEYWORDS_AT + KEYWORDS_SECTION_MS;
const LOCKUP_AT = TOOLS_SCENE_AT + TOOLS_SCENE_MS;
const OUTRO_AT = LOCKUP_AT + LOCKUP_DURATION_MS;
const RETURN_AT = OUTRO_AT + 500;
const LOOP_MS = RETURN_AT + 600;

const CHAR_TIMES = CHAR_DELAYS.reduce<number[]>((times, delay, i) => {
  times.push((i === 0 ? TYPE_START : times[i - 1]) + delay);
  return times;
}, []);

const STAGE_FONT_SIZE = 'clamp(9px, 4cqw, 16px)';
const KEYWORD_SIZE = 'clamp(1.25rem, 8.4cqw, 2.5rem)';
const KEYWORD_BIG_SIZE = 'clamp(3rem, 21cqw, 6.25rem)';
const FIELD_RADIUS = 16;
const STAGE_RADIUS = 18;

const SCENE_BG: Record<SceneBg, { bg: string; text: string; muted: string; wipe: string }> = {
  white: {
    bg: 'var(--hero-anim-scene-white)',
    text: 'var(--color-ink)',
    muted: 'var(--color-ink-muted)',
    wipe: 'var(--color-ink)',
  },
  ink: {
    bg: 'var(--hero-anim-scene-ink)',
    text: 'var(--color-on-primary)',
    muted: 'rgba(255, 255, 255, 0.65)',
    wipe: 'var(--color-on-primary)',
  },
};

const BG_MORPH_S = 0.58;

type Phase =
  | 'idle'
  | 'typing'
  | 'armed'
  | 'aim'
  | 'press'
  | 'morph'
  | 'keyword'
  | 'tools'
  | 'lockup'
  | 'outro'
  | 'return';

interface Frame {
  phase: Phase;
  typed: number;
  /** Index of the visible keyword, or -1 during the crossfade gap. */
  keyword: number;
  showTools: boolean;
  visibleToolCount: number;
  lockupDisplay: string;
  lockupCaret: boolean;
  lockupEntrance: boolean;
  tint: SceneBg | null;
  keywordWithinMs: number;
  key: string;
}

function keywordIndexAt(elapsed: number): { index: number; withinMs: number } {
  let remaining = elapsed;
  for (let i = 0; i < KEYWORDS.length; i++) {
    const dur = keywordSlotMs(i);
    if (remaining < dur) return { index: i, withinMs: remaining };
    remaining -= dur;
  }
  const last = KEYWORDS.length - 1;
  return { index: last, withinMs: keywordSlotMs(last) - 1 };
}

function typewriterSequenceAt(
  elapsed: number,
  cfg: {
    primary: string;
    secondary: string;
    primaryHoldMs: number;
    secondaryHoldMs: number;
    deleteCharMs: number;
    emptyMs: number;
    typeCharMs: number;
    typePrimaryMs?: number;
  }
): { display: string; caret: boolean } {
  const {
    primary,
    secondary,
    primaryHoldMs,
    secondaryHoldMs,
    deleteCharMs,
    emptyMs,
    typeCharMs,
    typePrimaryMs = 0,
  } = cfg;

  let t = elapsed;

  if (typePrimaryMs > 0) {
    if (t < typePrimaryMs) {
      const typed = Math.min(primary.length, Math.floor(t / typeCharMs) + 1);
      return { display: primary.slice(0, typed), caret: true };
    }
    t -= typePrimaryMs;
  }

  if (t < primaryHoldMs) {
    return { display: primary, caret: false };
  }
  t -= primaryHoldMs;

  const deleteMs = primary.length * deleteCharMs;
  if (t < deleteMs) {
    const removed = Math.min(primary.length, Math.floor(t / deleteCharMs));
    return {
      display: primary.slice(0, primary.length - removed),
      caret: true,
    };
  }
  t -= deleteMs;

  if (t < emptyMs) {
    return { display: '', caret: true };
  }
  t -= emptyMs;

  const typeSecondaryMs = secondary.length * typeCharMs;
  if (t < typeSecondaryMs) {
    const typed = Math.min(secondary.length, Math.floor(t / typeCharMs) + 1);
    return { display: secondary.slice(0, typed), caret: true };
  }
  t -= typeSecondaryMs;

  if (t < secondaryHoldMs) {
    return { display: secondary, caret: false };
  }

  return { display: secondary, caret: false };
}

function typeRewriteTextAt(
  withinSlot: number,
  initial: string,
  final: string
): { display: string; caret: boolean } {
  return typewriterSequenceAt(withinSlot, {
    primary: initial,
    secondary: final,
    typePrimaryMs: initial.length * TYPE_REWRITE_TYPE_CHAR_MS,
    primaryHoldMs: TYPE_REWRITE_HOLD_MS,
    secondaryHoldMs: TYPE_REWRITE_END_HOLD_MS,
    deleteCharMs: TYPE_REWRITE_DELETE_CHAR_MS,
    emptyMs: TYPE_REWRITE_EMPTY_MS,
    typeCharMs: TYPE_REWRITE_TYPE_CHAR_MS,
  });
}

function productMakerTextAt(withinSlot: number): { display: string; entrance: boolean } {
  const prefix = PRODUCT_MAKER_PHRASE.slice(
    0,
    PRODUCT_MAKER_PHRASE.length - PRODUCT_MAKER_SUFFIX.length
  );
  let t = withinSlot;

  if (t < PRODUCT_MAKER_ENTRANCE_MS) {
    return { display: PRODUCT_MAKER_PHRASE, entrance: true };
  }
  t -= PRODUCT_MAKER_ENTRANCE_MS;

  if (t < PRODUCT_MAKER_HOLD_MS) {
    return { display: PRODUCT_MAKER_PHRASE, entrance: false };
  }
  t -= PRODUCT_MAKER_HOLD_MS;

  if (t < PRODUCT_MAKER_DELETE_SUFFIX_MS) {
    const removed = Math.min(
      PRODUCT_MAKER_SUFFIX.length,
      Math.floor(t / TYPE_REWRITE_DELETE_CHAR_MS)
    );
    return {
      display: PRODUCT_MAKER_PHRASE.slice(0, PRODUCT_MAKER_PHRASE.length - removed),
      entrance: false,
    };
  }
  t -= PRODUCT_MAKER_DELETE_SUFFIX_MS;

  if (t < PRODUCT_MAKER_TYPE_BUILDER_MS) {
    const typed = Math.min(
      PRODUCT_BUILDER_WORD.length,
      Math.floor(t / TYPE_REWRITE_TYPE_CHAR_MS) + 1
    );
    return { display: prefix + PRODUCT_BUILDER_WORD.slice(0, typed), entrance: false };
  }
  t -= PRODUCT_MAKER_TYPE_BUILDER_MS;

  if (t < PRODUCT_BUILDER_HOLD_MS) {
    return { display: PRODUCT_BUILDER_PHRASE, entrance: false };
  }
  t -= PRODUCT_BUILDER_HOLD_MS;

  if (t < PRODUCT_MAKER_DELETE_ALL_MS) {
    const removed = Math.min(
      PRODUCT_BUILDER_PHRASE.length,
      Math.floor(t / TYPE_REWRITE_DELETE_CHAR_MS)
    );
    return {
      display: PRODUCT_BUILDER_PHRASE.slice(0, PRODUCT_BUILDER_PHRASE.length - removed),
      entrance: false,
    };
  }
  t -= PRODUCT_MAKER_DELETE_ALL_MS;

  if (t < TYPE_REWRITE_EMPTY_MS) {
    return { display: '', entrance: false };
  }
  t -= TYPE_REWRITE_EMPTY_MS;

  if (t < PRODUCT_MAKER_TYPE_FINAL_MS) {
    const typed = Math.min(
      PRODUCT_WHATEVER.length,
      Math.floor(t / TYPE_REWRITE_TYPE_CHAR_MS) + 1
    );
    return { display: PRODUCT_WHATEVER.slice(0, typed), entrance: false };
  }

  return { display: PRODUCT_WHATEVER, entrance: false };
}

function lockupTextAt(elapsed: number): {
  display: string;
  caret: boolean;
  entrance: boolean;
} {
  const seq = typewriterSequenceAt(elapsed, {
    primary: ROLE,
    secondary: PERSONAL,
    primaryHoldMs: LOCKUP_ROLE_HOLD_MS,
    secondaryHoldMs: LOCKUP_PERSONAL_HOLD_MS,
    deleteCharMs: LOCKUP_DELETE_CHAR_MS,
    emptyMs: LOCKUP_EMPTY_MS,
    typeCharMs: LOCKUP_TYPE_CHAR_MS,
  });

  return {
    ...seq,
    entrance: elapsed < 550 && seq.display === ROLE && !seq.caret,
  };
}

function frameAt(t: number): Frame {
  let phase: Phase;
  let typed = 0;
  let keyword = -1;
  let showTools = false;
  let visibleToolCount = 0;
  let lockupDisplay = '';
  let lockupCaret = false;
  let lockupEntrance = false;
  let tint: SceneBg | null = null;
  let keywordWithinMs = 0;

  if (t < TYPE_START) {
    phase = 'idle';
  } else if (t < AIM_AT) {
    typed = CHAR_TIMES.filter((at) => at <= t).length;
    phase = typed < DOMAIN.length ? 'typing' : 'armed';
  } else if (t < PRESS_AT) {
    phase = 'aim';
    typed = DOMAIN.length;
  } else if (t < MORPH_AT) {
    phase = 'press';
    typed = DOMAIN.length;
  } else if (t < KEYWORDS_AT) {
    phase = 'morph';
    typed = DOMAIN.length;
    tint = 'ink';
  } else if (t < TOOLS_SCENE_AT) {
    phase = 'keyword';
    typed = DOMAIN.length;
    const { index: slot, withinMs: withinSlot } = keywordIndexAt(t - KEYWORDS_AT);
    keywordWithinMs = withinSlot;
    const slotDur = keywordSlotMs(slot);
    keyword = withinSlot < slotDur - CROSSFADE_MS ? slot : -1;
    tint = KEYWORDS[slot].bg;
  } else if (t < LOCKUP_AT) {
    phase = 'tools';
    typed = DOMAIN.length;
    tint = 'ink';
    const elapsed = t - TOOLS_SCENE_AT;
    const toolsActiveEnd = TOOLS_LAST_APPEAR_MS + TOOL_LAST_ENTRANCE_MS;
    if (elapsed < toolsActiveEnd) {
      showTools = true;
      visibleToolCount = Math.min(
        HERO_TOOL_ITEMS.length,
        Math.floor(elapsed / TOOL_STAGGER_MS) + 1
      );
    }
  } else if (t < OUTRO_AT) {
    phase = 'lockup';
    typed = DOMAIN.length;
    tint = 'white';
    const lockup = lockupTextAt(t - LOCKUP_AT);
    lockupDisplay = lockup.display;
    lockupCaret = lockup.caret;
    lockupEntrance = lockup.entrance;
  } else if (t < RETURN_AT) {
    phase = 'outro';
    tint = 'white';
  } else {
    phase = 'return';
  }

  return {
    phase,
    typed,
    keyword,
    showTools,
    visibleToolCount,
    lockupDisplay,
    lockupCaret,
    lockupEntrance,
    tint,
    keywordWithinMs,
    key: `${phase}:${typed}:${keyword}:${keywordWithinMs}:${showTools}:${visibleToolCount}:${lockupDisplay}:${lockupCaret}:${tint}`,
  };
}

const INITIAL_FRAME = frameAt(0);

function useLoopTimeline(running: boolean): Frame {
  const [frame, setFrame] = useState<Frame>(INITIAL_FRAME);
  const elapsed = useRef(0);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    let currentKey = '';

    const tick = (now: number) => {
      // Clamp the step so a long frame (tab switch, jank) never skips scenes.
      elapsed.current = (elapsed.current + Math.min(now - last, 100)) % LOOP_MS;
      last = now;
      const next = frameAt(elapsed.current);
      if (next.key !== currentKey) {
        currentKey = next.key;
        setFrame(next);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return frame;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, inView] as const;
}

/**
 * Passing our own willChange MotionValue opts out of framer's automatic
 * will-change (which is never cleared), so the hint only lives while animating.
 */
function useTransientWillChange(hint = 'transform, opacity, filter') {
  const willChange = useMotionValue('auto');
  return {
    willChange,
    start: () => willChange.set(hint),
    end: () => willChange.set('auto'),
  };
}

function LiveSpan({ style, onAnimationStart, onAnimationComplete, ...props }: HTMLMotionProps<'span'>) {
  const wc = useTransientWillChange();
  return (
    <motion.span
      {...props}
      style={{ ...style, willChange: wc.willChange }}
      onAnimationStart={(def) => {
        wc.start();
        onAnimationStart?.(def);
      }}
      onAnimationComplete={(def) => {
        wc.end();
        onAnimationComplete?.(def);
      }}
    />
  );
}

function LiveDiv({
  style,
  onAnimationStart,
  onAnimationComplete,
  onLayoutAnimationStart,
  onLayoutAnimationComplete,
  ...props
}: HTMLMotionProps<'div'>) {
  const wc = useTransientWillChange();
  return (
    <motion.div
      {...props}
      style={{ ...style, willChange: wc.willChange }}
      onAnimationStart={(def) => {
        wc.start();
        onAnimationStart?.(def);
      }}
      onAnimationComplete={(def) => {
        wc.end();
        onAnimationComplete?.(def);
      }}
      onLayoutAnimationStart={() => {
        wc.start();
        onLayoutAnimationStart?.();
      }}
      onLayoutAnimationComplete={() => {
        wc.end();
        onLayoutAnimationComplete?.();
      }}
    />
  );
}

function splitTrailingEmoji(text: string): [string, string | null] {
  const match = text.match(/^(.*?)\s*(\p{Extended_Pictographic}\uFE0F?)$/u);
  return match ? [match[1], match[2]] : [text, null];
}

function WordCascadeEnter({
  text,
  align = 'center',
}: {
  text: string;
  align?: 'center' | 'start';
}) {
  const words = text.split(' ');
  return (
    <span
      className={clsx(
        'flex flex-wrap gap-x-[0.26em]',
        align === 'start' ? 'justify-start' : 'justify-center'
      )}
    >
      {words.map((word, i) => (
        <LiveSpan
          key={i}
          className='inline-block'
          initial={{ opacity: 0, x: i % 2 === 0 ? '-0.6em' : '0.6em' }}
          animate={{ opacity: 1, x: '0em' }}
          transition={{ duration: 0.5, ease: EASE_MORPH, delay: i * 0.12 }}
        >
          {word}
        </LiveSpan>
      ))}
    </span>
  );
}

function StableTypewriterShell({
  anchorText,
  children,
  anchorContent,
  leadingClass = 'leading-[1.1]',
}: {
  anchorText: string;
  children: ReactNode;
  anchorContent?: ReactNode;
  leadingClass?: string;
}) {
  return (
    <span className={clsx('inline-grid max-w-full justify-items-center', leadingClass)}>
      <span
        className='invisible col-start-1 row-start-1 whitespace-pre [grid-area:1/1]'
        aria-hidden='true'
      >
        {anchorContent ?? anchorText}
      </span>
      <span className='col-start-1 row-start-1 flex justify-center [grid-area:1/1]'>
        {children}
      </span>
    </span>
  );
}

function TypewriterRow({
  display,
  renderText,
}: {
  display: string;
  // eslint-disable-next-line no-unused-vars -- documents the callback argument
  renderText?: (text: string) => ReactNode;
}) {
  return (
    <span className='inline-flex items-baseline whitespace-pre'>
      {renderText ? renderText(display) : <span>{display}</span>}
    </span>
  );
}

function KeywordTypeRewrite({
  keyword,
  withinSlotMs,
}: {
  keyword: Keyword;
  withinSlotMs: number;
}) {
  const finalText = keyword.rewriteTo ?? '';
  const state = typeRewriteTextAt(withinSlotMs, keyword.text, finalText);
  const anchor =
    finalText.length >= keyword.text.length ? finalText : keyword.text;

  return (
    <StableTypewriterShell anchorText={anchor}>
      <TypewriterRow display={state.display} />
    </StableTypewriterShell>
  );
}

function ProductMakerVisual({ withinSlotMs }: { withinSlotMs: number }) {
  const state = productMakerTextAt(withinSlotMs);
  const anchor =
    PRODUCT_BUILDER_PHRASE.length >= PRODUCT_WHATEVER.length
      ? PRODUCT_BUILDER_PHRASE
      : PRODUCT_WHATEVER;
  const enter = { duration: 0.6, ease: EASE_MORPH };

  return (
    <StableTypewriterShell anchorText={anchor}>
      {state.entrance ? (
        <LiveSpan
          className='inline-block'
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transitionEnd: { filter: 'none' },
          }}
          transition={enter}
        >
          {state.display}
        </LiveSpan>
      ) : (
        <TypewriterRow display={state.display} />
      )}
    </StableTypewriterShell>
  );
}

function KeywordVisual({
  keyword,
  withinSlotMs = 0,
}: {
  keyword: Keyword;
  withinSlotMs?: number;
}) {
  const words = keyword.text.split(' ');
  const enter = { duration: 0.6, ease: EASE_MORPH };

  switch (keyword.transition) {
    case 'maskSlideUp':
      return (
        <span className='flex flex-wrap justify-center gap-x-[0.26em]'>
          {words.map((word, i) => (
            <span key={i} className='-mb-[0.1em] inline-block overflow-hidden pb-[0.1em]'>
              <LiveSpan
                className='inline-block'
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ ...enter, delay: i * 0.04 }}
              >
                {word}
              </LiveSpan>
            </span>
          ))}
        </span>
      );

    case 'charStagger': {
      let charIndex = 0;
      return (
        <span className='flex flex-wrap justify-center gap-x-[0.26em]'>
          {words.map((word, w) => (
            <span key={w} className='inline-block whitespace-nowrap'>
              {Array.from(word).map((char, c) => {
                const delay = charIndex++ * 0.025;
                return (
                  <LiveSpan
                    key={c}
                    className='inline-block'
                    initial={{ opacity: 0, y: '0.4em' }}
                    animate={{ opacity: 1, y: '0em' }}
                    transition={{ duration: 0.45, ease: EASE_MORPH, delay }}
                  >
                    {char}
                  </LiveSpan>
                );
              })}
            </span>
          ))}
        </span>
      );
    }

    case 'blurScale':
      return (
        <LiveSpan
          className='inline-block'
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transitionEnd: { filter: 'none' },
          }}
          transition={enter}
        >
          {keyword.text}
        </LiveSpan>
      );

    case 'segmentPop': {
      const head = keyword.text.slice(0, 2);
      const tail = keyword.text.slice(2);
      return (
        <span className='inline-flex items-baseline justify-center gap-[0.06em]'>
          <LiveSpan
            className='inline-block'
            initial={{ opacity: 0, scale: 0.72, y: '0.2em' }}
            animate={{ opacity: 1, scale: 1, y: '0em' }}
            transition={{ duration: 0.52, ease: EASE_MORPH }}
          >
            {head}
          </LiveSpan>
          <LiveSpan
            className='inline-block'
            initial={{ opacity: 0, scale: 1.28, filter: 'blur(10px)' }}
            animate={{
              opacity: 1,
              scale: [1.28, 0.94, 1],
              filter: 'blur(0px)',
              transitionEnd: { filter: 'none' },
            }}
            transition={{
              opacity: { duration: 0.35, delay: 0.1, ease: EASE_FADE },
              scale: { duration: 0.55, delay: 0.1, times: [0, 0.65, 1], ease: [EASE_MORPH, EASE_FADE] },
              filter: { duration: 0.45, delay: 0.1, ease: EASE_MORPH },
            }}
          >
            {tail}
          </LiveSpan>
        </span>
      );
    }

    case 'meetCenter': {
      const lead = keyword.text.slice(0, 1);
      const rest = keyword.text.slice(1);
      return (
        <span className='inline-flex items-baseline justify-center'>
          <LiveSpan
            className='inline-block'
            initial={{ opacity: 0, x: '-0.65em', filter: 'blur(6px)' }}
            animate={{
              opacity: 1,
              x: '0em',
              filter: 'blur(0px)',
              transitionEnd: { filter: 'none' },
            }}
            transition={{ duration: 0.55, ease: EASE_MORPH }}
          >
            {lead}
          </LiveSpan>
          <LiveSpan
            className='inline-block'
            initial={{ opacity: 0, x: '0.65em', filter: 'blur(6px)' }}
            animate={{
              opacity: 1,
              x: '0em',
              filter: 'blur(0px)',
              transitionEnd: { filter: 'none' },
            }}
            transition={{ duration: 0.55, delay: 0.07, ease: EASE_MORPH }}
          >
            {rest}
          </LiveSpan>
        </span>
      );
    }

    case 'rotateIn':
      return (
        <LiveSpan
          className='inline-block'
          style={{ transformPerspective: 600, transformOrigin: '50% 100%' }}
          initial={{ opacity: 0, rotateX: -12, y: '0.12em' }}
          animate={{ opacity: 1, rotateX: 0, y: '0em' }}
          transition={enter}
        >
          {keyword.text}
        </LiveSpan>
      );

    case 'wordCascade':
      return <WordCascadeEnter text={keyword.text} />;

    case 'typeRewrite':
      return <KeywordTypeRewrite keyword={keyword} withinSlotMs={withinSlotMs} />;

    case 'makerRewrite':
      return <ProductMakerVisual withinSlotMs={withinSlotMs} />;

    case 'bounceIn': {
      const [label, emoji] = splitTrailingEmoji(keyword.text);
      return (
        <span className='flex flex-wrap items-baseline justify-center gap-x-[0.26em]'>
          <LiveSpan
            className='inline-block'
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.6, 1.08, 1] }}
            transition={{
              opacity: { duration: 0.2, ease: EASE_FADE },
              scale: { duration: 0.6, times: [0, 0.55, 1], ease: [EASE_MORPH, EASE_FADE] },
            }}
          >
            {label}
          </LiveSpan>
          {emoji ? (
            <LiveSpan
              className='inline-block'
              initial={{ opacity: 0, y: '0.2em' }}
              animate={{ opacity: 1, y: ['0.2em', '-0.25em', '0em'] }}
              transition={{
                opacity: { duration: 0.2, delay: 0.3, ease: EASE_FADE },
                y: { duration: 0.5, delay: 0.3, times: [0, 0.45, 1], ease: [EASE_MORPH, EASE_FADE] },
              }}
            >
              {emoji}
            </LiveSpan>
          ) : null}
        </span>
      );
    }
  }
}

function LockupDisplayText({ text, baseColor }: { text: string; baseColor: string }) {
  const smileAt = text.indexOf(':');
  if (smileAt === -1) {
    return <span className='whitespace-pre' style={{ color: baseColor }}>{text}</span>;
  }
  return (
    <span className='whitespace-pre'>
      <span style={{ color: baseColor }}>{text.slice(0, smileAt)}</span>
      <span style={{ color: 'var(--color-accent)' }}>{text.slice(smileAt)}</span>
    </span>
  );
}

function Lockup({
  displayText,
  entrance,
  animated,
  scene = 'white',
}: {
  displayText: string;
  showCaret?: boolean;
  entrance: boolean;
  animated: boolean;
  scene?: SceneBg;
}) {
  const palette = SCENE_BG[scene];
  const initial = (from: Record<string, string | number>) => (animated ? from : false);
  const anchor = PERSONAL.length >= ROLE.length ? PERSONAL : ROLE;

  return (
    <div className='flex w-full flex-col items-center' aria-hidden='true'>
      <LiveSpan
        className='block font-medium tracking-[-0.04em]'
        style={{ fontSize: KEYWORD_SIZE, color: palette.text }}
        initial={
          entrance ? initial({ opacity: 0, y: '0.25em', filter: 'blur(6px)' }) : false
        }
        animate={{ opacity: 1, y: '0em', filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
        transition={{ duration: 0.5, ease: EASE_MORPH }}
      >
        <StableTypewriterShell
          anchorText={anchor}
          leadingClass='leading-[1.08]'
          anchorContent={<LockupDisplayText text={anchor} baseColor={palette.text} />}
        >
          <TypewriterRow
            display={displayText}
            renderText={(text) => (
              <LockupDisplayText text={text} baseColor={palette.text} />
            )}
          />
        </StableTypewriterShell>
      </LiveSpan>
    </div>
  );
}

function ToolsScene({
  visibleCount,
  animated,
  onDark = false,
}: {
  visibleCount: number;
  animated: boolean;
  onDark?: boolean;
}) {
  const initial = (from: Record<string, string | number>) => (animated ? from : false);
  const compact = visibleCount > 1;
  const cell = clsx(
    'flex shrink-0 items-center justify-center rounded-2xl border bg-transparent',
    compact
      ? 'h-[clamp(3rem,19cqw,4.75rem)] w-[clamp(3rem,19cqw,4.75rem)]'
      : 'h-[clamp(4.75rem,34cqw,7.25rem)] w-[clamp(4.75rem,34cqw,7.25rem)]',
    onDark ? 'border-white/15' : 'border-black/10'
  );
  const iconMax = compact
    ? 'max-h-[clamp(1.65rem,11cqw,2.75rem)]'
    : 'max-h-[clamp(2.75rem,18cqw,4.25rem)]';
  const iconClass = clsx(
    'mx-auto h-auto w-auto object-contain opacity-90',
    onDark ? 'brightness-0 invert' : 'brightness-0'
  );

  return (
    <div
      className='flex w-full max-w-full flex-wrap items-center justify-center gap-[clamp(0.35rem,2.4cqw,0.7rem)] px-[5%]'
      aria-hidden='true'
    >
      <span className='sr-only'>
        {HERO_TOOL_ITEMS.slice(0, visibleCount)
          .map((t) => t.title)
          .join(', ')}
      </span>
      <AnimatePresence initial={false}>
        {HERO_TOOL_ITEMS.slice(0, visibleCount).map((tool) => (
          <LiveSpan
            key={tool.title}
            className={cell}
            layout
            initial={initial({ opacity: 0, scale: 0.78, filter: 'blur(8px)' })}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              transitionEnd: { filter: 'none' },
            }}
            transition={{ duration: 0.42, ease: EASE_MORPH, layout: { duration: 0.45, ease: EASE_MORPH } }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.image}
              alt=''
              width={80}
              height={80}
              draggable={false}
              className={clsx(iconClass, iconMax)}
            />
          </LiveSpan>
        ))}
      </AnimatePresence>
    </div>
  );
}

const sceneExit = {
  opacity: 0,
  filter: 'blur(4px)',
  transition: { duration: CROSSFADE_MS / 1000, ease: EASE_FADE },
};

function CursorIcon() {
  return (
    <svg
      viewBox='0 0 20 24'
      className='block h-[1.75em] w-auto'
      style={{ transform: 'translate(-2px, -2px)' }}
    >
      <path
        d='M2 1.5v18.2l4.8-4.5 3.1 6.9 3-1.3-3-6.8h6.6L2 1.5Z'
        fill='var(--color-ink)'
        stroke='var(--color-on-primary)'
        strokeWidth='1.4'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox='0 0 16 16' className='block size-[45%]' fill='none'>
      <path
        d='M8 13V3M3.5 7.5 8 3l4.5 4.5'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

const FIELD_COLLAPSED = 'left-[7%] right-[7%] top-1/2 -mt-[1.8em] h-[3.6em]';

interface HeroAgentAnimationProps {
  /** True while another hero overlay (face / email) covers the card. */
  obscured?: boolean;
  className?: string;
}

export default function HeroAgentAnimation({ obscured = false, className }: HeroAgentAnimationProps) {
  const reduced = usePrefersReducedMotion();
  const [rootRef, inView] = useInView<HTMLDivElement>();
  const frame = useLoopTimeline(inView && !obscured && !reduced);
  const { phase } = frame;

  const expanded =
    phase === 'morph' || phase === 'keyword' || phase === 'tools' || phase === 'lockup' || phase === 'outro';
  const inputVisible = !expanded;
  const caretSolid = phase === 'typing';
  const cursorActive = phase === 'aim' || phase === 'press';
  const keyword = phase === 'keyword' && frame.keyword >= 0 ? KEYWORDS[frame.keyword] : null;
  const keywordPalette = keyword ? SCENE_BG[keyword.bg] : null;
  const stagePalette = frame.tint ? SCENE_BG[frame.tint] : SCENE_BG.white;

  const cardClass = clsx(
    'home-hero__prompt-media relative w-full min-h-[12rem] overflow-hidden font-sans shadow-none',
    obscured && 'home-hero__prompt-media--under-face'
  );
  const cardStyle: CSSProperties = { fontSize: STAGE_FONT_SIZE, boxShadow: 'none' };

  return (
    <div
      ref={rootRef}
      className={clsx('relative w-full', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden={obscured || undefined}
    >
      <p className='sr-only'>{SCREEN_READER_SUMMARY}</p>

      {reduced ? (
        <div className={cardClass} style={cardStyle}>
          <div className='absolute inset-0 bg-[var(--hero-anim-scene-white)]' aria-hidden='true' />
          <div className='absolute inset-0 flex items-center justify-center px-[8%]'>
            <Lockup animated={false} displayText={PERSONAL} showCaret={false} entrance={false} />
          </div>
        </div>
      ) : (
        <div className={cardClass} style={cardStyle}>
          <div className='absolute inset-0 bg-white' aria-hidden='true' />

          <LiveDiv
            layout
            layoutId='hero-agent-field'
            aria-hidden='true'
            className={clsx('absolute', expanded ? 'inset-0' : FIELD_COLLAPSED)}
            style={{ borderRadius: expanded ? STAGE_RADIUS : FIELD_RADIUS }}
            initial={false}
            animate={{
              backgroundColor: expanded ? stagePalette.bg : 'var(--hero-anim-scene-white)',
            }}
            transition={{
              layout: { duration: 0.45, ease: EASE_MORPH },
              backgroundColor: { duration: BG_MORPH_S, ease: EASE_MORPH },
            }}
          >
            <motion.div
              className='absolute inset-0 border border-[var(--color-ink-border)]'
              style={{ borderRadius: 'inherit' }}
              initial={false}
              animate={{ opacity: expanded ? 0 : 1 }}
              transition={
                expanded
                  ? { duration: 0.2, ease: EASE_FADE }
                  : { duration: 0.25, delay: 0.2, ease: EASE_FADE }
              }
            />

            <LiveDiv
              className='absolute inset-0 z-[1] flex items-center overflow-visible pl-[1.1em] pr-[0.5em]'
              initial={false}
              animate={
                inputVisible
                  ? { opacity: 1, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }
                  : { opacity: 0, scale: 0.9, filter: 'blur(6px)' }
              }
              transition={
                inputVisible
                  ? { duration: 0.25, delay: 0.15, ease: EASE_FADE }
                  : { duration: 0.3, ease: EASE_FADE }
              }
            >
              <span className='flex min-w-0 flex-1 items-center text-[1.3em] font-medium leading-none tracking-[-0.02em] text-ink'>
                <span className='whitespace-pre'>{DOMAIN.slice(0, frame.typed)}</span>
                <span
                  className={clsx(
                    'ml-[0.06em] inline-block h-[1.15em] w-[0.09em] min-w-[1.5px] rounded-full bg-ink',
                    !caretSolid && 'animate-caret-blink'
                  )}
                />
              </span>
              <span className='relative isolate block size-[2.6em] shrink-0 overflow-visible'>
                {phase === 'press' ? (
                  <LiveSpan
                    className='absolute inset-0 z-[1] rounded-full bg-accent'
                    initial={{ opacity: 0.35, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.9 }}
                    transition={{ duration: 0.55, ease: EASE_MORPH }}
                  />
                ) : null}
                <LiveSpan
                  className='relative z-[2] flex size-full items-center justify-center rounded-full bg-accent text-ink'
                  initial={false}
                  animate={{ scale: phase === 'press' ? [1, 0.96, 1] : 1 }}
                  transition={{ duration: 0.24, ease: EASE_FADE }}
                >
                  <SendIcon />
                </LiveSpan>
                {cursorActive && inputVisible ? (
                  <LiveSpan
                    className='pointer-events-none absolute z-[4]'
                    style={{ left: '1.05em', top: '0.92em' }}
                    aria-hidden='true'
                    initial={{ opacity: 0, x: '2.4em', y: '2.6em' }}
                    animate={
                      phase === 'press'
                        ? { opacity: 1, x: '0em', y: '0em', scale: [1, 0.88, 1] }
                        : { opacity: 1, x: '0em', y: '0em', scale: 1 }
                    }
                    transition={{
                      x: { duration: 0.5, ease: EASE_MORPH },
                      y: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                      opacity: { duration: 0.2, ease: EASE_FADE },
                      scale: { duration: 0.2, ease: EASE_FADE },
                    }}
                  >
                    <CursorIcon />
                  </LiveSpan>
                ) : null}
              </span>
            </LiveDiv>
          </LiveDiv>

          <div
            className='pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-[8%] text-center'
            aria-live='polite'
            aria-atomic='true'
          >
            <AnimatePresence>
              {keyword ? (
                <LiveDiv
                  key={`keyword-${frame.keyword}`}
                  className={clsx(
                    'absolute inset-x-[8%] flex items-center justify-center font-medium',
                    keyword.big ? 'leading-none tracking-[-0.07em]' : 'leading-[1.1] tracking-[-0.04em]'
                  )}
                  style={{
                    fontSize: keyword.big ? KEYWORD_BIG_SIZE : KEYWORD_SIZE,
                    color: keywordPalette?.text,
                  }}
                  exit={sceneExit}
                >
                  <span className='sr-only'>
                    {keyword.transition === 'makerRewrite'
                      ? `${PRODUCT_MAKER_PHRASE}. ${PRODUCT_BUILDER_PHRASE}. ${PRODUCT_WHATEVER}`
                      : keyword.rewriteTo
                        ? `${keyword.text}. ${keyword.rewriteTo}`
                        : keyword.text}
                  </span>
                  <span aria-hidden='true'>
                    <KeywordVisual keyword={keyword} withinSlotMs={frame.keywordWithinMs} />
                  </span>
                </LiveDiv>
              ) : null}
              {frame.showTools && frame.visibleToolCount > 0 ? (
                <LiveDiv
                  key='tools-scene'
                  className='absolute inset-0 flex items-center justify-center px-[4%]'
                  exit={sceneExit}
                >
                  <ToolsScene visibleCount={frame.visibleToolCount} animated onDark />
                </LiveDiv>
              ) : null}
              {phase === 'lockup' ? (
                <LiveDiv
                  key='lockup'
                  className='absolute inset-x-[8%] flex items-center justify-center'
                  exit={sceneExit}
                >
                  <Lockup
                    animated
                    displayText={frame.lockupDisplay}
                    showCaret={frame.lockupCaret}
                    entrance={frame.lockupEntrance}
                  />
                </LiveDiv>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
