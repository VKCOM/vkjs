export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isObjectLike(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

export function isFunction(value: any): value is ((...args: any[]) => any) {
  return typeof value === 'function';
}
