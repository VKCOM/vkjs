import { uniqueArrayFallback } from './internal/uniqueArray';

/**
 * Создаёт массив чисел требуемой длины
 *
 * @param arrayLength
 * @param startIndex
 */
export function createArray(arrayLength: number, startIndex = 0): number[] {
  return new Array(arrayLength).fill(null).map((_, index) => startIndex + index);
}

/**
 * Вычисляет сумму элементов массива
 */
export function sumArray(array: number[]): number {
  if (!Array.isArray(array) || !array.length) {
    return 0;
  }
  return array.reduce((previous, current) => current + previous);
}

/**
 * Находит среднее арифметическое элементов массива
 */
export function averageArray(array: number[]): number {
  if (!Array.isArray(array) || !array.length) {
    return 0;
  }
  return sumArray(array) / array.length;
}

/**
 * Возвращает новый массив с уникальными элементами
 */
export function uniqueArray<T>(array: T[]): T[] {
  if (!Array.isArray(array) || !array.length) {
    return [];
  }

  if (typeof Set !== 'undefined') {
    return Array.from(new Set(array));
  }

  return uniqueArrayFallback(array);
}

/**
 * Перемешивает исходный массив и возвращает новый
 */
export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map<[number, T]>((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map<T>((a) => a[1]);
}

/**
 * Разбивает массив на чанки
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  if (!Array.isArray(array) || !array.length) {
    return [];
  }

  if (!size) {
    return [array];
  }

  const head = array.slice(0, size);
  const tail = array.slice(size);

  return [head, ...chunkArray(tail, size)];
}

/**
 * Удаляет из массива элемент по значению.
 * Если элемент был удалён – возвращает новый массив.
 *
 * @example
 *
 * omitFromArray([1, 2, 3], 3) // [1, 2]
 * omitFromArray([1, 2, 3], 5) // [1, 2, 3]
 */
export function omitFromArray<T>(array: T[] = [], value: T): T[] {
  const index = array.indexOf(value);

  if (index < 0) {
    return array;
  } else {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }
}

/**
 * Возвращает разницу между двумя массивами.
 * Вернёт элементы, которых не хватает во втором массиве.
 *
 * @example
 *
 * difference([1, 2, 3], [1, 2, 3]) // []
 * difference([1, 2, 3], [1]) // [2, 3]
 * difference([1, 2, 3], [1, 10, 100]) // [2, 3]
 */
export function difference<T>(array1: T[] = [], array2: T[] = []) {
  return array1.reduce<T[]>((res, item) => {
    if (!array2.includes(item)) {
      res.push(item);
    }
    return res;
  }, []);
}
