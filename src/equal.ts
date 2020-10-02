import { isObjectLike } from './type_checkers';

export function isEqual(value: any, other: any): boolean {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }

  if (isObjectLike(value) && isObjectLike(other)) {
    if (Object.keys(value).length !== Object.keys(other).length) {
      return false;
    }

    for (const prop in value) {
      if (value.hasOwnProperty(prop) && other.hasOwnProperty(prop)) {
        if (!isEqual(value[prop], other[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  }

  return false;
}
