import { leadingZero } from '../other/numbers';

/**
 * Форматирует длительность в секундах в строку вида "MM:SS" или "HH:MM:SS".
 * Если `forceHours` `true`, то всегда будет выводиться "HH:MM:SS", даже если
 * длительность меньше часа
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { formatDuration } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(
 *   formatDuration(123456),
 *   "34:17:36",
 * );
 *
 * assert.strictEqual(
 *   formatDuration(1234, true),
 *   "0:20:34",
 * );
 * ```
 *
 * @param durationInSeconds Количество секунд, которые требуется отформатировать
 * @param forceHours Если `true`, то всегда будет выводиться "HH:MM:SS" даже
 * если длительность меньше часа
 */
export function formatDuration(durationInSeconds: number, forceHours?: boolean): string {
  if (!durationInSeconds) {
    durationInSeconds = 0;
  }

  durationInSeconds = Math.abs(durationInSeconds);

  const MINUTE = 60;
  const HOUR = 3600;

  const hours = Math.floor(durationInSeconds / HOUR);
  const minutes = Math.floor(durationInSeconds / MINUTE) % MINUTE;
  const seconds = durationInSeconds % MINUTE;

  if (durationInSeconds >= HOUR || forceHours) {
    return [hours, leadingZero(minutes), leadingZero(seconds)].join(':');
  } else {
    return [minutes, leadingZero(seconds)].join(':');
  }
}
