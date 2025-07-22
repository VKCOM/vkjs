import { expect, test } from '@jest/globals';
import { isNumeric } from './common.ts';

test('isNumeric function', () => {
  expect(isNumeric(1)).toEqual(true);

  expect(isNumeric('1')).toEqual(true);
  expect(isNumeric('+1')).toEqual(true);
  expect(isNumeric('-1')).toEqual(true);

  expect(isNumeric('1.5')).toEqual(true);
  expect(isNumeric('+1.5')).toEqual(true);
  expect(isNumeric('-1.5')).toEqual(true);

  expect(isNumeric([1])).toEqual(false);
  expect(isNumeric('1 false')).toEqual(false);

  expect(isNumeric(parseInt('false'))).toEqual(false);
});
