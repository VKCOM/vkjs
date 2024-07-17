import { expect, jest, test, describe } from '@jest/globals';
import { once } from './functions';

describe('once', () => {
  test('should be called once', () => {
    const fn = jest.fn();
    const fnOnce = once(fn);

    fnOnce();
    fnOnce();
    fnOnce();

    expect(fn).toBeCalledTimes(1);
  });
});
