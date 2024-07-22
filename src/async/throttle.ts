/**
 * Возвращает throttled функцию, которая задерживает вызов `fn` на
 * `threshold` миллисекунд от последнего вызова. Если метод вызывается снова до
 * выполнения предыдущего, предыдущий вызов будет прерван.
 *
 * @param fn функция, которую надо вызывать
 * @param threshold длительность в миллисекундах
 * @param scope контекст, с которым будет совершен вызов функции
 */
export function throttle<T extends any[]>(
  fn: (...args: T) => unknown,
  threshold = 50,
  scope = typeof window !== 'undefined' ? window : undefined,
) {
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
