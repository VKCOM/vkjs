import { test, expect } from '@jest/globals';
import {
  Transliterator,
  transliterationDictGostLetterCombinationsRu,
  transliteratorVKRusEng,
} from '../transliteration';

const gostTrans = new Transliterator(transliterationDictGostLetterCombinationsRu);

test.each([
  ['Славься, Отечество наше свободное,', 'Slavsya, Otechestvo nashe svobodnoe,'],
  ['Братских народов союз вековой,', 'Bratskikh narodov soyuz vekovoy,'],
  ['Предками данная мудрость народная!', 'Predkami dannaya mudrost narodnaya!'],
  ['Славься, страна! Мы гордимся тобой!', 'Slavsya, strana! My gordimsya toboy!'],
])('transliteratorVK.transliteration(%j) should equal %j', (input, expected) => {
  expect(transliteratorVKRusEng.transliteration(input)).toEqual(expected);
});

test.each([
  ['Славься, Отечество наше свободное,', 'Slav`sya, Otechestvo nashe svobodnoe,'],
  ['Братских народов союз вековой,', 'Bratskix narodov soyuz vekovoj,'],
  ['Предками данная мудрость народная!', 'Predkami dannaya mudrost` narodnaya!'],
  ['Славься, страна! Мы гордимся тобой!', 'Slav`sya, strana! My` gordimsya toboj!'],
])('gost transliteration(%j) should equal %j', (input, expected) => {
  expect(gostTrans.transliteration(input)).toEqual(expected);
});
