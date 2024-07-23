/**
 * Проверяет, что переданные даты относятся к одному и тому же дню
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { isSameDate } from '@vkontakte/vkjs';
 *
 * const d1 = new Date();
 * const d2 = new Date();
 * assert.ok(isSameDate(d1, d2));
 * ```
 */
export function isSameDate(d1: Date, d2: Date): boolean {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}
