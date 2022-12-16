import { noop } from './functions';
import { canUseDOM, canUseEventListeners } from './dom';

export let isPassiveEventsSupported = false;

if (canUseEventListeners) {
  try {
    const options = Object.defineProperty({}, 'passive', {
      get() {
        isPassiveEventsSupported = true;
      },
    });

    window.addEventListener('test', noop, options);
    window.removeEventListener('test', noop, options);
  } catch (e) {}
}

function detectSmoothScrollSupport() {
  if (!canUseDOM) {
    return false;
  }

  let isSupported = false;
  try {
    const div = document.createElement('div');
    div.scrollTo({
      top: 0,
      // @ts-expect-error
      get behavior() {
        isSupported = true;
        return 'smooth';
      },
    });
  } catch (e) {}
  return isSupported;
}

export const isSmoothScrollSupported = /*#__PURE__*/ detectSmoothScrollSupport();
