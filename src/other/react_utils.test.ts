/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { createElement } from 'react';
import { hasReactNode, isPrimitiveReactNode } from './react_utils.ts';

test.test('hasReactNode', async (t) => {
  await t.test('return false cases', async (t) => {
    await t.test('should be false for value is undefined', () => {
      assert.equal(hasReactNode(undefined), false);
    });

    await t.test('should be false for value is null', () => {
      assert.equal(hasReactNode(null), false);
    });

    await t.test('should be false for value is false', () => {
      assert.equal(hasReactNode(false), false);
    });

    await t.test('should be false for value is empty string', () => {
      assert.equal(hasReactNode(''), false);
    });
  });

  await t.test('return true cases', async (t) => {
    await t.test('should be true for value is zero', () => {
      assert.equal(hasReactNode(0), true);
    });

    await t.test('should be true for value is not empty string', () => {
      assert.equal(hasReactNode(' '), true);
    });

    await t.test('should be true for value is react element', () => {
      assert.equal(hasReactNode(createElement('div')), true);
    });
  });
});

test.test('isPrimitiveReactNode', async (t) => {
  await t.test('return false cases', async (t) => {
    await t.test('should be false for value is boolean', () => {
      assert.equal(isPrimitiveReactNode(false), false);
    });

    await t.test('should be false for value is react element', () => {
      assert.equal(isPrimitiveReactNode(createElement('div')), false);
    });
  });

  await t.test('return true cases', async (t) => {
    await t.test('should be false for value is undefined', () => {
      assert.equal(isPrimitiveReactNode(''), true);
    });

    await t.test('should be false for value is null', () => {
      assert.equal(isPrimitiveReactNode(0), true);
    });
  });
});
