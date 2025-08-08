/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import {
  transliteratorGostLetterCombinationsRu,
  transliteratorVKRusToEng,
  transliteratorVKEngToRus,
} from './transliteration.ts';

test.test('transliteration', async (t) => {
  await Promise.all(
    [
      ['Славься, Отечество наше свободное,', 'Slavsya, Otechestvo nashe svobodnoe,'],
      ['Братских народов союз вековой,', 'Bratskikh narodov soyuz vekovoy,'],
      ['Предками данная мудрость народная!', 'Predkami dannaya mudrost narodnaya!'],
      ['Славься, страна! Мы гордимся тобой!', 'Slavsya, strana! My gordimsya toboy!'],
    ].map(
      async ([input, expected]) =>
        await t.test(
          `transliteratorVKRusToEng.transliteration(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.equal(transliteratorVKRusToEng.transliteration(input), expected);
          },
        ),
    ),
  );

  await Promise.all(
    [['VKontakte', 'ВКонтакте']].map(
      async ([input, expected]) =>
        await t.test(
          `transliteratorVKEngToRus.transliteration(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.equal(transliteratorVKEngToRus.transliteration(input), expected);
          },
        ),
    ),
  );

  await Promise.all(
    [
      ['Славься, Отечество наше свободное,', 'Slav`sya, Otechestvo nashe svobodnoe,'],
      ['Братских народов союз вековой,', 'Bratskix narodov soyuz vekovoj,'],
      ['Предками данная мудрость народная!', 'Predkami dannaya mudrost` narodnaya!'],
      ['Славься, страна! Мы гордимся тобой!', 'Slav`sya, strana! My` gordimsya toboj!'],
    ].map(
      async ([input, expected]) =>
        await t.test(
          `transliteratorGostLetterCombinationsRu.transliteration(${JSON.stringify(input)}) should equal ${JSON.stringify(expected)}`,
          () => {
            assert.equal(transliteratorGostLetterCombinationsRu.transliteration(input), expected);
          },
        ),
    ),
  );
});
