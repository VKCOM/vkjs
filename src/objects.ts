/**
 * Удаляет ключи `keys` из объекта и возвращает его копию
 */
export function deleteObjectKeys<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[] = [],
): T {
  const newObject = { ...object };
  keys.forEach((key) => delete newObject[key]);
  return newObject;
}
