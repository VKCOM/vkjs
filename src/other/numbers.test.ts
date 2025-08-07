import { describe, expect, test } from '@jest/globals';

import { formatNumber } from './numbers.ts';

describe('formatNumber', () => {
  const cases: Array<[number, string]> = [
    [0, '0'],
    [1, '1'],
    [1000, '1 000'],
    [1000.1, '1 000,1'],
    [1000000.001, '1 000 000,001'],
    [9000009.999, '9 000 009,999'],
    [999.999, '999,999'],
    [1999.1, '1 999,1'],
    [-1999.1, '-1 999,1'],
    [-331999.1000001, '-331 999,1000001'],
  ];

  cases.forEach(([input, result]) => {
    test(`should format ${input} to ${result}`, () => {
      expect(formatNumber(input)).toBe(result);
    });
  });

  // Alternative separator
  test(`should format -331999.1000001 to -331_999|1000001`, () => {
    expect(formatNumber(-331999.1000001, '_', '|')).toBe('-331_999|1000001');
  });
});
