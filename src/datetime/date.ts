import { leadingZero } from '../other/numbers';
import { isDateToday } from './isDateToday';

export const SECONDS_IN_THE_DAY = 86400;
const MILLISECONDS_IN_THE_DAY = SECONDS_IN_THE_DAY * 1000;

/**
 * Проверяет, что переданная дата - вчерашний день
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { isDateYesterday } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(isDateYesterday(new Date(), false);
 * ```
 */
export function isDateYesterday(date: Date): boolean {
  const yesterdayDate = new Date(date.getTime() + MILLISECONDS_IN_THE_DAY);
  return isDateToday(yesterdayDate);
}

/**
 * Проверяет, что переданная дата - завтрашний день
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { isDateTomorrow } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(isDateTomorrow(new Date(), false);
 * ```
 */
export function isDateTomorrow(date: Date): boolean {
  const tomorrowDate = new Date(date.getTime() - MILLISECONDS_IN_THE_DAY);
  return isDateToday(tomorrowDate);
}

/**
 * Возвращает новую дату — начало переданного дня
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { getBeginningOfDay } from '@vkontakte/vkjs';
 *
 * assert.deepStrictEqual(
 *   getBeginningOfDay(new Date(2024, 0, 1, 12, 34, 56, 789)),
 *   new Date(2024, 0, 1),
 * );
 * ```
 *
 * @param date Дата
 */
export function getBeginningOfDay(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(year, month, day, 0, 0, 0, 0);
}

/**
 * Возвращает true, если год високосный
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { isLeapYear } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(isLeapYear(2024), true);
 * assert.strictEqual(isLeapYear(2025), false);
 * ```
 *
 * @param year Год
 */
export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Возвращает кол-во дней в месяце (последнее число месяца)
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { getLastDayOfMonth } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(getLastDayOfMonth(2024, 2), 29);
 * assert.strictEqual(getLastDayOfMonth(2025, 2), 28);
 * ```
 *
 * @param year Год
 * @param month Месяц
 */
export function getLastDayOfMonth(year: number, month: number): number {
  if (+month === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else if (month > 0 && ((month < 8 && month % 2 === 0) || (month > 7 && month % 2 === 1))) {
    return 30;
  }
  return 31;
}

/**
 * Ближайший понедельник в прошлом относительно date
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { getStartOfWeek } from '@vkontakte/vkjs';
 *
 * assert.deepStrictEqual(
 *   getStartOfWeek(new Date(2024, 0, 1), 10),
 *   new Date(2024, 11, 31),
 * );
 * ```
 *
 * @param date Дата
 */
export function getStartOfWeek(date: Date): Date {
  const weekDay = date.getDay();
  if (weekDay === 0) {
    return addDays(date, -6);
  }
  return addDays(date, -weekDay + 1);
}

/**
 * Добавляет дни к дате и возвращает новый объект
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { addDays } from '@vkontakte/vkjs';
 *
 * assert.deepStrictEqual(
 *   addDays(new Date(2024, 0, 1), 10),
 *   new Date(2024, 0, 11),
 * );
 * ```
 *
 * @param date Дата
 * @param dayCount Количество дней, которые требуется добавить
 */
export function addDays(date: Date, dayCount: number): Date {
  const modified = new Date(date.getTime());
  modified.setDate(modified.getDate() + dayCount);
  return modified;
}

/**
 * Создаёт дату из Unix Timestamp
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { createDateFromUnixTimestamp } from '@vkontakte/vkjs';
 *
 * assert.deepStrictEqual(
 *   createDateFromUnixTimestamp(1704056400),
 *   new Date(2024, 0, 1),
 * );
 * ```
 *
 * @param timestamp Дата в формате unix timestamp (секунды)
 */
export function createDateFromUnixTimestamp(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

/**
 * Возвращает Unix Timestamp из даты
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { getUnixTimestampFromDate } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(
 *   getUnixTimestampFromDate(new Date(2024, 0, 1)),
 *   1704056400,
 * );
 * ```
 *
 * @param date Дата, которую требуется перевести в Unix Timestamp
 */
export function getUnixTimestampFromDate(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

/**
 * Возвращает дату в формате YYYY-MM-DD
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { convertDateToInputFormat } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(
 *   convertDateToInputFormat(new Date(2024, 0, 1)),
 *   "2024-01-01",
 * );
 * ```
 *
 * @param date Дата, которую требуется отформатировать
 */
export function convertDateToInputFormat(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return [year, leadingZero(month), leadingZero(day)].join('-');
}
