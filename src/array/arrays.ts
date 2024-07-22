import { uniqueArrayFallback } from '../internal/uniqueArray';

/**
 * Создаёт массив чисел требуемой длины
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { createArray } from '@vkontakte/vkjs';
 *
 * assert.deepStrictEqual(createArray(5), [0, 1, 2, 3, 4]);
 * assert.deepStrictEqual(createArray(3, 2), [2, 3, 4]);
 * ```
 *
 * @param arrayLength Длина массива
 * @param startIndex Начальный индекс (по умолчанию 0)
 */
export function createArray(arrayLength: number, startIndex = 0): number[] {
  return Array.from({ length: arrayLength }, (_, index) => startIndex + index);
}

/**
 * Вычисляет сумму элементов массива
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { createArray } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(sumArray([0, 1, 2, 3, 4]), 10);
 * ```
 */
export function sumArray(array: number[]): number {
  if (!Array.isArray(array) || !array.length) {
    return 0;
  }
  return array.reduce((previous, current) => current + previous);
}

/**
 * Находит среднее арифметическое элементов массива
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { createArray } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(averageArray([0, 1, 2, 3, 4]), 2);
 * ```
 */
export function averageArray(array: number[]): number {
  if (!Array.isArray(array) || !array.length) {
    return 0;
  }
  return sumArray(array) / array.length;
}

/**
 * Возвращает новый массив с уникальными элементами
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { createArray } from '@vkontakte/vkjs';
 *
 * assert.deepStrictEqual(uniqueArray([1, 1, 2, 2, 3]), [1, 2, 3]);
 * ```
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
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Разбивает массив на чанки
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { createArray } from '@vkontakte/vkjs';
 *
 * assert.deepStrictEqual(
 *   chunkArray([1,2,3,4,5,6,7], 2),
 *   [[1,2], [3,4], [5,6], [7]],
 * );
 * ```
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
