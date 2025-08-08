/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import {
  escape,
  unescape,
  encodeHTMLEntities,
  decodeHTMLEntities,
  decodeHTMLEntitiesDeep,
  decodeHTMLFullEntities,
} from '../escape.ts';

const outOfBoundsChar = String.fromCharCode(65533);

const empty = [
  [undefined, ''],
  [null, ''],
] as string[][]; // JS type check

test.test('escape', async (t) => {
  const escapeTest = [
    ...empty,
    ['Entities &<>\'"', 'Entities &amp;&lt;&gt;&#39;&quot;'],
    ['&foo <> bar "fizz" l\'a', '&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a'],
  ];

  await Promise.all(
    escapeTest.map(
      async ([input, expected]) =>
        await t.test(
          `escape(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.deepEqual(escape(input), expected);
          },
        ),
    ),
  );
});

test.test('unescape', async (t) => {
  const unescapeTest = [
    ...empty,
    ['Entities &amp;&lt;&gt;&apos;&quot;', 'Entities &<>\'"'],
    ['foo&#39;&apos;bar', "foo''bar"],
  ];

  await Promise.all(
    unescapeTest.map(
      async ([input, expected]) =>
        await t.test(
          `unescape(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.deepEqual(unescape(input), expected);
          },
        ),
    ),
  );
});

test.test('encodeHTMLEntities', async (t) => {
  const encodeTest = [
    ...empty,
    ['a\n<>"\'&©∆℞😂\0\x01', 'a\n&#60;&#62;&#34;&#39;&#38;&#169;&#8710;&#8478;&#128514;\x00&#1;'],
  ];

  await Promise.all(
    encodeTest.map(
      async ([input, expected]) =>
        await t.test(
          `encodeHTMLEntities(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.deepEqual(encodeHTMLEntities(input), expected);
          },
        ),
    ),
  );
});

const decodeTests = [
  ...empty,
  [
    'Null and invalid entities &#0; &#2013266066;',
    `Null and invalid entities ${outOfBoundsChar} ${outOfBoundsChar}`,
  ],
  ['Показувати моє ім&#39;я лише авторові', "Показувати моє ім'я лише авторові"],
  [
    '&#1333;&#1408;&#1391;&#1387;&#1408;&#1384; &#1401;&#1379;&#1407;&#1398;&#1406;&#1381;&#1409;',
    'Երկիրը չգտնվեց',
  ],
  ['&amp; & &lt; < &gt; > &quot; "', '& & < < > > " "'],
  ['&#34 &#34;', '" "'],
  ['Привет&#33;', 'Привет!'],
  ['HEX entities &#XD06; &#xD06;', 'HEX entities ആ ആ'],
  ['Emoji &#128514; &#129498;', 'Emoji 😂 🧚'],
  ['a\n&#60;&#62;&#34;&#39;&#38;&#169;&#8710;&#8478;&#128514;\x00&#1;', 'a\n<>"\'&©∆℞😂\0\x01'],
];

test.test('decodeHTMLEntities', async (t) => {
  await Promise.all(
    decodeTests.map(
      async ([input, expected]) =>
        await t.test(
          `decodeHTMLEntities(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.deepEqual(decodeHTMLEntities(input), expected);
          },
        ),
    ),
  );
});

test.test('decodeHTMLEntitiesDeep', async (t) => {
  const decodeTestsLoopEntered = {
    array: [
      '&#1333;&#1408;&#1391;&#1387;&#1408;&#1384; &#1401;&#1379;&#1407;&#1398;&#1406;&#1381;&#1409;',
      {
        objectInArray: 'Показувати моє ім&#39;я лише авторові',
      },
    ],
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
    array: [
      'Երկիրը չգտնվեց',
      {
        objectInArray: "Показувати моє ім'я лише авторові",
      },
    ],
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

  await t.test('object input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep(decodeTestsLoopEntered), decodeTestsLoopExpected);
  });

  await t.test('string input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep('&#1408;'), 'ր');
  });

  await t.test('number input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep(1), 1);
  });

  await t.test('null input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep(null), null);
  });

  await t.test('undefined input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep(undefined), undefined);
  });

  await t.test('map input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep({ '&#1333;': true }), { Ե: true });
  });

  await t.test('boolean input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep(false), false);
  });

  await t.test('function input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep(test), test);
  });

  await t.test('array input', () => {
    assert.deepEqual(decodeHTMLEntitiesDeep(['&#1333;', 1]), ['Ե', 1]);
  });
});

test.test('decodeHTMLEntities', async (t) => {
  const decodeFullTests = [
    ...decodeTests,
    ['&amp &amp', '& &'],
    ['text &gesl; blah', 'text \u22db\ufe00 blah'],
    ['Lambda = &#x3bb; = &#X3Bb ', 'Lambda = λ = λ '],
    ['&# &#x &#128;43 &copy = &#169f = &#xa9', '&# &#x €43 © = ©f = ©'],
    ['&AMP &AMP;', '& &'],
    ['&Pi &Pi;', '&Pi Π'],
  ];

  await Promise.all(
    decodeFullTests.map(
      async ([input, expected]) =>
        await t.test(
          `decodeHTMLFullEntities(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.deepEqual(decodeHTMLFullEntities(input), expected);
          },
        ),
    ),
  );
});
