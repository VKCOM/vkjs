import { test } from '@jest/globals';
import { isNumeric } from '../common';

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
