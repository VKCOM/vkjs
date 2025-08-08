/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { querystring } from './querystring.ts';

test.test('querystring parse', async (t) => {
  await t.test('string starting with a `?`, `#` or `&`', () => {
    assert.deepEqual(querystring.parse('?foo=bar&xyz=baz'), { foo: 'bar', xyz: 'baz' });
    assert.deepEqual(querystring.parse('#foo=bar&xyz=baz'), { foo: 'bar', xyz: 'baz' });
    assert.deepEqual(querystring.parse('&foo=bar&xyz=baz'), { foo: 'bar', xyz: 'baz' });
  });

  await Promise.all(
    [0, false, null, {}, '?', 'https://vk.com'].map(
      async (query) =>
        await t.test(`querystring.parse(${String(query)}) is {}`, () => {
          assert.deepEqual(querystring.parse(query), {});
        }),
    ),
  );

  await Promise.all(
    [
      { query: 'http://www.google.com/?foo=bar?', expected: { foo: 'bar?' } },
      {
        query: 'ascii=%3Ckey%3A+0x90%3E',
        expected: { ascii: '<key: 0x90>' },
      },
      {
        query: 'a=%3B',
        expected: { a: ';' },
      },
      {
        query: 'a%3Bb=1',
        expected: { 'a;b': '1' },
      },
    ].map(
      async ({ query, expected }) =>
        await t.test(`querystring.parse(${String(query)}) is ${String(expected)}`, () => {
          assert.deepEqual(querystring.parse(query), expected);
        }),
    ),
  );

  // TODO: Написать больше тестов
});

test.test('querystring stringify', async (t) => {
  await t.test('empty string for null, undefined or empty data', () => {
    // @ts-expect-error TS2345: JS type check
    assert.deepEqual(querystring.stringify(null), '');
    // @ts-expect-error TS2345: JS type check
    assert.deepEqual(querystring.stringify(undefined), '');
    assert.deepEqual(querystring.stringify({}), '');
  });

  await t.test('base', () => {
    assert.deepEqual(querystring.stringify({ foo: 'bar' }), 'foo=bar');
    assert.deepEqual(querystring.stringify({ foo: 'bar', baz: 2 }), 'foo=bar&baz=2');
  });

  await t.test('encoding', () => {
    assert.deepEqual(
      querystring.stringify({ foo: 'bar', baz: 'foo & bar' }),
      'foo=bar&baz=foo%20%26%20bar',
    );
    assert.deepEqual(
      querystring.stringify({ foo: 'bar', baz: 'foo & bar' }, { encode: true }),
      'foo=bar&baz=foo%20%26%20bar',
    );
    assert.deepEqual(
      querystring.stringify({ foo: 'bar', baz: 'foo & bar' }, { encode: false }),
      'foo=bar&baz=foo & bar',
    );
  });

  await t.test('arrays', () => {
    assert.deepEqual(querystring.stringify({ foo: [1, 2, 3] }), 'foo[]=1&foo[]=2&foo[]=3');
    assert.deepEqual(
      querystring.stringify({ foo: ['a', 'foo & bar'] }),
      'foo[]=a&foo[]=foo%20%26%20bar',
    );
  });

  await t.test('null and undefined', () => {
    assert.deepEqual(querystring.stringify({ a: 'foo', b: undefined, c: null }), 'a=foo&c=');
    assert.deepEqual(
      querystring.stringify({ a: 'foo', b: undefined, c: null }, { skipNull: true }),
      'a=foo',
    );
  });
});
