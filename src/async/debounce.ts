/**
 * Функция debounced, которая будет задержана на заданное `delay` время
 * в миллисекундах. Если метод будет вызван снова до истечения тайм-аута,
 * предыдущий вызов будет прерван.
 */
export interface DebouncedFunction<T extends unknown[]> {
  (...a: T): void;

  /**
   * Отменяет вызов функции
   */
  cancel(): void;
}

/**
 * Возвращает debounced функцию, которая задерживает вызов `fn` на заданное
 * `delay` время в миллисекундах. Если метод вызывается снова до истечения
 * тайм-аута, предыдущий вызов будет прерван.
 *
 * @param fn Функция которую надо "отложить"
 * @param delay Время задержки вызова в миллисекундах
 * @param context Контекст с которым будет совершен вызов функции
 */
export function debounce<T extends any[]>(
  fn: (...args: T) => unknown,
  delay: number,
  context: (Window & typeof globalThis) | undefined = typeof window !== 'undefined'
    ? window
    : undefined,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  let args: T;

  const later = () => fn.apply(context, args);
  const debouncedFn = (...a: T) => {
    args = a;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);
  };

  debouncedFn.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFn;
}
