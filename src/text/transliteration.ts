import { Replacer } from '../internal/replacer';

/**
 * Словарь транслитерации ВКонтакте из русского в английский.
 */
const transliterationDictVKRusToEng: Record<string, string> = {
  'А': 'A',
  'Б': 'B',
  'В': 'V',
  'Г': 'G',
  '\xa5': 'G',
  'Д': 'D',
  'Е': 'E',
  'Є': 'Ye',
  'Ё': 'Yo',
  'Ж': 'Zh',
  'З': 'Z',
  'И': 'I',
  'Ї': 'Yi',
  '\xb2': 'I',
  'Й': 'J',
  'К': 'K',
  'Л': 'L',
  'М': 'M',
  'Н': 'N',
  'О': 'O',
  'П': 'P',
  'Р': 'R',
  'С': 'S',
  'Т': 'T',
  'У': 'U',
  'Ў': 'W',
  'Ф': 'F',
  'Х': 'Kh',
  'Ц': 'Ts',
  'Ч': 'Ch',
  'Ш': 'Sh',
  'Щ': 'Sch',
  'Ы': 'Y',
  'Ый': 'Y',
  'Э': 'E',
  'Ю': 'Yu',
  'Я': 'Ya',

  'а': 'a',
  'б': 'b',
  'в': 'v',
  'г': 'g',
  '\xb4': 'g',
  'д': 'd',
  'е': 'e',
  'є': 'ye',
  'ё': 'yo',
  'ж': 'zh',
  'з': 'z',
  'ия': 'ia',
  'ий': 'y',
  'и': 'i',
  'й': 'y',
  'ї': 'yi',
  '\xb3': 'i',
  'кс': 'x',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ў': 'w',
  'ф': 'f',
  'х': 'kh',
  'ц': 'ts',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'sch',
  'ъ': '',
  'ый': 'y',
  'ы': 'y',
  'ь': '',
  'ье': 'ye',
  'ьо': 'io',
  'э': 'e',
  'ю': 'yu',
  'я': 'ya',
};

/**
 * Словарь транслитерации ВКонтакте из английского в русский.
 */
const transliterationDictVKEngToRus: Record<string, string> = {
  'a': 'а',
  'b': 'б',
  'v': 'в',
  'g': 'г',
  'd': 'д',
  'e': 'е',
  'z': 'з',
  'i': 'и',
  'j': 'й',
  'k': 'к',
  'l': 'л',
  'm': 'м',
  'n': 'н',
  'o': 'о',
  'p': 'п',
  'r': 'р',
  's': 'с',
  't': 'т',
  'u': 'у',
  'f': 'ф',
  'h': 'х',
  'c': 'ц',
  'y': 'ы',
  'A': 'А',
  'B': 'Б',
  'V': 'В',
  'G': 'Г',
  'D': 'Д',
  'E': 'Е',
  'Z': 'З',
  'I': 'И',
  'J': 'Й',
  'K': 'К',
  'L': 'Л',
  'M': 'М',
  'N': 'Н',
  'O': 'О',
  'P': 'П',
  'R': 'Р',
  'S': 'С',
  'T': 'Т',
  'U': 'У',
  'F': 'Ф',
  'H': 'Х',
  'C': 'Ц',
  'Y': 'Ы',
  'w': 'в',
  'q': 'к',
  'x': 'кс',
  'W': 'В',
  'Q': 'К',
  'X': 'КС',

  'yo': 'ё',
  'zh': 'ж',
  'kh': 'х',
  'ts': 'ц',
  'ch': 'ч',
  'sch': 'щ',
  'shch': 'щ',
  'sh': 'ш',
  'eh': 'э',
  'yu': 'ю',
  'ya': 'я',
  'YO': 'Ё',
  'ZH': 'Ж',
  'KH': 'Х',
  'TS': 'Ц',
  'CH': 'Ч',
  'SCH': 'Щ',
  'SHCH': 'Щ',
  'SH': 'Ш',
  'EH': 'Э',
  'YU': 'Ю',
  'YA': 'Я',
  "'": 'ь',
};

/**
 * Словарь транслитерации ГОСТ 7.79-2000 (ISO 9-95) по по системе Б
 * (с использованием буквосочетаний) для русского языка.
 */
