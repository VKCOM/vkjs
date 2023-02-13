import { expect, test } from '@jest/globals';
import { formatDuration } from '../duration';

test('formatDuration function', () => {
  expect(formatDuration(0)).toEqual('0:00');
  expect(formatDuration(1)).toEqual('0:01');
  expect(formatDuration(100)).toEqual('1:40');
  expect(formatDuration(7200)).toEqual('2:00:00');
  expect(formatDuration(14200)).toEqual('3:56:40');
  expect(formatDuration(40200)).toEqual('11:10:00');

  expect(formatDuration(0, true)).toEqual('0:00:00');
  expect(formatDuration(1, true)).toEqual('0:00:01');
  expect(formatDuration(100, true)).toEqual('0:01:40');
  expect(formatDuration(7200, true)).toEqual('2:00:00');
  expect(formatDuration(14200, true)).toEqual('3:56:40');
  expect(formatDuration(40200, true)).toEqual('11:10:00');
});
