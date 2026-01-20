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
export { getCookie, isCookieEnabled } from './cookie.ts';
/**
 * detections
 */
export { isPassiveEventsSupported, isSmoothScrollSupported } from './detections.ts';
export { canUseDOM, canUseEventListeners, onDOMLoaded } from './dom.ts';
export { isEqual } from './equal.ts';
export { noop, once } from './functions.ts';
/**
 * OffsetRect
 */
export { getOffsetRect } from './getOffsetRect.ts';
export type { PhotoSize, PhotoSizeLike } from './getPhotoSize.ts';
export { getPhotoSize } from './getPhotoSize.ts';
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

export { escapeRegExp } from './regexp.ts';

export { localStorage, sessionStorage } from './storage.ts';
export type { AnyFunction, Dictionary, SupportEvent, TimeoutHandle, Writeable } from './types.ts';
