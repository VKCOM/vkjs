/**
 * classNames
 */
export { clsx as classNames } from 'clsx';

/**
 * clipboard
 */
export { copyTextToClipboard } from './clipboard.ts';

/**
 * common
 */
export { isNumeric } from './common.ts';

/**
 * detections
 */
export { isPassiveEventsSupported, isSmoothScrollSupported } from './detections.ts';

export { isEqual } from './equal.ts';

export { noop, once } from './functions.ts';

export { getCookie, isCookieEnabled } from './cookie.ts';

/**
 * OffsetRect
 */
export { getOffsetRect } from './getOffsetRect.ts';

export { getPhotoSize } from './getPhotoSize.ts';
export type { PhotoSizeLike, PhotoSize } from './getPhotoSize.ts';

/**
 * objects
 */
export { deleteObjectKeys } from './objects.ts';

/**
 * querystring
 */
export { querystring } from './querystring.ts';

/**
 * random
 */
export { getRandomInt, getRandomString } from './random.ts';

export { hasReactNode, isPrimitiveReactNode } from './react_utils.ts';

export type { Dictionary, AnyFunction, SupportEvent, TimeoutHandle, Writeable } from './types.ts';

export { escapeRegExp } from './regexp.ts';

export { localStorage, sessionStorage } from './storage.ts';

export { canUseDOM, canUseEventListeners, onDOMLoaded } from './dom.ts';
