import { noop } from './functions';
import { canUseEventListeners } from './dom';

export let isPassiveEventsSupported = false;

if (canUseEventListeners) {
  try {
    const options = Object.defineProperty({}, 'passive', {
      get: function() {
        isPassiveEventsSupported = true;
      },
    });

    window.addEventListener('test', noop, options);
    window.removeEventListener('test', noop, options);
  } catch (e) {}
}
