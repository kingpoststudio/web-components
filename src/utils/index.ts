const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize || '16');

export function elIntersectsCenter(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const buffer = isMobile() ? fontSize * 3 : fontSize * 2;
  const centerTop = window.innerHeight / 2 - buffer;
  const centerBottom = window.innerHeight / 2 + buffer;

  return (
    (rect.top <= centerTop && rect.bottom >= centerTop)
    || (rect.top >= centerTop && rect.bottom <= centerBottom)
    || (rect.top <= centerBottom && rect.bottom >= centerBottom)
  );
}

export default {
  elIntersectsCenter,
};
