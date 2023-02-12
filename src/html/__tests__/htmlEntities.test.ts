/* eslint-disable prettier/prettier */
import { expect, describe, test } from '@jest/globals';
import {
  escape,
  unescape,
  encodeHTMLEntities,
  decodeHTMLEntities,
  outOfBoundsChar,
  decodeHTMLEntitiesDeep,
  decodeHTMLFullEntities,
} from '../escape';

const empty = [
  [
    undefined,
    '',
  ],
  [
    null,
    '',
  ],
] as string[][]; // JS type check

const escapeTest = [
  ...empty,
  [
    'Entities &<>\'"',
    'Entities &amp;&lt;&gt;&#39;&quot;',
  ],
  [
    '&foo <> bar "fizz" l\'a',
    '&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a',
  ],
];

test.each(escapeTest)('escape(%j) should equal %j', (input, expected) => {
  expect(escape(input)).toEqual(expected);
});

const unescapeTest = [
  ...empty,
  [
    'Entities &amp;&lt;&gt;&apos;&quot;',
    'Entities &<>\'"',
  ],
  [
    'foo&#39;&apos;bar',
    'foo\'\'bar',
  ],
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
    'Null and invalid entities &#0; &#2013266066;',
    `Null and invalid entities ${outOfBoundsChar} ${outOfBoundsChar}`,
  ],
  [
    'Показувати моє ім&#39;я лише авторові',
    'Показувати моє ім\'я лише авторові',
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
    '" "',
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
  ],
];

test.each(decodeTests)('decodeHTMLEntities(%j) should equal %j', (input, expected) => {
  expect(decodeHTMLEntities(input)).toEqual(expected);
});

describe('decodeHTMLEntitiesDeep', () => {
  const decodeTestsLoopEntered = {
    array: ['&#1333;&#1408;&#1391;&#1387;&#1408;&#1384; &#1401;&#1379;&#1407;&#1398;&#1406;&#1381;&#1409;', {
      objectInArray: 'Показувати моє ім&#39;я лише авторові',
    }],
    object: {
      keyInObject: '&amp; & &lt; < &gt; > &quot; "',
      arrayInObject: ['a\n&#60;&#62;&#34;&#39;&#38;&#169;&#8710;&#8478;&#128514;\x00&#1;'],
    },
    string: 'https://vk.com/groups?act=events_my',
    number: 123,
    function: test,
    null: null,
    undefined: undefined,
  };

  const decodeTestsLoopExpected = {
    array: ['Երկիրը չգտնվեց', {
      objectInArray: 'Показувати моє ім\'я лише авторові',
    }],
    object: {
      keyInObject: '& & < < > > " "',
      arrayInObject: ['a\n<>"\'&©∆℞😂\0\x01'],
    },
    string: 'https://vk.com/groups?act=events_my',
    number: 123,
    function: test,
    null: null,
    undefined: undefined,
  };

  test('object input', () => {
    expect(decodeHTMLEntitiesDeep(decodeTestsLoopEntered)).toEqual(decodeTestsLoopExpected);
  });

  test('string input', () => {
    expect(decodeHTMLEntitiesDeep('&#1408;')).toEqual('ր');
  });

  test('number input', () => {
    expect(decodeHTMLEntitiesDeep(1)).toEqual(1);
  });

  test('null input', () => {
    expect(decodeHTMLEntitiesDeep(null)).toEqual(null);
  });

  test('undefined input', () => {
    expect(decodeHTMLEntitiesDeep(undefined)).toEqual(undefined);
  });

  test('map input', () => {
    expect(decodeHTMLEntitiesDeep({ '&#1333;': true })).toEqual({ Ե: true });
  });

  test('boolean input', () => {
    expect(decodeHTMLEntitiesDeep(false)).toEqual(false);
  });

  test('function input', () => {
    expect(decodeHTMLEntitiesDeep(test)).toEqual(test);
  });

  test('array input', () => {
    expect(decodeHTMLEntitiesDeep(['&#1333;', 1])).toEqual(['Ե', 1]);
  });
});

const decodeFullTests = [
  ...decodeTests,
  [
    '&amp &amp',
    '& &',
  ],
  [
    'text &gesl; blah',
    'text \u22db\ufe00 blah',
  ],
  [
    'Lambda = &#x3bb; = &#X3Bb ',
    'Lambda = λ = λ ',
  ],
  [
    '&# &#x &#128;43 &copy = &#169f = &#xa9',
    '&# &#x €43 © = ©f = ©',
  ],
  [
    '&AMP &AMP;',
    '& &',
  ],
  [
    '&Pi &Pi;',
    '&Pi Π',
  ],
];

test.each(decodeFullTests)('decodeHTMLFullEntities(%j) should equal %j', (input, expected) => {
  expect(decodeHTMLFullEntities(input)).toEqual(expected);
});
