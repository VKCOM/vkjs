/**
 * classNames
 */
export { clsx as classNames } from 'clsx';

/**
 * clipboard
 */
export { copyTextToClipboard } from './clipboard';

/**
 * common
 */
export { isNumeric } from './common';

/**
 * detections
 */
export { isPassiveEventsSupported, isSmoothScrollSupported } from './detections';

export { isEqual } from './equal';

export { noop, once } from './functions';

export { getCookie, isCookieEnabled } from './cookie';

/**
 * OffsetRect
 */
export { getOffsetRect } from './getOffsetRect';

export { getPhotoSize } from './getPhotoSize';
export type { PhotoSizeLike, PhotoSize } from './getPhotoSize';

/**
 * objects
 */
export { deleteObjectKeys } from './objects';

/**
 * querystring
 */
export { querystring } from './querystring';

/**
 * random
 */
export { getRandomInt, getRandomString } from './random';

export { hasReactNode, isPrimitiveReactNode } from './react_utils';

export type { Dictionary, AnyFunction, SupportEvent, TimeoutHandle, Writeable } from './types';

export { escapeRegExp } from './regexp';

export { localStorage, sessionStorage } from './storage';

export { canUseDOM, canUseEventListeners, onDOMLoaded } from './dom';
