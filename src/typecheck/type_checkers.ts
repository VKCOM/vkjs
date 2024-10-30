export function isObjectLike(object: any): boolean {
  return typeof object === 'object' && object !== null;
}

export function isArray(object: any): object is any[] {
  return Array.isArray(object);
}

export function isObject(object: any): boolean {
  return Object.prototype.toString.call(object) === '[object Object]';
}

export function isUndefined(object: any): object is undefined {
  return typeof object === 'undefined';
}

export function isFunction(object: any): object is (...args: any[]) => any {
  return typeof object === 'function';
}

export function isFormData(object: any): object is FormData {
  return object && Object.prototype.toString.call(object) === '[object FormData]';
}

export function isString(object: any): object is string {
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
export function isNumber(object: any): object is number {
  return typeof object === 'number';
}

export function isPromiseLike<T = any>(object: any): object is PromiseLike<T> {
  return (isObject(object) || isFunction(object)) && isFunction(object.then);
}
