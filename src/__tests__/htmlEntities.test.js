/* eslint-disable prettier/prettier */
import { test } from '@jest/globals';
import { decodeHTMLEntities, outOfBoundsChar } from '../htmlEntities';

const tests = [
  [
    undefined,
    '',
  ],
  [
    null,
    '',
  ],
  [
    '',
    '',
  ],
  [
    `Null and invalid entities &#0; &#2013266066;`,
    `Null and invalid entities ${outOfBoundsChar} ${outOfBoundsChar}`,
  ],
  [
    `Показувати моє ім&#39;я лише авторові`,
    `Показувати моє ім'я лише авторові`,
  ],
  [
    '&#1333;&#1408;&#1391;&#1387;&#1408;&#1384; &#1401;&#1379;&#1407;&#1398;&#1406;&#1381;&#1409;',
    'Երկիրը չգտնվեց',
  ],
  [
    '&amp; & &lt; < &gt; > &quot; "',
    '& & < < > > " "',
  ],
  [
    '&#34 &#34;',
    `&#34 "`,
  ],
  [
    'Привет&#33;',
    'Привет!',
  ],
  [
    'HEX entities &#XD06; &#xD06;',
    'HEX entities ആ ആ',
  ],
  [
    'Emoji &#128514; &#129498;',
    'Emoji 😂 🧚',
  ],
];

test.each(tests)('decodeHTMLEntities(%j) should equal %j', (input, expected) => {
  expect(decodeHTMLEntities(input)).toEqual(expected);
});
