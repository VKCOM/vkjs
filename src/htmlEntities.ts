/* eslint-disable @typescript-eslint/quotes */
import { fromCodePoint, getCodePointAt, numericUnicodeMap } from './lib/codepoints';

const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
};

const unescapeMap: Record<string, string> = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
};

const namedEntities = [
  ['&amp;', '&'],
  ['&lt;', '<'],
  ['&gt;', '>'],
  ['&quot;', '"'],
  ['&apos;', `'`],
];

const ESCAPE_REGEX = /[&<>'"]/g;

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
export function escape(input: string): string {
  if (input == null) {
    return '';
  }

  return input.replace(ESCAPE_REGEX, (entity) => {
    return escapeMap[entity];
  });
}

const UNESCAPE_REGEX = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;

/**
 * Unescape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
export function unescape(input: string): string {
  if (input == null) {
    return '';
  }

  return input.replace(UNESCAPE_REGEX, (entity) => {
    return unescapeMap[entity];
  });
}

export const outOfBoundsChar = String.fromCharCode(65533);

const ENCODE_REGEX =
  /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;

export function encodeHTMLEntities(input: string): string {
  if (input == null) {
    return '';
  }

  return input.replace(ENCODE_REGEX, (entity) => {
    const code = entity.length > 1 ? getCodePointAt(entity, 0) : entity.charCodeAt(0);
    return '&#' + String(code) + ';';
  });
}

const DECODE_REGEX = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;

export function decodeHTMLEntities(input: string): string {
  if (input == null) {
    return '';
  }

  input = namedEntities.reduce(
    (result, [mask, char]) => result.replace(new RegExp(mask, 'ig'), char),
    input,
  );

  return input.replace(DECODE_REGEX, (entity) => {
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
