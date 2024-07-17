import type { ReactNode } from 'react';

export function hasReactNode(value: ReactNode): boolean {
  return value !== undefined && value !== false && value !== null && value !== '';
}

export function isPrimitiveReactNode(node: ReactNode): boolean {
  return typeof node === 'string' || typeof node === 'number';
}
