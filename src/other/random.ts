export function getRandomInt(min: number, max: number): number {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

/**
 * Генерирует случайную строку из символов латинского алфавита и цифр
 */
export function getRandomString(length = 6): string {
  const source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(source.charAt(Math.floor(Math.random() * source.length)));
  }

  return result.join('');
}
