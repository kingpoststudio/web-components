export function isElAtCenterOfScreen(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

export default {
  isElAtCenterOfScreen,
};
