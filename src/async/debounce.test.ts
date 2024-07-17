import { expect, jest, test, describe, beforeEach, it } from '@jest/globals';
import { debounce } from './debounce';
import { AnyFunction } from '../other/types';

import Mock = jest.Mock;

describe('debounce', () => {
  const delay = 50;
  let fn: Mock<AnyFunction>;
  let fnDebounced: ReturnType<typeof debounce>;

  beforeEach(() => {
    jest.useFakeTimers();
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

  it('should cancel debounced call', function () {
    fnDebounced(1);
    fnDebounced(2);
    fnDebounced(3);
    fnDebounced.cancel();
    jest.advanceTimersByTime(delay);

    expect(fn).not.toHaveBeenCalled();
  });
});