const transliterationDictGostLetterCombinationsRu = {
  'А': 'A',
  'Б': 'B',
  'В': 'V',
  'Г': 'G',
  'Д': 'D',
  'Е': 'E',
  'Ё': 'Yo',
  'Ж': 'Zh',
  'З': 'Z',
  'И': 'I',
  'Й': 'J',
  'К': 'K',
  'Л': 'L',
  'М': 'M',
  'Н': 'N',
  'О': 'O',
  'П': 'P',
  'Р': 'R',
  'С': 'S',
  'Т': 'T',
  'У': 'U',
  'Ф': 'F',
  'Х': 'X',
  'Ц': 'Cz',
  'Ч': 'Ch',
  'Ш': 'Sh',
  'Щ': 'Shh',
  'Ъ': '``',
  'Ы': 'Y`',
  'Ь': '`',
  'Э': 'E`',
  'Ю': 'Yu',
  'Я': 'Ya',

  'а': 'a',
  'б': 'b',
  'в': 'v',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'yo',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'й': 'j',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'x',
  'ц': 'cz',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'shh',
  'ъ': '``',
  'ы': 'y`',
  'ь': '`',
  'э': 'e`',
  'ю': 'yu',
  'я': 'ya',

  '’': `'`, // апостроф
  'Ѣ': 'ye', // ять
  'Ѳ': 'fh', //	фита
  'Ѵ': 'yh', // ижица
};

/**
 * Словарь переключения раскладки между QWERTY и ЙЦУКЕН.
 */
const transliterationDictQwertyRu: Record<string, string> = /*#__PURE__*/ (() => {
  const map: Record<string, string> = {
    й: 'q',
    ц: 'w',
    у: 'e',
    к: 'r',
    е: 't',
    н: 'y',
    г: 'u',
    ш: 'i',
    щ: 'o',
    з: 'p',
    х: '[',
    ъ: ']',
    ф: 'a',
    ы: 's',
    в: 'd',
    а: 'f',
    п: 'g',
    р: 'h',
    о: 'j',
    л: 'k',
    д: 'l',
    ж: ';',
    э: "'",
    я: 'z',
    ч: 'x',
    с: 'c',
    м: 'v',
    и: 'b',
    т: 'n',
    ь: 'm',
    б: ',',
    ю: '.',
  };

  Object.keys(map).forEach((key) => {
    map[key.toUpperCase()] = map[key].toUpperCase();
  });

  Object.assign(map, {
    Х: '{',
    Ъ: '}',
    Ж: ':',
    Э: '"',
    Б: '<',
    Ю: '>',
    ё: '`',
    Ё: '~',
  });

  Object.entries(map).forEach(([key, value]) => {
    map[value] = key;
  });

  // Mac клавиатура
  Object.assign(map, {
    '§': 'ё',
    '±': 'Ё',
  });

  return map;
})();

/**
 * Транслитератор, для передачи знаков одной письменности знаками другой.
 */
export class Transliterator {
  private readonly replacer: Replacer;

  constructor(dict: Record<string, string>) {
    this.replacer = new Replacer(dict);
  }

  /**
   * Производит транслитерацию текста
   */
  transliteration(text: string): string {
    return this.replacer.replace(text);
  }
}

/**
 * Транслитератор ВКонтакте из русского в английский
 */
export const transliteratorVKRusToEng = /*#__PURE__*/ new Transliterator(
  transliterationDictVKRusToEng,
);

/**
 * Транслитератор ВКонтакте из английского в русский
 */
export const transliteratorVKEngToRus = /*#__PURE__*/ new Transliterator(
  transliterationDictVKEngToRus,
);

/**
 * Транслитератор ГОСТ 7.79-2000 (ISO 9-95) по системе Б
 * (с использованием буквосочетаний) для русского языка.
 */
export const transliteratorGostLetterCombinationsRu = /*#__PURE__*/ new Transliterator(
  transliterationDictGostLetterCombinationsRu,
);

/**
 * Транслитератор раскладки клавиатуры между QWERTY и ЙЦУКЕН
 */
export const transliteratorQwertyRu = /*#__PURE__*/ new Transliterator(transliterationDictQwertyRu);
