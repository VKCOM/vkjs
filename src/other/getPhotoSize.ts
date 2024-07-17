export interface PhotoSizeLike {
  width: number;
  height: number;
  url?: string;
  src?: string;
}

export interface PhotoSize {
  url: string;
  width: number;
  height: number;
}

function prepareSize(size: PhotoSizeLike): PhotoSize {
  return {
    url: size.url || size.src || '',
    width: size.width,
    height: size.height,
  };
}

function computeSize(
  sizes: PhotoSizeLike[],
  minWidth: number,
  minHeight: number | null = null,
): PhotoSizeLike {
  // Do nothing if sizes contains only 1 item
  if (sizes.length === 1) {
    return sizes[0];
  }

  // Sorting in ascending order
  const sorted = [...sizes].sort((a, b) => {
    if (a.width < b.width) {
      return -1;
    }

    if (a.width === b.width) {
      return a.height > b.height ? 1 : -1;
    }

    return 1;
  });

  const matchesByWidth = sorted.filter((size) => size.width >= minWidth);
  if (!matchesByWidth.length) {
    // Biggest size
    return sorted[sorted.length - 1];
  }

  if (!minHeight) {
    return matchesByWidth[0];
  }

  // Searching by height
  for (let i = 0; i < matchesByWidth.length; i++) {
    const size = matchesByWidth[i];
    if (size.height >= minHeight) {
      return size;
    }
  }

  // Sorting by height in ascending order
  const sortedByHeight = matchesByWidth.sort((a, b) => (a.height > b.height ? 1 : -1));

  return sortedByHeight[sortedByHeight.length - 1];
}

/**
 * Searches for the smallest (?) suitable image from the sizes array.
 *
 * Or more precise, it returns:
 *   – if no suitable sizes (>= minWidth И >= minHeight): the biggest from all sizes;
 *   – there are any suitable (>= minWidth И >= minHeight): the smallest of the matching sizes;
 *
 * Returns null only in case of an empty/invalid array. The returned size can be smaller than minWidth or minHeight.
 *
 * The function doesn't take into about the retina screen (window.devicePixelRatio), so you have to calculate the right width/height from the outside to support it.
 *
 * WARN:
 * - does not reckon for letter-sizes (PhotosPhotoSizesType).
 * - does not know how to search for the "nearest" size, or the maximum image (there is a hack with the `Infinity` pass).
 *
 * @example
 *   getPhotoSize([{ width: 1, height: 1 }, { width: 3, height: 3 }], 1) // => 1,1
 *   getPhotoSize([{ width: 1, height: 1 }, { width: 3, height: 3 }], 2) // => 3,3
 *   getPhotoSize([{ width: 1, height: 1 }, { width: 3, height: 3 }], 4) // => 3,3
 *
 * See more examples in tests
 */
export function getPhotoSize(
  sizes: PhotoSizeLike[],
  minWidth: number,
  minHeight: number | null = null,
): PhotoSize | null {
  if (!Array.isArray(sizes) || !sizes.length) {
    return null;
  }

  const size = computeSize(sizes, minWidth, minHeight);

  return prepareSize(size);
}
