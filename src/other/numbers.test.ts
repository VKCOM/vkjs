/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';

import { formatNumber } from './numbers.ts';

test.test('formatNumber', async () => {
  assert.equal(formatNumber(0), '0');
  assert.equal(formatNumber(1), '1');
  assert.equal(formatNumber(1000), '1 000');
  assert.equal(formatNumber(1000.1), '1 000,1');
  assert.equal(formatNumber(1000000.001), '1 000 000,001');
  assert.equal(formatNumber(9000009.999), '9 000 009,999');
  assert.equal(formatNumber(999.999), '999,999');
  assert.equal(formatNumber(1999.1), '1 999,1');
  assert.equal(formatNumber(-1999.1), '-1 999,1');
  assert.equal(formatNumber(-331999.1000001), '-331 999,1000001');

  // Alternative separator
  assert.equal(formatNumber(-331999.1000001, '_', '|'), '-331_999|1000001');
});
