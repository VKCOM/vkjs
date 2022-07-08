import { expect, jest, test, describe, beforeEach } from '@jest/globals';
import { debounce, throttle } from '../functions';

describe('throttle', () => {
  const threshold = 50;
  let fn;
  let fnThrottled;
  beforeEach(() => {
    jest.useFakeTimers('modern');
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

  it('should cancel throttled call', function() {
    fnThrottled(1);
    fnThrottled(2);
    fnThrottled(3);
    fnThrottled.cancel();
    jest.advanceTimersByTime(threshold);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});

describe('debounce', () => {
  const delay = 50;
  let fn;
  let fnDebounced;
  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(100);
    fn = jest.fn();
    fnDebounced = debounce(fn, delay);
  });

  test('should debounce function call', () => {
    fnDebounced(1);
    expect(fn.mock.calls).toEqual([]);

    jest.advanceTimersByTime(10); // 10ms
    fnDebounced(2);

    jest.advanceTimersByTime(delay - 10); // 50ms
    expect(fn.mock.calls).toEqual([]);

    jest.advanceTimersByTime(10); // 60ms
    expect(fn.mock.calls).toEqual([[2]]);
  });

  it('should cancel debounced call', function() {
    fnDebounced(1);
    fnDebounced(2);
    fnDebounced(3);
    fnDebounced.cancel();
    jest.advanceTimersByTime(delay);

    expect(fn).not.toHaveBeenCalled();
  });
});
