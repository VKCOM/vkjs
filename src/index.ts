export {
  animate,
  animationEvent,
  transitionEvent,
  waitAnimationEnd,
  cancelWaitAnimationEnd,
  waitTransitionEnd,
  cancelWaitTransitionEnd,
} from './animate';

export {
  createArray,
  sumArray,
  averageArray,
  uniqueArray,
  shuffleArray,
  chunkArray,
  omitFromArray,
  difference,
} from './arrays';

/**
 * classNames
 */
export { classNames } from './classNames';

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

export { noop, throttle, debounce, once } from './functions';

export { asyncImportLoader } from './async';

export { getCookie, isCookieEnabled } from './cookie';

export {
  SECONDS_IN_THE_DAY,
  isDateToday,
  isDateYesterday,
  isDateTomorrow,
  isSameDate,
  getBeginningOfDay,
  isLeapYear,
  getLastDayOfMonth,
  getStartOfWeek,
  addDays,
  createDateFromUnixTimestamp,
  getUnixTimestampFromDate,
  convertDateToInputFormat,
} from './date';

export { formatDuration } from './duration';

/**
 * OffsetRect
 */
export { getOffsetRect } from './getOffsetRect';

export { getPhotoSize } from './getPhotoSize';
export type { PhotoSizeLike, PhotoSize } from './getPhotoSize';

export {
  escape,
  unescape,
  encodeHTMLEntities,
  decodeHTMLEntities,
  decodeHTMLEntitiesDeep,
  decodeHTMLFullEntities,
} from './html/escape';

export { leadingZero, formatNumber } from './numbers';

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

export {
  isObjectLike,
  isArray,
  isObject,
  isUndefined,
  isFunction,
  isFormData,
  isString,
  isNumber,
} from './type_checkers';

export type { Dictionary, AnyFunction, SupportEvent, TimeoutHandle, Writeable } from './types';

export { escapeRegExp } from './regexp';

export { isRetina } from './retina';

export { localStorage, sessionStorage } from './storage';

export { hasMouse, hasHover, hasTouchEvents, hasTouch } from './InputUtils';

export { canUseDOM, canUseEventListeners, onDOMLoaded } from './dom';

export {
  IPHONE_SAFARI_BOTTOM_BAR,
  IPHONE_X_SAFARI_BOTTOM_BAR,
  IPHONE_KEYBOARD_REJECT_OFFSET,
  IOS_NO_KEYBOARD_ALLOWED_OFFSET,
  detectIOS,
  isIPad,
  isIPhone,
  isIOS,
  isIPadOS,
  iosMajor,
  iosMinor,
  isWKWebView,
  isScrollBasedViewport,
  isIPhoneX,
  isIOSChrome,
  isLandscapePhone,
  checkIPadOS,
} from './IOSDetections';

export * from './text';
