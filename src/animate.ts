import { canUseDOM, canUseEventListeners } from './dom';
import { SupportEvent, EventTarget, TimeoutHandle } from './types';

type TimingInterface = (timeFraction: number) => number;
type DrawInterface = (progress: number) => void;

interface AnimateArgumentsInterface {
  duration: number;
  timing: TimingInterface;
  draw: DrawInterface;
}

/**
 * Функция для js анимации
 * @param {number} duration
 * @param {function} timing тайминг функция анимации
 * @param {function} draw коллбэк, в который прокидывается прогресс [0, 1]
 * @returns {void}
 */
export function animate({ duration, timing, draw }: AnimateArgumentsInterface) {
  if (!canUseDOM) {
    return;
  }

  const start = window.performance.now();

  window.requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      window.requestAnimationFrame(animate);
    }
  });
}

// WebKitAnimationEvent и WebKitTransitionEvent не существуют в глобальном контексте
declare const WebKitAnimationEvent: AnimationEvent;
declare const WebKitTransitionEvent: TransitionEvent;

export const animationEvent: SupportEvent<'animationend'> = {
  supported: false,
  name: 'animationend',
};

export const transitionEvent: SupportEvent<'transitionend'> = {
  supported: false,
  name: 'transitionend',
};

if (canUseDOM) {
  if (typeof AnimationEvent !== 'undefined') {
    animationEvent.supported = true;
  } else if (typeof WebKitAnimationEvent !== 'undefined') {
    animationEvent.supported = true;

    // webkitAnimationEnd не входит в перечисление событий, но соответствует animationend
    animationEvent.name = 'webkitAnimationEnd' as unknown as 'animationend';
  }

  if (typeof TransitionEvent !== 'undefined') {
    transitionEvent.supported = true;
  } else if (typeof WebKitTransitionEvent !== 'undefined') {
    transitionEvent.supported = true;

    // webkitTransitionEnd не входит в перечисление событий, но соответствует transitionend
    transitionEvent.name = 'webkitTransitionEnd' as unknown as 'transitionend';
  }
}

/**
 * Ожидание окончания анимации на элементе
 *
 * @param el элемент
 * @param listener коллбэк окончания ожидания
 * @param fallbackTime сколько ждать в мс если событие не поддерживается
 */
export function waitAnimationEnd(el: EventTarget, listener: (ev?: AnimationEvent) => any, fallbackTime: number) {
  if (canUseEventListeners) {
    if (animationEvent.supported && el) {
      el.addEventListener(animationEvent.name, listener);
    } else {
      return window.setTimeout(listener, fallbackTime);
    }
  }
  return 0;
}

/**
 * Прекращение ожидания окончания анимации на элементе
 *
 * @param el элемент
 * @param listener коллбэк окончания ожидания
 * @param handle то, что вернулось из ```waitAnimationEnd```
 */
export function cancelWaitAnimationEnd(el: EventTarget, listener: (ev?: AnimationEvent) => any, handle: TimeoutHandle) {
  if (canUseEventListeners) {
    if (animationEvent.supported && el) {
      el.removeEventListener(animationEvent.name, listener);
    } else {
      window.clearTimeout(handle);
    }
  }
}

/**
 * Ожидание окончания анимации перехода на элементе
 *
 * @param el элемент
 * @param listener коллбэк окончания ожидания
 * @param fallbackTime сколько ждать в мс если событие не поддерживается
 */
export function waitTransitionEnd(el: EventTarget, listener: (ev?: TransitionEvent) => any, fallbackTime: number) {
  if (canUseEventListeners) {
    if (transitionEvent.supported && el) {
      el.addEventListener(transitionEvent.name, listener);
    } else {
      return window.setTimeout(listener, fallbackTime);
    }
  }
  return 0;
}

/**
 * Прекращение ожидания окончания анимации перехода на элементе
 *
 * @param el элемент
 * @param listener коллбэк окончания ожидания
 * @param handle то, что вернулось из ```waitTransitionEnd```
 */
export function cancelWaitTransitionEnd(el: EventTarget, listener: (ev?: TransitionEvent) => any, handle: TimeoutHandle) {
  if (canUseEventListeners) {
    if (transitionEvent.supported && el) {
      el.removeEventListener(transitionEvent.name, listener);
    } else {
      window.clearTimeout(handle);
    }
  }
}

