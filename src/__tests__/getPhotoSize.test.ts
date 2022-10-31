import { describe, it, expect } from '@jest/globals';
import { getPhotoSize, PhotoSizeLike } from '../getPhotoSize';

describe('getPhotoSize', () => {
  it('recognizes an invalid or empty array', () => {
    expect(getPhotoSize(1 as any, 1)).toBeNull();
    expect(getPhotoSize(null as any, 1)).toBeNull();
    expect(getPhotoSize({} as any, 1)).toBeNull();
    expect(getPhotoSize([], 1)).toBeNull();
  });

  it('handles src/url differences', () => {
    const url = 'https://vk.com';

    const sizes: PhotoSizeLike[] = [
      { width: 200, height: 200, src: url },
      { width: 400, height: 400, url: url },
      { width: 600, height: 600 },
    ];

    expect(getPhotoSize(sizes, 200)).toEqual({ width: 200, height: 200, url });
    expect(getPhotoSize(sizes, 400)).toEqual({ width: 400, height: 400, url });
    expect(getPhotoSize(sizes, 600)).toEqual({ width: 600, height: 600, url: '' });
  });

  it('returns the minimum achievable image width', () => {
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

    expect(getPhotoSize(photoSizes, 500)).toEqual({
      width: 550,
      height: 550,
      url: '',
    });
  });

  it('returns the maximum achievable image width', () => {
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

    expect(getPhotoSize(photoSizes, 500)).toEqual({
      width: 450,
      height: 550,
      url: '',
    });
  });

  it('returns the minimum achievable image by width and height', () => {
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

    expect(getPhotoSize(photoSizes, 500, 600)).toEqual({
      width: 750,
      height: 750,
      url: '',
    });
  });

  it('returns the maximum achievable image by width and height', () => {
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

    expect(getPhotoSize(photoSizes, 500, 600)).toEqual({
      width: 450,
      height: 550,
      url: '',
    });
  });

  it('returns the maximum achievable image in height among the same width', () => {
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

    expect(getPhotoSize(photoSizes, 500, 600)).toEqual({
      width: 350,
      height: 550,
      url: '',
    });
  });

  it('returns the maximum size (Infinity hack)', () => {
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

    expect(getPhotoSize(photoSizes, Infinity)).toEqual({
      width: 750,
      height: 750,
      url: '',
    });
  });
});
