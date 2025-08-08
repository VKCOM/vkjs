/* eslint-disable @typescript-eslint/no-floating-promises -- node тесты */
import * as test from 'node:test';
import * as assert from 'node:assert/strict';
import { getPhotoSize, type PhotoSizeLike } from './getPhotoSize.ts';

test.test('getPhotoSize', async (t) => {
  await t.test('recognizes an invalid or empty array', () => {
    assert.equal(getPhotoSize(1 as any, 1), null);
    assert.equal(getPhotoSize(null as any, 1), null);
    assert.equal(getPhotoSize({} as any, 1), null);
    assert.equal(getPhotoSize([], 1), null);
  });

  await t.test('handles src/url differences', () => {
    const url = 'https://vk.com';

    const sizes: PhotoSizeLike[] = [
      { width: 200, height: 200, src: url },
      { width: 400, height: 400, url: url },
      { width: 600, height: 600 },
    ];

    assert.deepEqual(getPhotoSize(sizes, 200), { width: 200, height: 200, url });
    assert.deepEqual(getPhotoSize(sizes, 400), { width: 400, height: 400, url });
    assert.deepEqual(getPhotoSize(sizes, 600), { width: 600, height: 600, url: '' });
  });

  await t.test('returns the minimum achievable image width', () => {
    const photoSizes: PhotoSizeLike[] = [
      {
        width: 550,
        height: 550,
      },
      {
        width: 750,
        height: 750,
      },
      {
        width: 50,
        height: 50,
      },
    ];

    assert.deepEqual(getPhotoSize(photoSizes, 500), {
      width: 550,
      height: 550,
      url: '',
    });
  });

  await t.test('returns the maximum achievable image width', () => {
    const photoSizes: PhotoSizeLike[] = [
      {
        width: 450,
        height: 550,
      },
      {
        width: 350,
        height: 750,
      },
      {
        width: 50,
        height: 50,
      },
      {
        width: 240,
        height: 360,
      },
    ];

    assert.deepEqual(getPhotoSize(photoSizes, 500), {
      width: 450,
      height: 550,
      url: '',
    });
  });

  await t.test('returns the minimum achievable image by width and height', () => {
    const photoSizes: PhotoSizeLike[] = [
      {
        width: 550,
        height: 550,
      },
      {
        width: 750,
        height: 750,
      },
      {
        width: 50,
        height: 50,
      },
    ];

    assert.deepEqual(getPhotoSize(photoSizes, 500, 600), {
      width: 750,
      height: 750,
      url: '',
    });
  });

  await t.test('returns the maximum achievable image by width and height', () => {
    const photoSizes: PhotoSizeLike[] = [
      {
        width: 350,
        height: 250,
      },
      {
        width: 450,
        height: 550,
      },
      {
        width: 50,
        height: 50,
      },
    ];

    assert.deepEqual(getPhotoSize(photoSizes, 500, 600), {
      width: 450,
      height: 550,
      url: '',
    });
  });

  await t.test('returns the maximum achievable image in height among the same width', () => {
    const photoSizes: PhotoSizeLike[] = [
      {
        width: 350,
        height: 250,
      },
      {
        width: 350,
        height: 550,
      },
      {
        width: 350,
        height: 300,
      },
    ];

    assert.deepEqual(getPhotoSize(photoSizes, 500, 600), {
      width: 350,
      height: 550,
      url: '',
    });
  });

  await t.test('returns the maximum size (Infinity hack)', () => {
    const photoSizes: PhotoSizeLike[] = [
      {
        width: 550,
        height: 550,
      },
      {
        width: 750,
        height: 750,
      },
    ];

    assert.deepEqual(getPhotoSize(photoSizes, Infinity), {
      width: 750,
      height: 750,
      url: '',
    });
  });
});
