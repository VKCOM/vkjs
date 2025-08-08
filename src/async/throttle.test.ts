/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';

import { throttle } from './throttle.ts';

test.test('throttle', async (t) => {
  const threshold = 50;

  await t.test('should call functions as usual if they exceed threshold interval', (t) => {
    const fn = t.mock.fn();
    t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
    const fnThrottled = throttle(fn, threshold);

    fnThrottled(1);
    assert.deepEqual(fn.mock.calls[0].arguments, [1]);

    t.mock.timers.tick(threshold);
    fnThrottled(2);
    assert.deepEqual(fn.mock.calls[1].arguments, [2]);
  });

  await t.test('should trigger last call at the end of threshold', (t) => {
    const fn = t.mock.fn();
    t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
    const fnThrottled = throttle(fn, threshold);

    fnThrottled(1);
    assert.deepEqual(fn.mock.calls[0].arguments, [1]);
    t.mock.timers.tick(10);

    fnThrottled(2);
    t.mock.timers.tick(threshold - 10);
    assert.deepEqual(fn.mock.calls[1].arguments, [2]);
  });

  await t.test(
    'should call not more than once per threshold and preserve correct call order',
    (t) => {
      const fn = t.mock.fn();
      t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
      const fnThrottled = throttle(fn, threshold);

      fnThrottled(1);
      // call function immediately after the first call
      assert.deepEqual(fn.mock.calls[0].arguments, [1]);

      fnThrottled(2);
      fnThrottled(3);
      t.mock.timers.tick(threshold - 10); // 40ms
      // throttle following calls until the threshold is reached
      assert.deepEqual(fn.mock.calls[0].arguments, [1]);

      fnThrottled(4);
      t.mock.timers.tick(10); // 50ms
      // call function with last arguments after the threshold is reached
      assert.deepEqual(fn.mock.calls[1].arguments, [4]);

      t.mock.timers.tick(10); // 60ms
      fnThrottled(5);
      // don't call function immediately and wait until threshold reached
      assert.deepEqual(fn.mock.callCount(), 2);

      t.mock.timers.tick(threshold - 10); // 100ms
      assert.deepEqual(fn.mock.calls[2].arguments, [5]);
    },
  );

  await t.test('should cancel throttled call', function (t) {
    const fn = t.mock.fn();
    t.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
    const fnThrottled = throttle(fn, threshold);

    fnThrottled(1);
    fnThrottled(2);
    fnThrottled(3);
    fnThrottled.cancel();
    t.mock.timers.tick(threshold);

    assert.equal(fn.mock.callCount(), 1);
    assert.deepEqual(fn.mock.calls[0].arguments, [1]);
  });
});
