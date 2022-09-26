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

export function getTextColor(el: HTMLElement): string {
  const bgColor = window.getComputedStyle(el).backgroundColor;
  const color = bgColor === 'transparent' ? 'white' : bgColor;
  const rgb = color.replace(/[^\d,]/g, '').split(',');
  const brightness = Math.round(((parseInt(rgb[0], 10) * 299)
    + (parseInt(rgb[1], 10) * 587)
    + (parseInt(rgb[2], 10) * 114)) / 1000);

  return brightness > 125 ? 'black' : 'white';
}

const Utils = {
  elIntersectsCenter,
  getTextColor,
};

export default Utils;
