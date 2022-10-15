/* eslint-disable @typescript-eslint/quotes */
import { Replacer } from '../lib/replacer';
import { fromCodePoint, getCodePointAt, numericUnicodeMap } from '../lib/codepoints';
import { fullNamedEntities } from './entity';

const escapeReplacer = new Replacer({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
});

const unescapeReplacer = new Replacer({
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
});

const namedEntities: Record<string, string> = {
  'amp;': '&',
  'lt;': '<',
  'gt;': '>',
  'quot;': '"',
  'apos;': `'`,
};

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
export function escape(input: string): string {
  return escapeReplacer.replace(input);
}

/**
 * Unescape HTML entities such as `&`, `<`, `>`, `"`, and `'`
 * @param {string} input
 */
export function unescape(input: string): string {
  return unescapeReplacer.replace(input);
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

const DECODE_REGEX = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g;

function decodeString(input: string, entities: Record<string, string>): string {
  if (!input || !input.length) {
    return '';
  }

  return input.replace(DECODE_REGEX, (entity) => {
    if (entity[1] === '#') {
      // We need to have at least "&#.".
      if (entity.length <= 3) {
        return entity;
      }

      const secondChar = entity.charAt(2);
      const code =
        secondChar === 'x' || secondChar === 'X'
          ? parseInt(entity.substr(3).toLowerCase(), 16)
          : parseInt(entity.substr(2));

      if (code >= 0x10ffff) {
        return outOfBoundsChar;
      }

      if (code > 65535) {
        return fromCodePoint(code);
      }

      return String.fromCharCode(numericUnicodeMap[code] || code);
    }

    return entities[entity.slice(1)] || entity;
  });
}

export function decodeHTMLEntities(input: string): string {
  return decodeString(input, namedEntities);
}

export function decodeHTMLFullEntities(input: string): string {
  return decodeString(input, fullNamedEntities);
}
