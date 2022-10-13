/* eslint-disable prettier/prettier */
import { test } from '@jest/globals';
import { escape, unescape, encodeHTMLEntities, decodeHTMLEntities, outOfBoundsChar } from '../htmlEntities';

const empty = [
  [
    undefined,
    '',
  ],
  [
    null,
    '',
  ],
];

const escapeTest = [
  ...empty,
  [
    `Entities &<>\'"`,
    `Entities &amp;&lt;&gt;&#39;&quot;`,
  ],
  [
    `&foo <> bar "fizz" l\'a`,
    `&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a`,
  ]
];

test.each(escapeTest)('escape(%j) should equal %j', (input, expected) => {
  expect(escape(input)).toEqual(expected);
});

const unescapeTest = [
  ...empty,
  [
    `Entities &amp;&lt;&gt;&apos;&quot;`,
    `Entities &<>\'"`,
  ],
  [
    'foo&#39;&apos;bar',
    `foo''bar`,
  ]
];

test.each(unescapeTest)('unescape(%j) should equal %j', (input, expected) => {
  expect(unescape(input)).toEqual(expected);
});

const encodeTest = [
  ...empty,
  [
    'a\n<>"\'&©∆℞😂\0\x01',
    'a\n&#60;&#62;&#34;&#39;&#38;&#169;&#8710;&#8478;&#128514;\x00&#1;',
  ],
];

test.each(encodeTest)('encodeHTMLEntities(%j) should equal %j', (input, expected) => {
  expect(encodeHTMLEntities(input)).toEqual(expected);
});

const decodeTests = [
  ...empty,
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
  [
    'a\n&#60;&#62;&#34;&#39;&#38;&#169;&#8710;&#8478;&#128514;\x00&#1;',
    'a\n<>"\'&©∆℞😂\0\x01',
  ]
];

test.each(decodeTests)('decodeHTMLEntities(%j) should equal %j', (input, expected) => {
  expect(decodeHTMLEntities(input)).toEqual(expected);
});
