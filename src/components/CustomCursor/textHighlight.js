/** Clickable UI — no text-caret cursor or drag-to-highlight */
export const INTERACTIVE_SELECTOR = [
  'button',
  '.btn',
  '[role="button"]',
  'input',
  'textarea',
  'select',
  'label',
  '.home-hero__scroll',
  '.site-header__menu-btn',
  '.site-header__link',
  '.site-header__logo',
  '.face-reveal__trigger',
  '.work-card__award-badge',
  '.hero-badge',
  '.tools-row__item',
  '.award-celebration-modal',
].join(', ');

const SKIP_SELECTOR = `.custom-cursor-root, [data-no-cursor-text], ${INTERACTIVE_SELECTOR}, code, pre, svg, img`;

const TEXT_HOST_SELECTOR =
  'p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption, em, strong, small, dd, dt, .text-body, .home-hero__bio, .home-hero__role';

function caretRangeFromPoint(x, y) {
  if (document.caretRangeFromPoint) {
    return document.caretRangeFromPoint(x, y);
  }

  const position = document.caretPositionFromPoint?.(x, y);
  if (!position) return null;

  const range = document.createRange();
  range.setStart(position.offsetNode, position.offset);
  range.collapse(true);
  return range;
}

function pointInRect(x, y, rect, pad = 3) {
  if (!rect || rect.width < 0 || rect.height < 0) return false;
  return (
    x >= rect.left - pad &&
    x <= rect.right + pad &&
    y >= rect.top - pad &&
    y <= rect.bottom + pad
  );
}

function charIndexAtOffset(text, offset) {
  if (!text.length) return -1;

  const clamped = Math.min(Math.max(offset, 0), text.length - 1);
  if (!/\s/.test(text[clamped])) return clamped;

  for (let delta = 1; delta <= 4; delta += 1) {
    const left = clamped - delta;
    if (left >= 0 && !/\s/.test(text[left])) return left;

    const right = clamped + delta;
    if (right < text.length && !/\s/.test(text[right])) return right;
  }

  return -1;
}

function rectForTextOffset(textNode, offset) {
  const text = textNode.textContent ?? '';
  const index = charIndexAtOffset(text, offset);
  if (index < 0) return null;

  const range = document.createRange();
  range.setStart(textNode, index);
  range.setEnd(textNode, Math.min(index + 1, text.length));

  const rects = range.getClientRects();
  if (rects.length) return rects[0];

  const box = range.getBoundingClientRect();
  return box.width || box.height ? box : null;
}

function textNodeMatchesHitTarget(textNode, hitTarget) {
  const parent = textNode.parentElement;
  if (!parent) return false;
  return hitTarget === parent || parent.contains(hitTarget) || hitTarget.contains(parent);
}

export function isTextCursorPoint(x, y) {
  const hitTarget = document.elementFromPoint(x, y);
  if (!(hitTarget instanceof Element)) return false;
  if (hitTarget.closest(SKIP_SELECTOR)) return false;

  const textHost = hitTarget.closest(TEXT_HOST_SELECTOR);
  if (!textHost) return false;
  if (textHost.closest(INTERACTIVE_SELECTOR)) return false;

  const range = caretRangeFromPoint(x, y);
  if (!range || range.startContainer.nodeType !== Node.TEXT_NODE) return false;

  const textNode = range.startContainer;
  if (textNode.parentElement?.closest(INTERACTIVE_SELECTOR)) return false;

  if (!textHost.contains(textNode) && textNode.parentElement !== textHost) {
    return false;
  }

  if (!textNodeMatchesHitTarget(textNode, hitTarget)) return false;

  const charRect = rectForTextOffset(textNode, range.startOffset);
  if (!charRect) return false;

  return pointInRect(x, y, charRect, 4);
}
