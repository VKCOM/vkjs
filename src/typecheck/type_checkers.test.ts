import * as assert from 'node:assert/strict';
import * as test from 'node:test';
import { isPromiseLike } from './type_checkers.ts';

test.test('isPromiseLike', async (t) => {
  // biome-ignore lint/suspicious/noThenProperty: Testing isPromiseLike function
  const promise = { then: () => {} };

  const fn = () => {};
  // biome-ignore lint/suspicious/noThenProperty: Testing isPromiseLike function
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
    // biome-ignore lint/suspicious/noThenProperty: Testing isPromiseLike function
    [{}, () => {}, { then: true }, [], [true]].map(
      async (input) =>
        await t.test(`isPromiseLike(${String(input)}) is false`, () => {
          assert.equal(isPromiseLike(input), false);
        }),
    ),
  );
});
