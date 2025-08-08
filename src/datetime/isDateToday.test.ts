/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { isDateToday } from './isDateToday.ts';

test.test('isDateToday to be truthy', () => {
  assert.equal(isDateToday(new Date()), true);
});

test.test('isDateToday to be falsy', () => {
  assert.equal(isDateToday(new Date(2024, 0, 1)), false);
});
