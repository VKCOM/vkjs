import { test, expect } from '@jest/globals';
import { chunkArray } from '../arrays';

test('chunkArray', () => {
  expect(chunkArray(null as any, 1)).toEqual([]);
  expect(chunkArray(undefined as any, 1)).toEqual([]);
  expect(chunkArray(0 as any, 1)).toEqual([]);

  expect(chunkArray([], 0)).toEqual([]);
  expect(chunkArray([1, 2], 0)).toEqual([[1, 2]]);

  expect(chunkArray([], 1)).toEqual([]);

  const array3 = [1, 1, 1];

  expect(chunkArray(array3, 1)).toEqual([[1], [1], [1]]);
  expect(chunkArray(array3, 2)).toEqual([[1, 1], [1]]);
  expect(chunkArray(array3, 3)).toEqual([[1, 1, 1]]);
  expect(chunkArray(array3, 4)).toEqual([[1, 1, 1]]);

  const array4 = [1, 2, 3, 4];

  expect(chunkArray(array4, 1)).toEqual([[1], [2], [3], [4]]);
  expect(chunkArray(array4, 2)).toEqual([
    [1, 2],
    [3, 4],
  ]);
  expect(chunkArray(array4, 3)).toEqual([[1, 2, 3], [4]]);
  expect(chunkArray(array4, 4)).toEqual([array4]);
  expect(chunkArray(array4, 5)).toEqual([array4]);
});
