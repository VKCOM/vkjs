/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { once } from './functions.ts';

test.test('once', async (t) => {
  await t.test('should be called once', () => {
    const fn = t.mock.fn();
    const fnOnce = once(fn);

    fnOnce();
    fnOnce();
    fnOnce();

    assert.equal(fn.mock.callCount(), 1);
  });
});
