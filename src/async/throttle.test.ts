import { expect, jest, test, describe, beforeEach, it } from '@jest/globals';
import { throttle } from './throttle';
import { AnyFunction } from '../other/types';

import Mock = jest.Mock;

describe('throttle', () => {
  const threshold = 50;
  let fn: Mock<AnyFunction>;
  let fnThrottled: ReturnType<typeof throttle>;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(100);
    fn = jest.fn();
    fnThrottled = throttle(fn, threshold);
  });

  test('should call functions as usual if they exceed threshold interval', () => {
    fnThrottled(1);
    expect(fn.mock.calls).toEqual([[1]]);

    jest.advanceTimersByTime(threshold);
    fnThrottled(2);
    expect(fn.mock.calls).toEqual([[1], [2]]);
  });

  test('should trigger last call at the end of threshold', () => {
    fnThrottled(1);
    expect(fn.mock.calls).toEqual([[1]]);
    jest.advanceTimersByTime(10);

    fnThrottled(2);
    jest.advanceTimersByTime(threshold - 10);
    expect(fn.mock.calls).toEqual([[1], [2]]);
  });

  test('should call not more than once per threshold and preserve correct call order', () => {
    fnThrottled(1);
    // call function immediately after the first call
    expect(fn.mock.calls).toEqual([[1]]);

    fnThrottled(2);
    fnThrottled(3);
    jest.advanceTimersByTime(threshold - 10); // 40ms
    // throttle following calls until the threshold is reached
    expect(fn.mock.calls).toEqual([[1]]);

    fnThrottled(4);
    jest.advanceTimersByTime(10); // 50ms
    // call function with last arguments after the threshold is reached
    expect(fn.mock.calls).toEqual([[1], [4]]);

    jest.advanceTimersByTime(10); // 60ms
    fnThrottled(5);
    // don't call function immediately and wait until threshold reached
    expect(fn.mock.calls).toEqual([[1], [4]]);

    jest.advanceTimersByTime(threshold - 10); // 100ms
    expect(fn.mock.calls).toEqual([[1], [4], [5]]);
  });

  it('should cancel throttled call', function () {
    fnThrottled(1);
    fnThrottled(2);
    fnThrottled(3);
    fnThrottled.cancel();
    jest.advanceTimersByTime(threshold);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
