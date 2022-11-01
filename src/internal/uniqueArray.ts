export function uniqueArrayFallback<T>(array: T[]): T[] {
  if (!Array.isArray(array) || !array.length) {
    return [];
  }

  const map: Record<string, boolean> = {};
  const newArr: T[] = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = String(item) + typeof item;

    if (!map[key]) {
      newArr.push(item);
      map[key] = true;
    }
  }

  return newArr;
}
