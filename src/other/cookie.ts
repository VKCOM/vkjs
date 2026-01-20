export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let isCookieEnabledCache: boolean | null = null;

export const isCookieEnabled = (): boolean => {
  if (isCookieEnabledCache === null) {
    try {
      // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is not universally supported yet
      document.cookie = 'cookietest=1';

      isCookieEnabledCache = document.cookie.includes('cookietest=');

      // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is not universally supported yet
      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    } catch (_e) {
      isCookieEnabledCache = false;
    }
  }

  return isCookieEnabledCache;
};
