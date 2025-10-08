import { canUseDOM } from '../other/dom.ts';

export function isRetina(): boolean {
  return canUseDOM && window.devicePixelRatio >= 2;
}
