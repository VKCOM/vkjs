/**
 * Функция throttled, которая будет задержана на заданное
 * `threshold` миллисекунд от последнего вызова. Если метод будет вызван снова
 * до истечения тайм-аута, предыдущий вызов будет прерван.
 */
export interface ThrottledFunction<T extends unknown[]> {
  (...a: T): void;

  /**
   * Отменяет вызов функции
   */
  cancel(): void;
}

/**
 * Возвращает throttled функцию, которая задерживает вызов `fn` на
 * `threshold` миллисекунд от последнего вызова. Если метод вызывается снова до
 * выполнения предыдущего, предыдущий вызов будет прерван.
 *
 * @param fn Функция, которую надо вызывать
 * @param threshold Длительность в миллисекундах
 * @param scope Контекст, с которым будет совершен вызов функции
 */
export function throttle<T extends any[]>(
  fn: (...args: T) => unknown,
  threshold = 50,
  scope: (Window & typeof globalThis) | undefined = typeof window !== 'undefined'
    ? window
    : undefined,
): ThrottledFunction<T> {
  let prevDate: number = Date.now() - threshold;
  let timeoutId: ReturnType<typeof setTimeout>;

  const throttledFn = (...args: T) => {
    const timeLeft = prevDate + threshold - Date.now();

    clearTimeout(timeoutId);
    if (timeLeft > 0) {
      timeoutId = setTimeout(() => {
        prevDate = Date.now();
        fn.apply(scope, args);
      }, timeLeft);
      return;
    }

    prevDate = Date.now();
    fn.apply(scope, args);
  };

  throttledFn.cancel = () => {
    clearTimeout(timeoutId);
  };

  return throttledFn;
}
