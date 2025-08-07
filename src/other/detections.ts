import { noop } from './functions.ts';
import { canUseDOM, canUseEventListeners } from './dom.ts';

export const isPassiveEventsSupported: boolean = /*#__PURE__*/ (() => {
  let isSupported = false;

  if (canUseEventListeners) {
    try {
      const options = Object.defineProperty({}, 'passive', {
        get() {
          isSupported = true;
        },
      });

      window.addEventListener('test', noop, options);
      window.removeEventListener('test', noop, options);
    } catch (e) {}
  }

  return isSupported;
})();

function detectSmoothScrollSupport() {
  if (!canUseDOM) {
    return false;
  }

  let isSupported = false;
  try {
    const div = document.createElement('div');
    div.scrollTo({
      top: 0,
      get behavior(): ScrollBehavior {
        isSupported = true;
        return 'smooth';
      },
    });
  } catch (e) {}
  return isSupported;
}

export const isSmoothScrollSupported: boolean = /*#__PURE__*/ detectSmoothScrollSupport();
