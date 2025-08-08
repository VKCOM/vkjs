/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { isPromiseLike } from './type_checkers.ts';

test.test('isPromiseLike', async (t) => {
  const promise = { then: function () {} };

  const fn = () => {};
  fn.then = () => {};

  await Promise.all(
    [promise, fn].map(
      async (input) =>
        await t.test(`isPromiseLike(${String(input)}) is true`, () => {
          assert.equal(isPromiseLike(input), true);
        }),
    ),
  );

  await Promise.all(
    [{}, () => {}, { then: true }, [], [true]].map(
      async (input) =>
        await t.test(`isPromiseLike(${String(input)}) is false`, () => {
          assert.equal(isPromiseLike(input), false);
        }),
    ),
  );
});
