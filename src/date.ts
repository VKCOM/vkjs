export const SECONDS_IN_THE_DAY = 86400;
const MILLISECONDS_IN_THE_DAY = SECONDS_IN_THE_DAY * 1000;

/**
 * Проверяет, что переданная дата является сегодняшним днём
 */
export function isDateToday(date: Date): boolean {
  const now = new Date();
  const d = now.getDate();
  const m = now.getMonth();
  const y = now.getFullYear();

  return date.getFullYear() === y && date.getMonth() === m && date.getDate() === d;
}

/**
 * Проверяет, что переданная дата - вчерашний день
 */
export function isDateYesterday(date: Date): boolean {
  const yesterdayDate = new Date(date.getTime() + MILLISECONDS_IN_THE_DAY);
  return isDateToday(yesterdayDate);
}

/**
 * Проверяет, что переданная дата - завтрашний день
 */
export function isDateTomorrow(date: Date): boolean {
  const tomorrowDate = new Date(date.getTime() - MILLISECONDS_IN_THE_DAY);
  return isDateToday(tomorrowDate);
}
