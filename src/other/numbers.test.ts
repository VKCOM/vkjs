import { describe, expect, test } from '@jest/globals';

import { formatNumber } from './numbers';

describe('formatNumber', () => {
  const cases: [number, string][] = [
    [0, '0'],
    [1, '1'],
    [1000, '1 000'],
    [1000.1, '1 000,1'],
    [1000000.001, '1 000 000,001'],
    [9000009.999, '9 000 009,999'],
    [999.999, '999,999'],
    [1999.100, '1 999,1'],
    [-1999.100, '-1 999,1'],
  ];

  cases.forEach(([input, result]) => {
    test(`should format ${input} to ${result}`, () => {
      expect(formatNumber(input)).toBe(result);
    })
  });
});
