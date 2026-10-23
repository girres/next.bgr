const VIEW_PROJECT_SELECTOR = '.work-card__media';

export function isViewProjectPoint(x, y) {
  const target = document.elementFromPoint(x, y);
  if (!(target instanceof Element)) return false;
  if (target.closest('.work-card__award-badge')) return false;
  return Boolean(target.closest(VIEW_PROJECT_SELECTOR));
}
