/**
 * Функция, которая ничего не делает
 */
export const noop = (): void => {
  // Совсем ничего не делает
};

/**
 * Создает функцию, которая вызовет `fn` только один раз. Последующие вызовы
 * будут проигнорированы.
 *
 * @example
 * ```ts
 * import {once} from '@vkontakte/vkjs';
 *
 * let counter = 0;
 * const onceFn = once(() => counter++);
 *
 * onceFn();
 * onceFn();
 * onceFn();
 *
 * console.log(counter); // 1
 * ```
 *
 * @param fn Функция, которую необходимо вызвать только один раз
 */
export function once<T extends (...args: any) => any>(fn: T) {
  // TODO: once должна кэшировать данные, но она это не делает
  let called = false;
  return function (...args) {
    if (called) {
      return;
    }

    called = true;
    return fn.apply(this, args);
  } as T;
}
