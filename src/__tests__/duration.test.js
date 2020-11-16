import { test } from '@jest/globals';
import { formatDuration } from '../duration';

test('formatDuration function', () => {
  expect(formatDuration(0)).toEqual('');
  expect(formatDuration(1)).toEqual('0:01');
  expect(formatDuration(100)).toEqual('1:40');
});
