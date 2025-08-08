/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { isNumeric } from './common.ts';

test.test('isNumeric function', () => {
  assert.equal(isNumeric(1), true);

  assert.equal(isNumeric('1'), true);
  assert.equal(isNumeric('+1'), true);
  assert.equal(isNumeric('-1'), true);

  assert.equal(isNumeric('1.5'), true);
  assert.equal(isNumeric('+1.5'), true);
  assert.equal(isNumeric('-1.5'), true);

  assert.equal(isNumeric([1]), false);
  assert.equal(isNumeric('1 false'), false);

  assert.equal(isNumeric(parseInt('false')), false);
});
