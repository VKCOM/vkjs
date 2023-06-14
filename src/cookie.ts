export function getCookie(name: string): string | undefined {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let isCookieEnabledCache: boolean | null = null;

export const isCookieEnabled = () => {
  if (isCookieEnabledCache === null) {
    try {
      document.cookie = 'cookietest=1';

      isCookieEnabledCache = document.cookie.includes('cookietest=');

      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    } catch (e) {
      isCookieEnabledCache = false;
    }
  }

  return isCookieEnabledCache;
};
