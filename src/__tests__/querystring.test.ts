import { describe, expect, test } from '@jest/globals';
import { querystring } from '../querystring';

describe('querystring parse', () => {
  test('string starting with a `?`, `#` or `&`', () => {
    expect(querystring.parse('?foo=bar&xyz=baz')).toEqual({ foo: 'bar', xyz: 'baz' });
    expect(querystring.parse('#foo=bar&xyz=baz')).toEqual({ foo: 'bar', xyz: 'baz' });
    expect(querystring.parse('&foo=bar&xyz=baz')).toEqual({ foo: 'bar', xyz: 'baz' });
  });

  test.each([0, false, null, {}, '?', 'https://vk.com'])('querystring.parse(%p) is {}', (query) => {
    expect(querystring.parse(query)).toEqual({});
  });

  test.each([
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
  ])('querystring.parse($query) is $expect', ({ query, expected }) => {
    expect(querystring.parse(query)).toEqual(expected);
  });

  // TODO: Написать больше тестов
});

describe('querystring stringify', () => {
  test('empty string for null, undefined or empty data', () => {
    // @ts-expect-error TS2345: JS type check
    expect(querystring.stringify(null)).toEqual('');
    // @ts-expect-error TS2345: JS type check
    expect(querystring.stringify(undefined)).toEqual('');
    expect(querystring.stringify({})).toEqual('');
  });

  test('base', () => {
    expect(querystring.stringify({ foo: 'bar' })).toEqual('foo=bar');
    expect(querystring.stringify({ foo: 'bar', baz: 2 })).toEqual('foo=bar&baz=2');
  });

  test('encoding', () => {
    expect(querystring.stringify({ foo: 'bar', baz: 'foo & bar' })).toEqual(
      'foo=bar&baz=foo%20%26%20bar',
    );
    expect(querystring.stringify({ foo: 'bar', baz: 'foo & bar' }, { encode: true })).toEqual(
      'foo=bar&baz=foo%20%26%20bar',
    );
    expect(querystring.stringify({ foo: 'bar', baz: 'foo & bar' }, { encode: false })).toEqual(
      'foo=bar&baz=foo & bar',
    );
  });

  test('arrays', () => {
    expect(querystring.stringify({ foo: [1, 2, 3] })).toEqual('foo[]=1&foo[]=2&foo[]=3');
    expect(querystring.stringify({ foo: ['a', 'foo & bar'] })).toEqual(
      'foo[]=a&foo[]=foo%20%26%20bar',
    );
  });

  test('null and undefined', () => {
    expect(querystring.stringify({ a: 'foo', b: undefined, c: null })).toEqual('a=foo&c=');
    expect(querystring.stringify({ a: 'foo', b: undefined, c: null }, { skipNull: true })).toEqual(
      'a=foo',
    );
  });
});
