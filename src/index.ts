export {
  animate,
  animationEvent,
  transitionEvent,
  waitAnimationEnd,
  cancelWaitAnimationEnd,
  waitTransitionEnd,
  cancelWaitTransitionEnd,
} from './animate';

/**
 * classNames
 */
export {
  classNames,
} from './classNames';

/**
 * clipboard
 */
export {
  copyTextToClipboard,
} from './clipboard';

/**
 * common
 */
export {
  isNumeric,
} from './common';

/**
 * detections
 */
export {
  isPassiveEventsSupported,
  isSmoothScrollSupported,
} from './detections';

/**
 * equal
 */
export {
  isEqual,
} from './equal';

export {
  sumArray,
  averageArray,
  uniqueArray,
  shuffleArray,
  chunkArray,
  omitFromArray,
  difference,
} from './arrays';

export {
  asyncImportLoader,
} from './async';

export {
  getCookie,
} from './cookie';

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

export {
  formatDuration,
} from './duration';

export {
  noop,
  throttle,
  debounce,
} from './functions';

/**
 * OffsetRect
 */
export {
  getOffsetRect,
} from './getOffsetRect';

export {
  leadingZero,
  formatNumber,
} from './numbers';

/**
 * objects
 */
export {
  deleteObjectKeys,
} from './objects';

/**
 * querystring
 */
export {
  querystring,
} from './querystring';

/**
 * random
 */
export {
  getRandomInt,
  getRandomString,
} from './random';

export {
  hasReactNode,
  isPrimitiveReactNode,
} from './react_utils';

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

export type {
  Dictionary,
  AnyFunction,
  SupportEvent,
  TimeoutHandle,
  Writeable,
} from './types';

export {
  escapeRegExp,
} from './regexp';

export {
  localStorage,
  sessionStorage,
} from './storage';

export {
  hasMouse,
  hasHover,
  hasTouchEvents,
  hasTouch,
} from './InputUtils';

export {
  canUseDOM,
  canUseEventListeners,
  onDOMLoaded,
} from './dom';

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
