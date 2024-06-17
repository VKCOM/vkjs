/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, test } from '@jest/globals';
import { isPromiseLike } from './type_checkers';

describe(isPromiseLike, () => {
  const promise = { then: function () {} };

  const fn = () => {};
  fn.then = () => {};

  test.each<any>([promise, fn])('isPromiseLike(%s) is true', (a) => {
    expect(isPromiseLike(a)).toBeTruthy();
  });

  test.each<any>([{}, () => {}, { then: true }, [], [true]])('isPromiseLike(%s) is false', (a) => {
    expect(isPromiseLike(a)).toBeFalsy();
  });
});
