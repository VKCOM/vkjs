/**
 * Escapes a string so that it can be put into RegExp as a variable
 *
 * @example
 * new RegExp(`foo-${escapeRegExp('(bar)')}`, 'i')
 */
export function escapeRegExp(string: string): string {
  if (string) {
    return string.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
  }

  return '';
}
