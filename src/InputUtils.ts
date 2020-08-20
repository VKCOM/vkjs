import { isIOS, isIPadOS } from './IOSDetections';

let hasMouse: boolean;
let hasTouchEvents: boolean;
let hasHover: boolean;
let hasTouch: boolean;

if (isIOS && !isIPadOS) {
  hasMouse = false;
  hasHover = false;
  hasTouchEvents = true;
  hasTouch = true;
} else {
  hasTouchEvents = 'ontouchstart' in document;
  hasTouch = hasTouchEvents ||
    ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0);

  if (hasTouchEvents) {
    hasMouse = window.matchMedia && matchMedia('(pointer)').matches ?
      matchMedia('(pointer: fine)').matches :
      /android|mobile|tablet/i.test(navigator.userAgent);

    hasHover = hasMouse && (window.matchMedia && matchMedia('(hover)').matches ?
      matchMedia('(hover: hover)').matches : false);
  } else {
    hasMouse = true;
    hasHover = true;
  }
}

export { hasMouse, hasHover, hasTouchEvents, hasTouch };
