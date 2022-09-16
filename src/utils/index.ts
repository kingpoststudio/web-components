export function elIntersectsCenter(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const centerTop = window.innerHeight / 2 - 64;
  const centerBottom = window.innerHeight / 2 + 64;

  return (
    (rect.top <= centerTop && rect.bottom >= centerTop)
    || (rect.top >= centerTop && rect.bottom <= centerBottom)
    || (rect.top <= centerBottom && rect.bottom >= centerBottom)
  );
}

export default {
  elIntersectsCenter,
};
