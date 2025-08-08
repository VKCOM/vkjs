/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { debounce } from './debounce.ts';

test.test('debounce', async (t) => {
  const delay = 50;

  await t.test('should debounce function call', (t) => {
    const fn = t.mock.fn();
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const fnDebounced = debounce(fn, delay);

    fnDebounced(1);
    assert.equal(fn.mock.callCount(), 0);

    t.mock.timers.tick(10); // 10ms
    fnDebounced(2);

    t.mock.timers.tick(delay - 10); // 50ms
    assert.equal(fn.mock.callCount(), 0);

    t.mock.timers.tick(10); // 60ms
    assert.deepEqual(fn.mock.calls[0].arguments, [2]);
  });

  await t.test('should cancel debounced call', function () {
    const fn = t.mock.fn();
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const fnDebounced = debounce(fn, delay);

    fnDebounced(1);
    fnDebounced(2);
    fnDebounced(3);
    fnDebounced.cancel();
    t.mock.timers.tick(delay);

    assert.equal(fn.mock.callCount(), 0);
  });
});
