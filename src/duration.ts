import { leadingZero } from './numbers';

export function formatDuration(durationInSeconds: number): string {
  if (!durationInSeconds) {
    return '';
  }

  const MINUTE = 60;
  const HOUR = 3600;

  const hours = Math.floor(durationInSeconds / HOUR);
  const minutes = Math.floor(durationInSeconds / MINUTE) % MINUTE;
  const seconds = durationInSeconds % MINUTE;

  if (durationInSeconds >= HOUR) {
    return [hours, leadingZero(minutes), leadingZero(seconds)].join(':');
  } else {
    return [minutes, leadingZero(seconds)].join(':');
  }
}
