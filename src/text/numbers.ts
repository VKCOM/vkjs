/**
 * Добавляет к числу 0 в начале, если число меньше 10
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { leadingZero } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(leadingZero(5), "05");
 * assert.strictEqual(leadingZero(15), "15");
 * ```
 *
 * @param number Число для форматирования
 */
export function leadingZero(number: number): string {
  if (number >= 10) {
    return String(number);
  } else {
    return '0' + String(number);
  }
}

/**
 * Форматирует число, разбивая его на разряды
 *
 * @example
 * ```ts
 * import assert from 'node:assert';
 * import { formatNumber } from '@vkontakte/vkjs';
 *
 * assert.strictEqual(formatNumber(1e9), "1 000 000 000");
 * assert.strictEqual(formatNumber(123456789), "123 456 789");
 * ```
 */
export function formatNumber(number: number, separator = ' ', decimalSeparator = ','): string {
  const numberParts = number.toString().split('.');
  const result = [];

  for (let i = numberParts[0].length - 3; i > -3; i -= 3) {
    result.unshift(numberParts[0].slice(i > 0 ? i : 0, i + 3));
  }

  numberParts[0] = result.join(separator);
  return numberParts.join(decimalSeparator);
}
