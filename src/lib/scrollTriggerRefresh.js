import { ScrollTrigger } from '@/lib/gsapClient';

let refreshTimer = 0;

/** Debounced refresh — avoids replaying / invalidating in-view reveals when images load. */
export function refreshScrollTriggers() {
  if (refreshTimer) window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    refreshTimer = 0;
    ScrollTrigger.refresh(true);
  }, 80);
}
