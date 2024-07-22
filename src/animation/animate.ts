import { canUseDOM, canUseEventListeners } from '../other/dom';
import { type SupportEvent } from '../other/types';

type TimingInterface = (timeFraction: number) => number;

type DrawInterface = (progress: number) => void;

interface AnimateArgumentsInterface {
  /**
   * Длительность
   */
  duration: number;

  /**
   * Тайминг функция анимации
   */
  timing: TimingInterface;

  /**
   * Коллбэк, в который прокидывается прогресс [0, 1]
   */
  draw: DrawInterface;
}

/**
 * Функция для js анимации
 */
export function animate({ duration, timing, draw }: AnimateArgumentsInterface) {
  if (!canUseDOM) {
    return;
  }

  const start = window.performance.now();

  // eslint-disable-next-line no-shadow
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

export const animationEvent = /*#__PURE__*/ (() => {
  const obj: SupportEvent<'animationend'> = {
    supported: false,
    name: 'animationend',
  };

  if (canUseDOM) {
    if (typeof AnimationEvent !== 'undefined') {
      obj.supported = true;
    } else if (typeof WebKitAnimationEvent !== 'undefined') {
      obj.supported = true;

      // webkitAnimationEnd не входит в перечисление событий, но соответствует animationend
      obj.name = 'webkitAnimationEnd' as unknown as 'animationend';
    }
  }

  return obj;
})();

export const transitionEvent = /*#__PURE__*/ (() => {
  const obj: SupportEvent<'transitionend'> = {
    supported: false,
    name: 'transitionend',
  };

  if (canUseDOM) {
    if (typeof TransitionEvent !== 'undefined') {
      obj.supported = true;
    } else if (typeof WebKitTransitionEvent !== 'undefined') {
      obj.supported = true;

      // webkitTransitionEnd не входит в перечисление событий, но соответствует transitionend
      obj.name = 'webkitTransitionEnd' as unknown as 'transitionend';
    }
  }

  return obj;
})();

/**
 * Ожидание окончания анимации на элементе
 *
 * @param listener Коллбэк окончания ожидания
 * @param fallbackTime Сколько ждать в мс если событие не поддерживается
 * @param el Элемент
 */
export function waitAnimationEnd(
  listener: (ev?: AnimationEvent) => any,
  fallbackTime: number,
  el?: GlobalEventHandlers,
) {
  if (canUseEventListeners) {
    if (animationEvent.supported && el) {
      el.addEventListener(animationEvent.name, listener);
    } else {
      return window.setTimeout(listener, fallbackTime);
    }
  }
}

/**
 * Прекращение ожидания окончания анимации на элементе
 *
 * @param listener Коллбэк окончания ожидания
 * @param handle то, что вернулось из ```waitAnimationEnd```
 * @param el Элемент
 */
export function cancelWaitAnimationEnd(
  listener: (ev?: AnimationEvent) => any,
  handle?: number,
  el?: GlobalEventHandlers,
) {
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
 * @param listener Коллбэк окончания ожидания
 * @param fallbackTime Сколько ждать в мс если событие не поддерживается
 * @param el Элемент
 */
export function waitTransitionEnd(
  el: GlobalEventHandlers,
  listener: (ev?: TransitionEvent) => any,
  fallbackTime: number,
) {
  if (canUseEventListeners) {
    if (transitionEvent.supported && el) {
      el.addEventListener(transitionEvent.name, listener);
    } else {
      return window.setTimeout(listener, fallbackTime);
    }
  }
}

/**
 * Прекращение ожидания окончания анимации перехода на элементе
 *
 * @param listener Коллбэк окончания ожидания
 * @param handle То, что вернулось из ```waitTransitionEnd```
 * @param el Элемент
 */
export function cancelWaitTransitionEnd(
  listener: (ev?: TransitionEvent) => any,
  handle?: number,
  el?: GlobalEventHandlers,
) {
  if (canUseEventListeners) {
    if (transitionEvent.supported && el) {
      el.removeEventListener(transitionEvent.name, listener);
    } else {
      window.clearTimeout(handle);
    }
  }
}
