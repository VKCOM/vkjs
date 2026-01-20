import { isObjectLike } from '../typecheck/type_checkers.ts';

export function isEqual(value: unknown, other: unknown): boolean {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    // biome-ignore lint/suspicious/noSelfCompare: NaN comparison check
    return value !== value && other !== other;
  }

  if (isObjectLike(value) && isObjectLike(other)) {
    const valueObj = value as Record<string, unknown>;
    const otherObj = other as Record<string, unknown>;

    if (Object.keys(valueObj).length !== Object.keys(otherObj).length) {
      return false;
    }

    for (const prop in value) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins: hasOwn need es2022
      if (value.hasOwnProperty(prop) && other.hasOwnProperty(prop)) {
        if (!isEqual(valueObj[prop], otherObj[prop])) {
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
