export const noop = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

export function once<T extends (...args: any) => any>(fn: T) {
  let called = false;
  return function (...args) {
    if (called) {
      return;
    }

    called = true;
    return fn.apply(this, args);
  } as T;
}
