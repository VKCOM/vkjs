import { test, expect } from '@jest/globals';
import {
  transliteratorGostLetterCombinationsRu,
  transliteratorVKRusToEng,
  transliteratorVKEngToRus,
} from '../transliteration';

test.each([
  ['Славься, Отечество наше свободное,', 'Slavsya, Otechestvo nashe svobodnoe,'],
  ['Братских народов союз вековой,', 'Bratskikh narodov soyuz vekovoy,'],
  ['Предками данная мудрость народная!', 'Predkami dannaya mudrost narodnaya!'],
  ['Славься, страна! Мы гордимся тобой!', 'Slavsya, strana! My gordimsya toboy!'],
])('transliteratorVK.transliteration(%j) should equal %j', (input, expected) => {
  expect(transliteratorVKRusToEng.transliteration(input)).toEqual(expected);
});

test.each([['VKontakte', 'ВКонтакте']])(
  'transliteratorVK.transliteration(%j) should equal %j',
  (input, expected) => {
    expect(transliteratorVKEngToRus.transliteration(input)).toEqual(expected);
  },
);

test.each([
  ['Славься, Отечество наше свободное,', 'Slav`sya, Otechestvo nashe svobodnoe,'],
  ['Братских народов союз вековой,', 'Bratskix narodov soyuz vekovoj,'],
  ['Предками данная мудрость народная!', 'Predkami dannaya mudrost` narodnaya!'],
  ['Славься, страна! Мы гордимся тобой!', 'Slav`sya, strana! My` gordimsya toboj!'],
])(
  'transliteratorGostLetterCombinationsRu.transliteration(%j) should equal %j',
  (input, expected) => {
    expect(transliteratorGostLetterCombinationsRu.transliteration(input)).toEqual(expected);
  },
);
