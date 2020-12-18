export const noop = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

export function throttle<T extends any[]>(fn: (...args: T) => unknown, threshold = 50, scope = window) {
  let last: number;
  let deferTimer: ReturnType<typeof setTimeout>;

  return function(...args: T) {
    const context = scope;
    const now = Date.now();

    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export function debounce<T extends any[]>(fn: (...args: T) => unknown, delay: number, context = window) {
  let timeout: ReturnType<typeof setTimeout>;
  let args: T;

  const later = () => fn.apply(context, args);

  return (...a: T) => {
    args = a;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
