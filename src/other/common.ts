/**
 * Returns true if value is a number (excluding NaN), or is a numeric string.
 *
 * NOTE: It treats all Number-coercible strings as numeric (e.g. `'0x123'`, `'123e-1'`),
 * so for number-type values it's better to just use `Number.isFinite()`.
 */
export function isNumeric(value: unknown): boolean {
  return (
    // biome-ignore lint/suspicious/noGlobalIsNan: Number.isNaN имеет другое поведение
    !isNaN(parseFloat(value as string)) &&
    // biome-ignore lint/suspicious/noGlobalIsFinite: Number.isFinite имеет другое поведение
    isFinite(value as number) &&
    // Handle `[1]` being serialized and parsed as `1`
    !Array.isArray(value)
  );
}
