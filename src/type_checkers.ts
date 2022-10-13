export function isObjectLike(object: any): boolean {
  return typeof object === 'object' && object !== null;
}

export function isArray(object: any): object is any[] {
  return Array.isArray(object);
}

export function isObject(object: any): boolean {
  return Object.prototype.toString.call(object) === '[object Object]';
}

export function isUndefined(object: any): object is undefined {
  return typeof object === 'undefined';
}

export function isFunction(object: any): object is (...args: any[]) => any {
  return typeof object === 'function';
}

export function isFormData(object: any): object is FormData {
  return object && Object.prototype.toString.call(object) === '[object FormData]';
}

export function isString(object: any): object is string {
  return typeof object === 'string';
}

export function isNumber(object: any): object is number {
  return typeof object === 'number';
}
