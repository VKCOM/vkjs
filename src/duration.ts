import { leadingZero } from './numbers';

/**
 * @param durationInSeconds
 * @param forceHours
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
