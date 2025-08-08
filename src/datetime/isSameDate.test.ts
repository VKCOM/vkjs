/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { isSameDate } from './isSameDate.ts';

test.test('isSameDate to be truthy', () => {
  assert.equal(isSameDate(new Date(2024, 0, 1), new Date(2024, 0, 1)), true);
  assert.equal(
    isSameDate(new Date(2024, 0, 1, 12, 34, 56, 789), new Date(2024, 0, 1, 21, 43, 56, 987)),
    true,
  );
});

test.test('isSameDate to be falsy', () => {
  assert.equal(isSameDate(new Date(2024, 0, 1), new Date(2024, 0, 2)), false);
});
