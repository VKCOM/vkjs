/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { formatDuration } from './duration.ts';

test.test('formatDuration function', () => {
  assert.equal(formatDuration(0), '0:00');
  assert.equal(formatDuration(1), '0:01');
  assert.equal(formatDuration(100), '1:40');
  assert.equal(formatDuration(7200), '2:00:00');
  assert.equal(formatDuration(14200), '3:56:40');
  assert.equal(formatDuration(40200), '11:10:00');

  assert.equal(formatDuration(0, true), '0:00:00');
  assert.equal(formatDuration(1, true), '0:00:01');
  assert.equal(formatDuration(100, true), '0:01:40');
  assert.equal(formatDuration(7200, true), '2:00:00');
  assert.equal(formatDuration(14200, true), '3:56:40');
  assert.equal(formatDuration(40200, true), '11:10:00');
});
