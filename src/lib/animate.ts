export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export const animate = (
  duration: number,
  callback: (t: number) => void,
  options: {
    easing?: (t: number) => number;
    range?: [number, number];
  } = {},
) => {
  const { easing = easeOutCubic, range = [0, 1] } = options;
  const [from, to] = range;

  const start = performance.now();
  requestAnimationFrame((time: number) => {
    const timeFraction = (time - start) / duration;
    const progress = easing(timeFraction);
    // eslint-disable-next-line no-nested-ternary
    const clean = progress < 0 ? 0 : progress > 1 ? 1 : progress;
    const stepValue = from + (to - from) * clean;
    callback(stepValue);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};
