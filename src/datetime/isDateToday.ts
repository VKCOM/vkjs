import { isSameDate } from './isSameDate';

/**
 * Проверяет, что переданная дата является сегодняшним днём
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { isDateToday } from '@vkontakte/vkjs';
 *
 * assert.ok(isDateToday(new Date());
 * ```
 */
export function isDateToday(date: Date): boolean {
  return isSameDate(date, new Date());
}
