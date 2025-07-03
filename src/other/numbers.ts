/**
 * Добавляет к числу 0 в начале, если число меньше 10
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
 */
export function formatNumber(number: number, separator = ' ', decimalSeparator = ','): string {
  const formatedInt = (number | 0).toLocaleString('en-US').replace(/,/g, separator);
  const floatPart = String(number).split('.')[1];

  return floatPart ? `${formatedInt}${decimalSeparator}${floatPart}` : formatedInt;
}
