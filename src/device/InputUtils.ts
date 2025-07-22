import { isIOS, isIPadOS } from './IOSDetections.ts';
import { canUseDOM } from '../other/dom.ts';

const detect = /*#__PURE__*/ (() => {
  const obj = {
    hasMouse: false,
    hasTouchEvents: false,
    hasHover: false,
    hasTouch: false,
  };

  if (!canUseDOM) {
    return obj;
  }

  if (isIOS && !isIPadOS) {
    obj.hasMouse = false;
    obj.hasHover = false;
    obj.hasTouchEvents = true;
    obj.hasTouch = true;
  } else {
    obj.hasTouchEvents = 'ontouchstart' in document;
    obj.hasTouch =
      obj.hasTouchEvents || ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0);

    if (obj.hasTouch) {
      const notMobile = !/android|mobile|tablet/i.test(navigator.userAgent);

      obj.hasMouse =
        typeof window.matchMedia === 'function' && window.matchMedia('(pointer)').matches
          ? matchMedia('(pointer: fine)').matches
          : notMobile;

      obj.hasHover =
        obj.hasMouse &&
        (typeof window.matchMedia === 'function' && window.matchMedia('(hover)').matches
          ? matchMedia('(hover: hover)').matches
          : notMobile);
    } else {
      obj.hasMouse = true;
      obj.hasHover = true;
    }
  }

  return obj;
})();

export const hasMouse: boolean = /*#__PURE__*/ (() => detect.hasMouse)();
export const hasHover: boolean = /*#__PURE__*/ (() => detect.hasHover)();
export const hasTouchEvents: boolean = /*#__PURE__*/ (() => detect.hasTouchEvents)();
export const hasTouch: boolean = /*#__PURE__*/ (() => detect.hasTouch)();
