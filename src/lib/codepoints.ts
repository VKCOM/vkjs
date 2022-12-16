export const numericUnicodeMap: Record<number, number> = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376,
};

export const highSurrogateFrom = 0xd800;
export const highSurrogateTo = 0xdbff;

export const fromCodePoint = /*#__PURE__*/ (() =>
  String.fromCodePoint ||
  function (astralCodePoint: number) {
    return String.fromCharCode(
      Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xd800,
      ((astralCodePoint - 0x10000) % 0x400) + 0xdc00,
    );
  })();

const codePointAtNative = /*#__PURE__*/ (() =>
  String.prototype.codePointAt as typeof String.prototype.codePointAt | undefined)();

export const getCodePointAt = /*#__PURE__*/ (() =>
  codePointAtNative
    ? function (input: string, position: number) {
        return input.codePointAt(position);
      }
    : function (input: string, position: number) {
        return (
          (input.charCodeAt(position) - 0xd800) * 0x400 +
          input.charCodeAt(position + 1) -
          0xdc00 +
          0x10000
        );
      })();
