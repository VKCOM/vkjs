import { createElement } from 'react';
import { expect, test, describe } from '@jest/globals';
import { hasReactNode, isPrimitiveReactNode } from '../react_utils';

describe(hasReactNode, () => {
  describe('return false cases', () => {
    test('should be false for value is undefined', () => {
      expect(hasReactNode(undefined)).toBeFalsy();
    });

    test('should be false for value is null', () => {
      expect(hasReactNode(null)).toBeFalsy();
    });

    test('should be false for value is false', () => {
      expect(hasReactNode(false)).toBeFalsy();
    });

    test('should be false for value is empty string', () => {
      expect(hasReactNode('')).toBeFalsy();
    });
  });

  describe('return true cases', () => {
    test('should be true for value is zero', () => {
      expect(hasReactNode(0)).toBeTruthy();
    });

    test('should be true for value is not empty string', () => {
      expect(hasReactNode(' ')).toBeTruthy();
    });

    test('should be true for value is react element', () => {
      expect(hasReactNode(createElement('div'))).toBeTruthy();
    });
  });
});

describe(isPrimitiveReactNode, () => {
  describe('return false cases', () => {
    test('should be false for value is boolean', () => {
      expect(isPrimitiveReactNode(false)).toBeFalsy();
    });

    test('should be false for value is react element', () => {
      expect(isPrimitiveReactNode(createElement('div'))).toBeFalsy();
    });
  });

  describe('return true cases', () => {
    test('should be false for value is undefined', () => {
      expect(isPrimitiveReactNode('')).toBeTruthy();
    });

    test('should be false for value is null', () => {
      expect(isPrimitiveReactNode(0)).toBeTruthy();
    });
  });
});
