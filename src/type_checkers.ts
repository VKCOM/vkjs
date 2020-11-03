export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isObjectLike(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

export function isFunction(obj: unknown): boolean {
  return obj && Object.prototype.toString.call(obj) === '[object Function]';
}
