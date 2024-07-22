import { expect, test } from '@jest/globals';
import { isSameDate } from './isSameDate';

test('isSameDate to be truthy', () => {
  expect(isSameDate(new Date(2024, 0, 1), new Date(2024, 0, 1))).toBeTruthy();
  expect(
    isSameDate(new Date(2024, 0, 1, 12, 34, 56, 789), new Date(2024, 0, 1, 21, 43, 56, 987)),
  ).toBeTruthy();
});

test('isSameDate to be falsy', () => {
  expect(isSameDate(new Date(2024, 0, 1), new Date(2024, 0, 2))).toBeFalsy();
});
