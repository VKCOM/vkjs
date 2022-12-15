import { test, expect, describe } from '@jest/globals';
import { createArray, chunkArray, uniqueArray } from '../arrays';
import { uniqueArrayFallback } from '../internal/uniqueArray';

test('createArray', () => {
  expect(createArray(0)).toEqual([]);
  expect(createArray(2)).toEqual([0, 1]);
  expect(createArray(4, 2)).toEqual([2, 3, 4, 5]);
});

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

describe('chunkArray', () => {
  const entries = [
    [null as any, []],
    [undefined as any, []],
    [0 as any, []],

    [
      [1, 1, 1, 2, 2, 2],
      [1, 2],
    ],

    [
      [1, 2, 2, 1, 1, 3],
      [1, 2, 3],
    ],

    [
      [1, 1, 2, 3, 5, 5, 7],
      [1, 2, 3, 5, 7],
    ],

    [
      ['a', 'a', 'b', 'a', 'c', 'a', 'd'],
      ['a', 'b', 'c', 'd'],
    ],

    [
      [0, '0', 0, 'false', false, false],
      [0, '0', 'false', false],
    ],
  ];

  test.each(entries)('uniqueArray(%j) should equal %j', (input, expected) => {
    expect(uniqueArray(input)).toEqual(expected);
  });

  test.each(entries)('uniqueArray(%j) should equal %j with no Set available', (input, expected) => {
    expect(uniqueArrayFallback(input)).toEqual(expected);
  });
});
