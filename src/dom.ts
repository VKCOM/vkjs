export const canUseDOM = /*#__PURE__*/ (() =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement))();

export const canUseEventListeners: boolean = /*#__PURE__*/ (() =>
  canUseDOM && !!window.addEventListener)();

export function onDOMLoaded(callback: (...args: any[]) => any) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}
