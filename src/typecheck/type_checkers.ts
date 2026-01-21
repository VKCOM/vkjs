export function isObjectLike(object: unknown): boolean {
  return typeof object === 'object' && object !== null;
}

export function isArray(object: unknown): object is unknown[] {
  return Array.isArray(object);
}

export function isObject(object: unknown): boolean {
  return Object.prototype.toString.call(object) === '[object Object]';
}

export function isUndefined(object: unknown): object is undefined {
  return typeof object === 'undefined';
}

export function isFunction(object: unknown): object is (...args: unknown[]) => unknown {
  return typeof object === 'function';
}

export function isFormData(object: unknown): object is FormData {
  return isObjectLike(object) && Object.prototype.toString.call(object) === '[object FormData]';
}

export function isString(object: unknown): object is string {
  return typeof object === 'string';
}

/**
 * Проверяет что переданное значение является `Number`
 *
 * ## Пример
 *
 * ```ts
 * import assert from 'node:assert';
 * import { isNumber } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(isNumber(3), true);
 * assert.strictEqual(isNumber(Infinity), true);
 * assert.strictEqual(isNumber('3'), false);
 * ```
 *
 * Для исключения `Infinity` `-Infinity` и `NaN` используйте `Number.isFinite`
 *
 * ```ts
 * import assert from 'node:assert';
 *
 * assert.strictEqual(Number.isFinite(3), true);
 * assert.strictEqual(Number.isFinite(Infinity), false);
 * assert.strictEqual(Number.isFinite('3'), false);
 * ```
 */
export function isNumber(object: unknown): object is number {
  return typeof object === 'number';
}

export function isPromiseLike<T = unknown>(object: unknown): object is PromiseLike<T> {
  return (
    (isObject(object) || isFunction(object)) && isFunction((object as Record<string, unknown>).then)
  );
}
