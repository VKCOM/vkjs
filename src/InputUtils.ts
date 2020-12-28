import { isIOS, isIPadOS } from './IOSDetections';
import { canUseDOM } from './dom';

let hasMouse: boolean;
let hasTouchEvents: boolean;
let hasHover: boolean;
let hasTouch: boolean;

if (canUseDOM) {
  if (isIOS && !isIPadOS) {
    hasMouse = false;
    hasHover = false;
    hasTouchEvents = true;
    hasTouch = true;
  } else {
    hasTouchEvents = 'ontouchstart' in document;
    hasTouch = hasTouchEvents ||
      ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0);

    if (hasTouch) {
      const notMobile = !/android|mobile|tablet/i.test(navigator.userAgent);

      hasMouse = window.matchMedia && matchMedia('(pointer)').matches ?
        matchMedia('(pointer: fine)').matches : notMobile;

      hasHover = hasMouse && (window.matchMedia && matchMedia('(hover)').matches ?
        matchMedia('(hover: hover)').matches : notMobile);
    } else {
      hasMouse = true;
      hasHover = true;
    }
  }
} else {
  hasMouse = false;
  hasTouchEvents = false;
  hasHover = false;
  hasTouch = false;
}

export { hasMouse, hasHover, hasTouchEvents, hasTouch };
