/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as assert from 'node:assert/strict';
import * as test from 'node:test';
import { createArray, chunkArray, uniqueArray } from './arrays.ts';
import { uniqueArrayFallback } from '../internal/uniqueArray.ts';

test.it('createArray', () => {
  assert.deepEqual(createArray(0), []);
  assert.deepEqual(createArray(2), [0, 1]);
  assert.deepEqual(createArray(4, 2), [2, 3, 4, 5]);
});

test.it('chunkArray', () => {
  assert.deepEqual(chunkArray(null as any, 1), []);
  assert.deepEqual(chunkArray(undefined as any, 1), []);
  assert.deepEqual(chunkArray(0 as any, 1), []);

  assert.deepEqual(chunkArray([], 0), []);
  assert.deepEqual(chunkArray([1, 2], 0), [[1, 2]]);

  assert.deepEqual(chunkArray([], 1), []);

  const array3 = [1, 1, 1];

  assert.deepEqual(chunkArray(array3, 1), [[1], [1], [1]]);
  assert.deepEqual(chunkArray(array3, 2), [[1, 1], [1]]);
  assert.deepEqual(chunkArray(array3, 3), [[1, 1, 1]]);
  assert.deepEqual(chunkArray(array3, 4), [[1, 1, 1]]);

  const array4 = [1, 2, 3, 4];

  assert.deepEqual(chunkArray(array4, 1), [[1], [2], [3], [4]]);
  assert.deepEqual(chunkArray(array4, 2), [
    [1, 2],
    [3, 4],
  ]);
  assert.deepEqual(chunkArray(array4, 3), [[1, 2, 3], [4]]);
  assert.deepEqual(chunkArray(array4, 4), [array4]);
  assert.deepEqual(chunkArray(array4, 5), [array4]);
});

test.it('uniqueArray', async (t) => {
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
  ] as const;

  await Promise.all(
    entries.map(
      async ([input, expected]) =>
        await t.test(
          `uniqueArray(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.deepEqual(uniqueArray(input), expected);
          },
        ),
    ),
  );

  await Promise.all(
    entries.map(
      async ([input, expected]) =>
        await t.test(
          `uniqueArray(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)} with no Set available`,
          () => {
            assert.deepEqual(uniqueArrayFallback(input), expected);
          },
        ),
    ),
  );
});
