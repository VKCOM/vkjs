import { fromCodePoint, numericUnicodeMap } from './lib/codepoints';

const symbols = [
  ['&amp;', '&'],
  ['&lt;', '<'],
  ['&gt;', '>'],
  ['&quot;', '"'],
];

export const outOfBoundsChar = String.fromCharCode(65533);

export function decodeHTMLEntities(input: string): string {
  if (input == null) {
    return '';
  }

  input = symbols.reduce(
    (result, [mask, char]) => result.replace(new RegExp(mask, 'ig'), char),
    input,
  );

  const regex = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;

  return input.replace(regex, (entity) => {
    if (entity[0] === '&' && entity[1] === '#') {
      const secondChar = entity[2];
      const code =
        secondChar === 'x' || secondChar === 'X'
          ? parseInt(entity.substr(3), 16)
          : parseInt(entity.substr(2));

      if (code >= 0x10ffff) {
        return outOfBoundsChar;
      }

      if (code > 65535) {
        return fromCodePoint(code);
      }

      return String.fromCharCode(numericUnicodeMap[code] || code);
    }

    return entity;
  });
}
