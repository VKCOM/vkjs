import { expect, test } from '@jest/globals';
import { isDateToday } from './isDateToday';

test('isDateToday to be truthy', () => {
  expect(isDateToday(new Date())).toBeTruthy();
});

test('isDateToday to be falsy', () => {
  expect(isDateToday(new Date(2024, 0, 1))).toBeFalsy();
});
